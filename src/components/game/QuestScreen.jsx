import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from "@monaco-editor/react";

const QuestScreen = () => {
  const [code, setCode] = useState(
    `def string_master(text):\n    # Your code here\n    pass`
  );

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900">
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
          <div className="mb-6 rounded-lg overflow-hidden">
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

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              onClick={() => console.log('Running code...')}
            >
              <span className="material-icons">play_arrow</span>
              Run Code
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