import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import QuestScreen from './components/game/QuestScreen'
import './index.css'

// Create additional route components
const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 text-white p-8">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6">Code Quest Adventure</h1>
      <p className="text-xl mb-8">Begin your coding journey through interactive challenges!</p>
      <a 
        href="/quest" 
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors duration-200"
      >
        Start Adventure
      </a>
    </div>
  </div>
)

const NotFound = () => (
  <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 text-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! This quest doesn't exist.</p>
      <a 
        href="/" 
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
      >
        Return Home
      </a>
    </div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="quest" element={<QuestScreen />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
) 