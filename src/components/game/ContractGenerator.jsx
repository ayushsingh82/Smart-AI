import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from "@monaco-editor/react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { setCompiledContract } from '../../utils/contractArtifacts';

// Initialize Gemini AI with the API key
const API_KEY = "AIzaSyDB3xwiAWd5IAhUn5Jg12Au3pxKuh11RqE";
const genAI = new GoogleGenerativeAI(API_KEY);

const ContractGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContract, setGeneratedContract] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contractName, setContractName] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationResult, setCompilationResult] = useState(null);
  const [compilationDetails, setCompilationDetails] = useState(null);

  const generateContract = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your smart contract.');
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      // Create prompt for Gemini
      const fullPrompt = `Create a secure Solidity smart contract with the following requirements:
      Contract Name: ${contractName || 'MyContract'}
      
      Requirements:
      ${prompt}
      
      Please ensure the contract:
      1. Follows best security practices
      2. Is well-documented with comments
      3. Uses latest Solidity version (0.8.x)
      4. Includes proper error handling
      5. Has events for important state changes
      6. Implements access control where needed
      
      Return only the Solidity code without any additional explanation.`;

      // Get Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Generate content
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      // Extract code between any markdown code blocks if present
      let contractCode = text;
      const codeBlockMatch = text.match(/```solidity\n([\s\S]*?)\n```/);
      if (codeBlockMatch) {
        contractCode = codeBlockMatch[1];
      }

      // Add SPDX license identifier if not present
      if (!contractCode.includes('SPDX-License-Identifier')) {
        contractCode = '// SPDX-License-Identifier: MIT\n' + contractCode;
      }

      setGeneratedContract(contractCode);
    } catch (error) {
      console.error('Error generating contract:', error);
      setError(
        'Failed to generate contract. Please try again. Error: ' + error.message
      );
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

  const compileContract = async () => {
    setIsCompiling(true);
    setError('');
    setCompilationDetails(null);
    
    let worker = null;
    
    try {
      // Create a web worker
      worker = new Worker(new URL('../../utils/solc-worker.js', import.meta.url));
      
      // Create a promise to handle worker response
      const compilePromise = new Promise((resolve, reject) => {
        worker.onmessage = function(e) {
          if (e.data.success) {
            resolve({
              output: e.data.output,
              warnings: e.data.warnings
            });
          } else {
            reject(new Error(e.data.error));
          }
        };
        
        worker.onerror = function(e) {
          reject(new Error('Worker error: ' + e.message));
        };

        // Add timeout with progress updates
        let timeoutCounter = 0;
        const timeoutInterval = setInterval(() => {
          timeoutCounter += 1;
          if (timeoutCounter >= 120) { // 120 seconds total timeout
            clearInterval(timeoutInterval);
            if (worker) {
              worker.terminate();
              reject(new Error('Compilation timed out after 120 seconds'));
            }
          }
        }, 1000);

        // Cleanup interval on success
        worker.onmessage = function(e) {
          clearInterval(timeoutInterval);
          if (e.data.success) {
            resolve({
              output: e.data.output,
              warnings: e.data.warnings
            });
          } else {
            reject(new Error(e.data.error));
          }
        };
      });

      // Send contract to worker
      worker.postMessage({ source: generatedContract });

      // Wait for compilation result
      const { output, warnings } = await compilePromise;

      // Get the contract name
      const fileName = Object.keys(output.contracts['contract.sol'])[0];
      const contract = output.contracts['contract.sol'][fileName];

      if (!contract) {
        throw new Error('No contract found in compilation output');
      }

      // Store compilation result
      const compiledData = {
        bytecode: contract.evm.bytecode.object,
        abi: contract.abi,
        contractName: fileName
      };
      
      setCompiledContract(compiledData);

      // Set success state with warnings if any
      setCompilationResult({
        success: true,
        message: 'Contract compiled successfully!' + 
                 (warnings.length ? ` (${warnings.length} warnings)` : ''),
        warnings: warnings
      });

      // Set compilation details
      setCompilationDetails({
        gasEstimate: parseInt(contract.evm.gasEstimates?.creation?.totalCost || '0'),
        methodCount: contract.abi.filter(item => item.type === 'function').length,
        size: contract.evm.bytecode.object.length / 2,
      });

    } catch (err) {
      console.error('Compilation error:', err);
      setError('Compilation failed: ' + (err.message || 'Unknown error'));
      setCompilationResult({
        success: false,
        message: 'Compilation failed: ' + (err.message || 'Unknown error')
      });
    } finally {
      if (worker) {
        worker.terminate();
      }
      setIsCompiling(false);
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

                  {/* New Compile Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={compileContract}
                    disabled={isCompiling || !generatedContract}
                    className={`flex-1 bg-gradient-to-r from-green-600 to-emerald-600 
                             hover:from-green-500 hover:to-emerald-500 
                             text-white px-6 py-3 rounded-xl transition-all duration-200 
                             flex items-center justify-center space-x-2 shadow-lg shadow-green-500/25
                             ${(!generatedContract || isCompiling) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="material-icons">
                      {isCompiling ? 'pending' : compilationResult?.success ? 'check_circle' : 'code'}
                    </span>
                    <span>
                      {isCompiling ? 'Compiling...' : 
                       compilationResult?.success ? 'Compiled' : 'Compile'}
                    </span>
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!compilationResult?.success}
                    className={`flex-1 bg-gradient-to-r from-blue-600 to-purple-600 
                             hover:from-blue-500 hover:to-purple-500 
                             text-white px-6 py-3 rounded-xl transition-all duration-200 
                             flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25
                             ${!compilationResult?.success ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="material-icons">rocket_launch</span>
                    <span>Deploy Contract</span>
                  </motion.button>
                </div>

                {/* Show compilation result message if exists */}
                {compilationResult && (
                  <div className="mt-4 space-y-4">
                    <div className={`p-4 rounded-xl border ${
                      compilationResult.success 
                        ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {compilationResult.message}
                    </div>

                    {/* Show compilation details if successful */}
                    {compilationResult.success && compilationDetails && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <h3 className="text-blue-400 font-medium mb-2">Compilation Details</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Estimated Gas</p>
                            <p className="text-white font-mono">
                              {compilationDetails.gasEstimate.toLocaleString()} wei
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Contract Size</p>
                            <p className="text-white font-mono">
                              {compilationDetails.size.toLocaleString()} bytes
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Methods</p>
                            <p className="text-white font-mono">
                              {compilationDetails.methodCount} functions
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto mt-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractGenerator; 