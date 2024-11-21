import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from "@monaco-editor/react";

const ContractGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContract, setGeneratedContract] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contractName, setContractName] = useState('');

  // Mock AI response for now - will be replaced with actual AI integration
  const generateContract = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock generated contract
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

  return (
    <div className="bg-gradient-to-b from-blue-900 to-purple-900 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">AI Smart Contract Generator</h1>
          <p className="text-xl text-blue-200">Generate smart contracts from natural language</p>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6 max-w-4xl mx-auto"
        >
          {/* Contract Name Input */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Contract Name
            </label>
            <input
              type="text"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              placeholder="MyContract"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white placeholder-white/50 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Describe Your Smart Contract
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Create a token contract with minting and burning capabilities, including access control..."
              className="w-full h-32 px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white placeholder-white/50 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Generate Button */}
          <div className="mb-6">
            <button
              onClick={generateContract}
              disabled={isGenerating || !prompt.trim()}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2
                       ${isGenerating || !prompt.trim() 
                         ? 'bg-blue-600/50 cursor-not-allowed' 
                         : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors duration-200`}
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
            </button>
          </div>

          {/* Generated Contract */}
          {generatedContract && (
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Generated Smart Contract
              </label>
              <div className="rounded-lg overflow-hidden">
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
                  }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {generatedContract && (
            <div className="flex space-x-4">
              <button 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg 
                         transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span className="material-icons">file_download</span>
                <span>Download Contract</span>
              </button>
              <button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg 
                         transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span className="material-icons">rocket_launch</span>
                <span>Deploy Contract</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContractGenerator; 