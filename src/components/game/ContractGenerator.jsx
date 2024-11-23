import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from "@monaco-editor/react";

const ContractGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContract, setGeneratedContract] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contractName, setContractName] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const generateContract = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ${contractName || 'MyContract'} {
    // State variables
    address public owner;
    
    // Events
    event ContractDeployed(address indexed _owner);
    
    // Constructor
    constructor() {
        owner = msg.sender;
        emit ContractDeployed(msg.sender);
    }
    
    // Your custom logic will be generated here based on the prompt
    
    // Modifier for owner-only functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
}`;
      
      setGeneratedContract(mockContract);
    } catch (error) {
      console.error('Error generating contract:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContract);
      setIsCopied(true);
      // Reset the "Copied" state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="bg-[#0F1629] min-h-screen text-white relative overflow-hidden">
      {/* Animated Background Elements */}
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
        <motion.div 
          animate={{ 
            y: [-20, 20],
            rotate: [0, -10]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full
                   bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
        />
        
        {/* Animated grid background */}
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
              AI-Powered Generation
            </span>
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Smart Contract Generator
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Transform your ideas into secure smart contracts using natural language
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
            <div className="relative bg-black/40 p-8 rounded-2xl border border-blue-500/20">
              {/* Contract Name Input */}
              <div className="mb-6">
                <label className="block text-blue-300 text-sm font-medium mb-2">
                  Contract Name
                </label>
                <input
                  type="text"
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                  placeholder="MyContract"
                  className="w-full px-4 py-2 rounded-xl bg-black/60 border border-blue-500/20 
                           text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-blue-300 text-sm font-medium mb-2">
                  Describe Your Smart Contract
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example: Create a token contract with minting and burning capabilities..."
                  className="w-full h-32 px-4 py-3 rounded-xl bg-black/60 border border-blue-500/20 
                           text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateContract}
                disabled={isGenerating || !prompt.trim()}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center space-x-2
                         ${isGenerating || !prompt.trim() 
                           ? 'bg-blue-600/50 cursor-not-allowed' 
                           : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'} 
                         text-white transition-all duration-200 shadow-lg shadow-blue-500/25`}
              >
                {isGenerating ? (
                  <>
                    <span className="material-icons animate-spin">refresh</span>
                    <span>Generating Contract...</span>
                  </>
                ) : (
                  <>
                    <span className="material-icons">smart_toy</span>
                    <span>Generate Smart Contract</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Generated Contract */}
          {generatedContract && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 
                            rounded-2xl opacity-75 blur transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-[#0A0A1F] p-8 rounded-2xl border border-blue-500/20">
                <label className="block text-blue-300 text-sm font-medium mb-4">
                  Generated Smart Contract
                </label>
                <div className="rounded-xl overflow-hidden">
                  <Editor
                    height="400px"
                    defaultLanguage="sol"
                    theme="vs-dark"
                    value={generatedContract}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      padding: { top: 16 },
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={copyToClipboard}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 
                             text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center 
                             justify-center space-x-2 shadow-lg shadow-blue-500/25"
                  >
                    <span className="material-icons">
                      {isCopied ? 'check_circle' : 'content_copy'}
                    </span>
                    <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 
                             text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center 
                             justify-center space-x-2 shadow-lg shadow-blue-500/25"
                  >
                    <span className="material-icons">rocket_launch</span>
                    <span>Deploy Contract</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContractGenerator; 