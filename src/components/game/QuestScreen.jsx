import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from "@monaco-editor/react";

const QuestScreen = () => {
  const [code, setCode] = useState(
    `def string_master(text):\n    # Your code here\n    pass`
  );
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');

    try {
      // Parse the code and execute it
      const codeLines = code.split('\n');
      let outputText = '> Python 3.9.0\n';
      
      // Simple code evaluation (for demonstration)
      for (const line of codeLines) {
        if (line.includes('print')) {
          // Extract content between quotes
          const printMatch = line.match(/print\("(.*)"\)/);
          if (printMatch && printMatch[1]) {
            outputText += `${printMatch[1]}\n`;
          }
        }
      }

      // Add timestamp
      outputText += `\nExecuted at: ${new Date().toLocaleTimeString()}\n`;
      outputText += 'Process finished with exit code 0';
      
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for effect
      setOutput(outputText);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Python Plains</h1>
          <p className="text-xl text-purple-200">Level 1: Variables & Data Types</p>
        </motion.div>

        {/* Quest Card */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6 max-w-4xl mx-auto"
        >
          {/* Quest Header */}
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🐍</span>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-white">String Master Challenge</h2>
              <p className="text-purple-200">Reward: 100 CodeCoins + String Manipulation Badge</p>
            </div>
          </div>

          {/* Challenge Description */}
          <div className="mb-6">
            <p className="text-white">Create a function that reverses a string and counts its vowels.</p>
          </div>

          {/* Code Editor */}
          <div className="mb-4 rounded-lg overflow-hidden">
            <Editor
              height="300px"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 },
              }}
            />
          </div>

          {/* Terminal Output */}
          <div className="mb-6">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Terminal Output</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap h-32 overflow-y-auto">
                {output || 'Click "Run Code" to see the output'}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button 
              className={`${
                isRunning 
                  ? 'bg-purple-700 cursor-wait' 
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2`}
              onClick={runCode}
              disabled={isRunning}
            >
              <span className="material-icons">
                {isRunning ? 'hourglass_empty' : 'play_arrow'}
              </span>
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              onClick={() => console.log('Submitting solution...')}
            >
              <span className="material-icons">check</span>
              Submit Solution
            </button>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white/10 rounded-full h-4">
            <motion.div 
              className="bg-purple-500 rounded-full h-4"
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-purple-200">
            <span>Progress: 33%</span>
            <span>2/6 Challenges Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestScreen; 