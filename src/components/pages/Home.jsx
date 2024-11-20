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
    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
      <span className="material-icons text-2xl text-white">{icon}</span>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-purple-200">{description}</p>
  </motion.div>
);

const Home = () => (
  <div className="bg-gradient-to-b from-purple-900 to-blue-900 text-white min-h-[calc(100vh-4rem)]">
    {/* Hero Section */}
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-6"
        >
          Code Quest Adventure
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-purple-200 mb-12 max-w-3xl mx-auto"
        >
          Embark on an epic journey through interactive coding challenges and level up your programming skills!
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="space-x-4"
        >
          <Link 
            to="/quest" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Start Adventure
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
    <section id="features" className="py-20 px-8 bg-purple-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Why Choose Code Quest?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="code"
            title="Interactive Challenges"
            description="Learn programming concepts through hands-on coding challenges and real-world problems."
          />
          <FeatureCard 
            icon="military_tech"
            title="Earn Rewards"
            description="Collect badges, achievements, and CodeCoins as you progress through your coding journey."
          />
          <FeatureCard 
            icon="school"
            title="Learn by Doing"
            description="Practice with our built-in code editor and get instant feedback on your solutions."
          />
          <FeatureCard 
            icon="trending_up"
            title="Track Progress"
            description="Monitor your learning journey with detailed progress tracking and statistics."
          />
          <FeatureCard 
            icon="groups"
            title="Community Learning"
            description="Join a community of learners and share your knowledge with others."
          />
          <FeatureCard 
            icon="auto_awesome"
            title="Multiple Languages"
            description="Master various programming languages through specialized quest paths."
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
          Ready to Begin Your Coding Adventure?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl text-purple-200 mb-8"
        >
          Join thousands of learners who have transformed their coding skills through interactive challenges.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-4"
        >
          <Link 
            to="/quest" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span className="material-icons">play_arrow</span>
            <span>Start Now</span>
          </Link>
          <button 
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span className="material-icons">help_outline</span>
            <span>Learn More</span>
          </button>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Home; 