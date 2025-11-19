import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Target, Users } from 'lucide-react';

const teamMembers = [
  { name: 'Aarav Sharma', role: 'Founder & CEO', image: 'A stylish man in a suit, smiling confidently' },
  { name: 'Priya Patel', role: 'Head of Design', image: 'A creative woman sketching in a modern studio' },
  { name: 'Rohan Joshi', role: 'Lead Developer', image: 'A focused developer coding on a multi-monitor setup' },
  { name: 'Sana Khan', role: 'Marketing Director', image: 'A professional woman giving a presentation with charts' },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Meraki Market</title>
        <meta name="description" content="Learn about Meraki Market's mission, vision, and the team behind it." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 text-white">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-80" />
          <img class="absolute inset-0 w-full h-full object-cover opacity-10" alt="Abstract network of light trails" src="https://images.unsplash.com/photo-1693349215728-a07e968ae462" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              The <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Soul</span> of Style
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Meraki [may-rah-kee] (adjective) - To do something with soul, creativity, or love; to put something of yourself into your work.
            </motion.p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Meraki Market was born from a simple idea: that style is a form of self-expression, a way to put a piece of your soul into the world. We were tired of fast fashion and uninspired designs. We craved quality, creativity, and products that tell a story.
              </p>
              <p className="text-gray-300 leading-relaxed">
                So, we created a marketplace where every item is chosen with 'Meraki'. From handcrafted accessories to cutting-edge electronics, each product on our platform represents the pinnacle of design and the passion of its creator. We are more than an e-commerce site; we are a community celebrating individuality.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img class="rounded-2xl shadow-2xl" alt="A collage of artisan hands crafting various products like pottery, jewelry, and textiles" src="https://images.unsplash.com/photo-1535814043988-2d507849396e" />
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/20">
              <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400" />
              <h3 className="text-2xl font-bold mb-3">Our Philosophy</h3>
              <p className="text-gray-400">To curate products that blend artistry with functionality, enabling personal expression through style.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{delay: 0.1}} className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/20">
              <Target className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-400">To be the ultimate 'Style Adda' by providing a seamless, inspiring, and soulful shopping experience for discerning individuals.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{delay: 0.2}} className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/20">
              <Users className="w-12 h-12 mx-auto mb-4 text-teal-400" />
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-400">To build a global community that values creativity, quality, and conscious consumption, one beautiful product at a time.</p>
            </motion.div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-4xl font-bold">Meet the <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Team</span></h2>
              <p className="text-gray-400 mt-2">The creative minds behind Meraki Market.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-slate-800/50 rounded-2xl p-6 text-center border border-purple-500/20 overflow-hidden"
                >
                  <motion.div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-purple-400" whileHover={{scale: 1.05}}>
                    <img class="w-full h-full object-cover" alt={member.name} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-purple-300">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;