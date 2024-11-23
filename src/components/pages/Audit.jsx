import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from "@monaco-editor/react";

const VulnerabilityCard = ({ title, severity, description, recommendation }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative group mb-4"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 
                    rounded-xl opacity-75 blur transition duration-1000 group-hover:duration-200" />
    <div className="relative bg-[#1a1a3a] p-6 rounded-xl border border-blue-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          severity === 'High' ? 'bg-red-500/20 text-red-400' :
          severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {severity}
        </span>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="bg-black/30 p-4 rounded-lg">
        <h4 className="text-blue-400 font-medium mb-2">Recommendation:</h4>
        <p className="text-gray-300">{recommendation}</p>
      </div>
    </div>
  </motion.div>
);

const Audit = () => {
  const [contract, setContract] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const analyzeContract = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results - In production, this would come from your AI service
      setResults([
        {
          title: "Reentrancy Vulnerability",
          severity: "High",
          description: "The contract may be vulnerable to reentrancy attacks due to state changes after external calls.",
          recommendation: "Implement the checks-effects-interactions pattern and consider using ReentrancyGuard."
        },
        {
          title: "Unchecked Return Value",
          severity: "Medium",
          description: "The contract doesn't check the return value of external calls, which could lead to silent failures.",
          recommendation: "Always check return values from external calls and handle potential failures appropriately."
        },
        {
          title: "Gas Optimization",
          severity: "Low",
          description: "Multiple state variables could be packed together to save gas.",
          recommendation: "Consider reorganizing state variables to optimize for storage slots."
        }
      ]);
    } catch (error) {
      console.error('Error analyzing contract:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#0F1629] min-h-screen text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            y: [20, -20],
            rotate: [0, 10]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full
                   bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),
                                        linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
                       bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
              AI-Powered Security Analysis
            </span>
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Smart Contract Audit
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Analyze your smart contracts for potential vulnerabilities and security issues
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 
                          rounded-2xl opacity-75 blur transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-[#1a1a3a] p-8 rounded-2xl border border-blue-500/20">
              {/* Code Editor */}
              <div className="mb-6">
                <label className="block text-blue-300 text-sm font-medium mb-2">
                  Paste Your Smart Contract Code
                </label>
                <div className="rounded-xl overflow-hidden">
                  <Editor
                    height="400px"
                    defaultLanguage="sol"
                    theme="vs-dark"
                    value={contract}
                    onChange={setContract}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      padding: { top: 16 },
                    }}
                  />
                </div>
              </div>

              {/* Analyze Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={analyzeContract}
                disabled={isAnalyzing || !contract.trim()}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center space-x-2
                         ${isAnalyzing || !contract.trim() 
                           ? 'bg-blue-600/50 cursor-not-allowed' 
                           : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'} 
                         text-white transition-all duration-200 shadow-lg shadow-blue-500/25`}
              >
                {isAnalyzing ? (
                  <>
                    <span className="material-icons animate-spin">refresh</span>
                    <span>Analyzing Contract...</span>
                  </>
                ) : (
                  <>
                    <span className="material-icons">security</span>
                    <span>Analyze Contract</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Analysis Results</h2>
              {results.map((vulnerability, index) => (
                <VulnerabilityCard key={index} {...vulnerability} />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Audit; 