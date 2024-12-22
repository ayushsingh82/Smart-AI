import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from "@monaco-editor/react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const API_KEY = "AIzaSyDB3xwiAWd5IAhUn5Jg12Au3pxKuh11RqE";
const genAI = new GoogleGenerativeAI(API_KEY);

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
  const [error, setError] = useState('');

  const analyzeContract = async () => {
    if (!contract.trim()) {
      setError('Please enter a smart contract to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    try {
      // Create prompt for Gemini
      const prompt = `Analyze the following Solidity smart contract for security vulnerabilities, best practices, and potential issues. 
      Provide a detailed analysis including:
      1. Security vulnerabilities
      2. Gas optimization issues
      3. Best practice violations
      4. Potential logical flaws
      5. Code quality issues

      For each issue found, provide:
      - Title
      - Severity (High/Medium/Low)
      - Description
      - Recommendation for fixing

      Format the response as a JSON array of objects with the following structure:
      [
        {
          "title": "Issue title",
          "severity": "High/Medium/Low",
          "description": "Detailed description",
          "recommendation": "How to fix"
        }
      ]

      Smart Contract:
      ${contract}

      Return only the JSON array without any additional explanation.`;

      // Get Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Generate analysis
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the JSON response
      let vulnerabilities = [];
      try {
        // Clean the response text to ensure it's valid JSON
        const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
        vulnerabilities = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        throw new Error('Failed to parse analysis results');
      }

      // Validate and format the results
      const formattedResults = vulnerabilities.map(v => ({
        title: v.title || 'Unnamed Issue',
        severity: ['High', 'Medium', 'Low'].includes(v.severity) ? v.severity : 'Medium',
        description: v.description || 'No description provided',
        recommendation: v.recommendation || 'No recommendation provided'
      }));

      setResults(formattedResults);
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Failed to analyze contract: ' + error.message);
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

        {/* Error Display */}
        {error && (
          <div className="max-w-4xl mx-auto mt-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Audit; 