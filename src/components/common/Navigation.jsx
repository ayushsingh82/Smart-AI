import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CODEX_TESTNET, switchToCodeXNetwork } from '../../utils/networkConfig';

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const menuRef = useRef(null);
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true);
      }
      
      setScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkNetwork();
    if (window.ethereum) {
      window.ethereum.on('chainChanged', checkNetwork);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', checkNetwork);
      }
    };
  }, []);

  const checkNetwork = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setIsCorrectNetwork(chainId === CODEX_TESTNET.chainId);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask to connect your wallet!');
        return;
      }

      // First ensure we're on the correct network
      const switched = await switchToCodeXNetwork();
      if (!switched) {
        alert('Please switch to the OpenCampus CodeX Testnet to continue');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setWalletAddress(accounts[0]);
      setIsWalletConnected(true);
      
      // Listen for account and network changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      disconnectWallet();
    } else {
      // User switched accounts
      setWalletAddress(accounts[0]);
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    setShowWalletMenu(false);
    
    // Remove event listener
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }
  };

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      alert('Address copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed w-full z-50 bg-[#0F1629] border-b border-blue-500/20 shadow-xl shadow-black/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 
                       flex items-center justify-center shadow-lg shadow-blue-500/20"
            >
              <span className="text-xl">🤖</span>
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                className="text-white font-bold text-xl tracking-tight"
                whileHover={{ scale: 1.05 }}
              >
                Smart<span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">AI</span>
              </motion.span>
      
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex space-x-4">
            <NavLink to="/" current={location.pathname === "/"}>
              <motion.span 
                className="material-icons text-sm mr-1"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                home
              </motion.span>
              Home
            </NavLink>
            <NavLink to="/ai" current={location.pathname === "/ai"}>
              <motion.span 
                className="material-icons text-sm mr-1"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                school
              </motion.span>
              Learn & Create
            </NavLink>
            <NavLink to="/audit" current={location.pathname === "/audit"}>
              <motion.span 
                className="material-icons text-sm mr-1"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                security
              </motion.span>
              Audit
            </NavLink>
          </div>

          {/* Wallet Button */}
          <div className="flex items-center relative" ref={menuRef}>
            <AnimatePresence>
              {isWalletConnected ? (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium
                           flex items-center space-x-3 shadow-lg shadow-black/50
                           bg-[#1a1a3a] hover:bg-[#1e1e4a]
                           border border-blue-500/20"
                >
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex items-center"
                  >
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                      isCorrectNetwork 
                        ? 'bg-emerald-400 shadow-emerald-500/50' 
                        : 'bg-yellow-400 shadow-yellow-500/50'
                    } shadow-sm`}></span>
                  </motion.div>

                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-lg text-blue-300">account_balance_wallet</span>
                    <span className="font-mono text-white">{shortenAddress(walletAddress)}</span>
                  </div>

                  <motion.span 
                    animate={{ rotate: showWalletMenu ? 180 : 0 }}
                    className="material-icons text-blue-300"
                  >
                    expand_more
                  </motion.span>
                </motion.button>
              ) : (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={connectWallet}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-400 
                                rounded-xl opacity-75 group-hover:opacity-100 transition duration-200" />
                  <div className="relative px-6 py-2.5 rounded-xl bg-[#1a1a3a] 
                                flex items-center space-x-2 group-hover:bg-[#1e1e4a]">
                    <motion.span 
                      className="material-icons text-sm text-blue-300"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      account_balance_wallet
                    </motion.span>
                    <span className="text-white font-medium">Connect Wallet</span>
                  </div>
                </motion.button>
              )}

              {/* Wallet Menu */}
              {showWalletMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 top-full w-72 rounded-xl 
                           bg-[#0F1629] shadow-xl shadow-black/50
                           border border-blue-500/20 p-2"
                >
                  {/* Wallet Details Section */}
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="text-xs text-blue-200 font-medium mb-1">Connected Wallet</div>
                    <div className="font-mono text-sm text-white/90 break-all">
                      {walletAddress}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-1">
                    {!isCorrectNetwork && (
                      <button
                        onClick={switchToCodeXNetwork}
                        className="flex items-center space-x-2 w-full px-4 py-2.5 text-sm 
                                 text-yellow-300 hover:bg-white/10 rounded-lg 
                                 transition-colors duration-200 font-medium"
                      >
                       
                     
                      </button>
                    )}
                    <button
                      onClick={copyAddress}
                      className="flex items-center space-x-2 w-full px-4 py-2.5 text-sm 
                               text-white hover:bg-white/10 rounded-lg 
                               transition-colors duration-200 font-medium"
                    >
                      <span className="material-icons text-sm">content_copy</span>
                      <span>Copy Address</span>
                    </button>
                    <button
                      onClick={disconnectWallet}
                      className="flex items-center space-x-2 w-full px-4 py-2.5 text-sm 
                               text-blue-300 hover:bg-white/10 rounded-lg 
                               transition-colors duration-200 font-medium"
                    >
                      <span className="material-icons text-sm">logout</span>
                      <span>Disconnect Wallet</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// NavLink component
const NavLink = ({ to, current, children }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Link
      to={to}
      className={`px-4 py-2 rounded-xl text-sm font-medium
                flex items-center ${
                  current 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-white hover:text-blue-300 hover:bg-[#1a1a3a]'
                }`}
    >
      {children}
    </Link>
  </motion.div>
);

export default Navigation; 