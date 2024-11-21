export const CODEX_TESTNET = {
  chainId: '0xA045C', // 656476 in decimal
  chainName: 'Open Campus Codex',
  nativeCurrency: {
    name: 'Education Token',
    symbol: 'EDU',
    decimals: 18,
  },
  rpcUrls: ['https://testnet.campus.dev'],
  blockExplorerUrls: ['https://explorer.campus.dev'],
};

export const switchToCodeXNetwork = async () => {
  if (!window.ethereum) return false;

  try {
    // Try to switch to the CodeX network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CODEX_TESTNET.chainId }],
    });
    return true;
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [CODEX_TESTNET],
        });
        return true;
      } catch (addError) {
        console.error('Error adding CodeX network:', addError);
        return false;
      }
    }
    console.error('Error switching to CodeX network:', switchError);
    return false;
  }
}; 