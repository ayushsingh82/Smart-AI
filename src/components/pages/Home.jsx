import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animated gradient text component
const GradientText = ({ children, className }) => (
  <motion.span
    className={`inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 
              text-transparent bg-clip-text bg-[length:200%_auto] ${className}`}
    animate={{
      backgroundPosition: ['0%', '100%', '0%'],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {children}
  </motion.span>
);

// Enhanced Feature Card with 3D hover effect
const FeatureCard = ({ icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl 
                    opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200" />
      <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl
                    transition-all duration-300 group-hover:bg-gradient-to-br 
                    group-hover:from-gray-900/90 group-hover:to-black/90">
        <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl 
                      flex items-center justify-center mb-6 group-hover:scale-110 
                      transform transition-all duration-300 shadow-xl">
          <span className="material-icons text-3xl text-white">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent 
                     group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                     group-hover:from-blue-400 group-hover:to-purple-400 
                     transition-all duration-300">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, role, content, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative group"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl 
                    opacity-75 blur transition duration-1000 group-hover:duration-200" />
    <div className="relative bg-black/40 p-6 rounded-2xl border border-blue-500/20">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="text-lg font-semibold text-white">{name}</h4>
          <p className="text-blue-400 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-300">{content}</p>
    </div>
  </motion.div>
);

// Integration Card Component
const IntegrationCard = ({ icon, title }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-black/40 p-4 rounded-xl border border-blue-500/20 flex items-center space-x-3"
  >
    <span className="material-icons text-blue-400">{icon}</span>
    <span className="text-white">{title}</span>
  </motion.div>
);

const Home = () => {
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const backgroundY = useTransform(springScroll, [0, 1], ['0%', '50%']);
  const opacity = useTransform(springScroll, [0, 0.5], [1, 0]);

  // Floating animation for background elements
  const floatingAnimation = {
    y: [20, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <div className="bg-[#0F1629] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen relative">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ opacity }}
        >
          {/* Animated gradient orbs */}
          <motion.div 
            animate={floatingAnimation}
            className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full
                     bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          />
          <motion.div 
            animate={floatingAnimation}
            transition={{ delay: 2 }}
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full
                     bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
          />
          
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),
                                          linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
                         bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative pt-32 pb-20 px-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                         border border-blue-500/20 backdrop-blur-sm"
              >
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 
                              text-transparent bg-clip-text">
                  ✨ Powered by Advanced AI Technology
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center text-6xl sm:text-7xl font-bold mb-8"
            >
              <GradientText>
                Smart Contracts
                <br />
                Made Intelligent
              </GradientText>
            </motion.h1>

            {/* Hero Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Transform natural language into secure, production-ready smart contracts with the power of AI.
              Build faster, smarter, and with confidence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/ai"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                           text-white font-medium transition-all duration-300 flex items-center 
                           space-x-2 shadow-lg shadow-blue-500/25 hover:shadow-purple-500/25 
                           hover:from-blue-500 hover:to-purple-500"
                >
                  <span className="material-icons">smart_toy</span>
                  <span>Start Creating</span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#features"
                  className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white 
                           font-medium transition-all duration-300 flex items-center space-x-2 
                           backdrop-blur-sm border border-white/10"
                >
                  <span className="material-icons">explore</span>
                  <span>Explore Features</span>
                </a>
              </motion.div>
            </motion.div>

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
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 
                                rounded-xl opacity-75 group-hover:opacity-100 blur transition 
                                duration-300 group-hover:duration-200" />
                  <div className="relative p-6 rounded-xl bg-gray-900 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                      className="text-3xl font-bold mb-2"
                    >
                      <GradientText>{stat.number}</GradientText>
                    </motion.div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

     

      {/* How It Works Section */}
      <section className="py-20 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <GradientText>How It Works</GradientText>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Generate smart contracts in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "edit_note",
                title: "Describe Your Contract",
                description: "Write your requirements in plain English"
              },
              {
                icon: "smart_toy",
                title: "AI Generation",
                description: "Our AI transforms your description into Solidity code"
              },
              {
                icon: "rocket_launch",
                title: "Deploy & Use",
                description: "Review, customize, and deploy your contract"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl 
                              opacity-75 blur transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-black/40 p-8 rounded-2xl border border-blue-500/20 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl 
                                mx-auto mb-6 flex items-center justify-center text-3xl">
                    <span className="material-icons">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-8 relative bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <GradientText>Supported Integrations</GradientText>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Compatible with popular blockchain development tools
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <IntegrationCard icon="account_balance_wallet" title="MetaMask" />
            <IntegrationCard icon="hub" title="Hardhat" />
            <IntegrationCard icon="developer_board" title="Truffle" />
            <IntegrationCard icon="memory" title="OpenZeppelin" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <GradientText>Developer Testimonials</GradientText>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what other developers are saying about SmartAI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Alex Thompson"
              role="Blockchain Developer"
              content="SmartAI has revolutionized how I write smart contracts. What used to take days now takes minutes."
              image="https://i.pravatar.cc/150?img=1"
            />
            <TestimonialCard
              name="Sarah Chen"
              role="DeFi Protocol Engineer"
              content="The code quality is impressive. It's like having a senior Solidity developer on your team."
              image="https://i.pravatar.cc/150?img=5"
            />
            <TestimonialCard
              name="Michael Rodriguez"
              role="Smart Contract Auditor"
              content="I'm impressed by the security considerations in the generated contracts. Highly recommended."
              image="https://i.pravatar.cc/150?img=8"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-8 relative bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <GradientText>Frequently Asked Questions</GradientText>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How secure are the generated contracts?",
                answer: "All contracts follow industry best practices and undergo automated security checks."
              },
              {
                question: "Can I customize the generated code?",
                answer: "Yes, you can edit and customize the generated code to match your specific requirements."
              },
              {
                question: "What blockchains are supported?",
                answer: "We support all EVM-compatible blockchains including Ethereum, BSC, and Polygon."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl 
                              opacity-75 blur transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-black/40 p-6 rounded-xl border border-blue-500/20">
                  <h3 className="text-lg font-semibold mb-2 text-white">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 
                          rounded-3xl opacity-75 group-hover:opacity-100 blur transition 
                          duration-1000 group-hover:duration-200" />
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-black 
                          text-center border border-white/10">
              <h2 className="text-4xl font-bold mb-6">
                <GradientText>Ready to Get Started?</GradientText>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join developers worldwide who are already using AI to streamline their smart contract development.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/ai"
                  className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl 
                           bg-gradient-to-r from-blue-600 to-purple-600 
                           hover:from-blue-500 hover:to-purple-500 text-white font-medium 
                           transition-all duration-300 shadow-lg shadow-blue-500/25 
                           hover:shadow-purple-500/25"
                >
                  <span className="material-icons">smart_toy</span>
                  <span>Start Creating Now</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home; 