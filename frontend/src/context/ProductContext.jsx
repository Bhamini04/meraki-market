import React, { createContext, useContext, useState, useEffect } from "react";
import { dummyProducts } from "@/utils/dummyData";
import api from "@/services/api";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(dummyProducts);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [loading, setLoading] = useState(false);

  // 🔥 Load from backend on mount, fallback to dummy
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products"); // GET /api/products
        const data = res.data || [];

        if (data.length > 0) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          // backend empty → use dummy
          setProducts(dummyProducts);
          setFilteredProducts(dummyProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products, using dummy data:", err);
        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (filters) => {
    let filtered = [...products];

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          filtered.sort(
            (a, b) =>
              new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
          );
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  const getProductById = (id) => {
    // id from route is string
    return products.find(
      (p) => p._id === id || p.id === parseInt(id)
    );
  };

  const getProductsByCategory = (category) => {
    return products.filter((p) => p.category === category);
  };

  const value = {
    products,
    filteredProducts,
    loading,
    filterProducts,
    getProductById,
    getProductsByCategory,
    setProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
