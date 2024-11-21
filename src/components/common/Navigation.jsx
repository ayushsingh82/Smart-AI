import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      // Update scroll state for background
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-blue-900/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
    } ${
      isVisible ? 'top-0' : '-top-20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center transform transition-transform group-hover:scale-110">
              <span className="text-xl">🤖</span>
            </div>
            <div className="flex flex-col">
              <span className="text-blue-400 font-bold text-xl tracking-tight">
                Smart<span className="text-blue-400">AI</span>
              </span>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex space-x-4">
            <NavLink to="/" current={location.pathname === "/"}>
              <span className="material-icons text-sm mr-1">home</span>
              Home
            </NavLink>
            <NavLink to="/ai" current={location.pathname === "/ai"}>
              <span className="material-icons text-sm mr-1">school</span>
              Learn & Create
            </NavLink>
          </div>

          {/* Wallet Connect Button */}
          <div className="flex items-center relative" ref={menuRef}>
            {isWalletConnected ? (
              <>
                <button 
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 
                           flex items-center space-x-3 shadow-lg ${
                             isCorrectNetwork 
                               ? 'bg-blue-600/90 hover:bg-blue-700 text-white border border-blue-400/30' 
                               : 'bg-blue-600/90 hover:bg-blue-700 text-white border border-blue-400/30'
                           }`}
                >
                  {/* Network Status Indicator */}
                  <div className="flex items-center">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                      isCorrectNetwork 
                        ? 'bg-emerald-300 shadow-emerald-400/50 shadow-sm' 
                        : 'bg-yellow-300 shadow-yellow-400/50 shadow-sm'
                    }`}></span>
                  </div>

                  {/* Wallet Info */}
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-lg text-white/90">account_balance_wallet</span>
                    <span className="font-mono text-white tracking-wide">{shortenAddress(walletAddress)}</span>
                  </div>

                  {/* Dropdown Arrow */}
                  <span className={`material-icons text-white/90 transition-transform duration-200 ${
                    showWalletMenu ? 'rotate-180' : ''
                  }`}>
                    expand_more
                  </span>
                </button>

                {/* Wallet Menu Dropdown - remains the same */}
                {showWalletMenu && (
                  <div className="absolute right-0 mt-2 top-full w-72 rounded-xl 
                                bg-gradient-to-b from-blue-900/95 to-blue-800/95
                                backdrop-blur-sm shadow-xl shadow-blue-500/10 
                                ring-1 ring-white/10 p-2">
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
                          <span className="material-icons text-sm">swap_horiz</span>
                          <span>Switch to Open Campus Codex</span>
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
                  </div>
                )}
              </>
            ) : (
              <button 
                onClick={connectWallet}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 
                         text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 
                         flex items-center space-x-2 shadow-lg hover:shadow-blue-500/25 border border-white/10"
              >
                <span className="material-icons text-sm">account_balance_wallet</span>
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Enhanced NavLink component
const NavLink = ({ to, current, children }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center
      ${current 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-gray-300 hover:text-white hover:bg-blue-800/50'
      }`}
  >
    {children}
  </Link>
);

export default Navigation; 