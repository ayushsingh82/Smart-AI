import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
  >
    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
      <span className="material-icons text-2xl text-white">{icon}</span>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-blue-200">{description}</p>
  </motion.div>
);

const Home = () => (
  <div className="bg-gradient-to-b from-blue-900 to-purple-900 text-white min-h-[calc(100vh-4rem)]">
    {/* Hero Section */}
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-6"
        >
          AI-Powered Smart Contract Generator
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-blue-200 mb-12 max-w-3xl mx-auto"
        >
          Transform natural language into secure, production-ready smart contracts with the power of AI
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="space-x-4"
        >
          <Link 
            to="/ai" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Start Generating
          </Link>
          <a 
            href="#features" 
            className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>

    {/* Features Section */}
    <section id="features" className="py-20 px-8 bg-blue-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Why Use Smart Contract AI?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="code"
            title="Natural Language Input"
            description="Describe your contract requirements in plain English and let AI handle the code generation."
          />
          <FeatureCard 
            icon="security"
            title="Security First"
            description="Generated contracts follow best practices and include essential security features."
          />
          <FeatureCard 
            icon="bolt"
            title="Instant Generation"
            description="Get production-ready smart contracts in seconds, not hours or days."
          />
          <FeatureCard 
            icon="auto_fix"
            title="Customizable Output"
            description="Fine-tune the generated contracts to match your specific requirements."
          />
          <FeatureCard 
            icon="rocket_launch"
            title="One-Click Deploy"
            description="Deploy your contracts directly to the blockchain with integrated wallet support."
          />
          <FeatureCard 
            icon="update"
            title="Always Updated"
            description="Stay current with the latest Solidity features and security practices."
          />
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Generate Your Smart Contract?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl text-blue-200 mb-8"
        >
          Join developers who are already using AI to streamline their smart contract development.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-4"
        >
          <Link 
            to="/ai" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span className="material-icons">smart_toy</span>
            <span>Try It Now</span>
          </Link>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Home; 