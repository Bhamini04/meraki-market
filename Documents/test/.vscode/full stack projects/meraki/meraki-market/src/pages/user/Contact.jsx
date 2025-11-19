import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We will get back to you shortly.',
    });
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Meraki Market</title>
        <meta name="description" content="Get in touch with Meraki Market. We're here to help." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Get In <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg">We'd love to hear from you. Here's how you can reach us.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
              className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input type="text" required className="w-full p-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input type="email" required className="w-full p-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea rows="5" required className="w-full p-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400"></textarea>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-3 text-lg">Send Message</Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-8">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Email Us</h3>
                  <p className="text-gray-400">bhaminitiwari665@gmail.com</p>
                </div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Call Us</h3>
                  <p className="text-gray-400">+91 97999 80322</p>
                </div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Find Us</h3>
                  <p className="text-gray-400">84/D Meraki Lane, Style City, Prayagraj, Uttar Pradesh, India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;