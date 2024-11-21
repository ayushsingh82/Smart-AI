import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-2xl
               hover:transform hover:scale-105 transition-all duration-300
               border border-white/10 hover:border-blue-400/30 group"
  >
    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6
                    group-hover:bg-blue-500 transition-colors duration-300 shadow-lg">
      <span className="material-icons text-3xl text-white">{icon}</span>
    </div>
    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
    <p className="text-blue-200/80 leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => (
  <div className="bg-gradient-to-b from-blue-900 via-purple-900 to-blue-900 text-white">
    {/* Hero Section */}
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative pt-32 pb-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium inline-block mb-6">
              Powered by AI Technology
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl font-bold mb-8 bg-clip-text text-transparent 
                     bg-gradient-to-r from-white via-blue-200 to-blue-400"
          >
            Smart Contracts
            <br />
            Made Intelligent
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-blue-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform natural language into secure, production-ready smart contracts with the power of AI. 
            Build faster, smarter, and with confidence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/ai" 
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 
                       hover:from-blue-500 hover:to-blue-400 text-white font-medium
                       transition-all duration-300 transform hover:scale-105 shadow-lg
                       hover:shadow-blue-500/25 flex items-center space-x-2 w-full sm:w-auto
                       justify-center"
            >
              <span className="material-icons">smart_toy</span>
              <span>Start Creating</span>
            </Link>
            <a 
              href="#features" 
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white 
                       font-medium transition-all duration-300 flex items-center space-x-2
                       backdrop-blur-sm w-full sm:w-auto justify-center"
            >
              <span className="material-icons">explore</span>
              <span>Explore Features</span>
            </a>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {[
            { number: "100+", label: "Smart Contracts Generated" },
            { number: "24/7", label: "AI Availability" },
            { number: "100%", label: "Secure Contracts" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <div className="text-blue-200">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Features Section */}
    <section id="features" className="py-20 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose SmartAI?</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Experience the future of smart contract development with our cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="code"
            title="Natural Language Input"
            description="Simply describe your contract requirements in plain English and watch as AI transforms it into secure Solidity code."
          />
          <FeatureCard 
            icon="security"
            title="Security First"
            description="All generated contracts undergo rigorous security checks and follow industry best practices to ensure maximum protection."
          />
          <FeatureCard 
            icon="bolt"
            title="Lightning Fast"
            description="Generate production-ready smart contracts in seconds, dramatically reducing development time and costs."
          />
          <FeatureCard 
            icon="auto_fix"
            title="Custom Solutions"
            description="Fine-tune and customize your contracts with an intuitive interface designed for both beginners and experts."
          />
          <FeatureCard 
            icon="rocket_launch"
            title="Easy Deployment"
            description="Deploy your contracts directly to the blockchain with our integrated wallet support and deployment tools."
          />
          <FeatureCard 
            icon="update"
            title="Always Updated"
            description="Stay current with the latest Solidity features and security practices through our continuously learning AI."
          />
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 px-8 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 backdrop-blur-sm
                   border border-white/10"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-200 mb-8">
            Join developers worldwide who are already using AI to streamline their smart contract development.
          </p>
          <Link 
            to="/ai" 
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl 
                     bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 
                     text-white font-medium transition-all duration-300 transform hover:scale-105
                     shadow-lg hover:shadow-blue-500/25"
          >
            <span className="material-icons">smart_toy</span>
            <span>Start Creating Now</span>
          </Link>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Home; 