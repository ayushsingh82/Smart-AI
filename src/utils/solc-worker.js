// Load solc from CDN with specific version
importScripts('https://binaries.soliditylang.org/bin/soljson-v0.8.19+commit.7dd6d404.js');

let compiler = null;

// OpenZeppelin contract sources (simplified versions)
const openZeppelinSources = {
  "@openzeppelin/contracts/token/ERC721/ERC721.sol": `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    string private _name;
    string private _symbol;
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: address zero is not a valid owner");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: invalid token ID");
        return owner;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    // ... other ERC721 functions ...
}`,
  "@openzeppelin/contracts/token/ERC721/IERC721.sol": `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    // ... other interface functions ...
}`,
  // Add other required OpenZeppelin contracts...
};

self.onmessage = async function(e) {
  const { source } = e.data;
  
  try {
    // Initialize compiler if not already initialized
    if (!compiler) {
      compiler = await initCompiler();
    }

    // Create input object with OpenZeppelin sources
    const input = {
      language: 'Solidity',
      sources: {
        'contract.sol': {
          content: source
        },
        ...openZeppelinSources
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*']
          }
        },
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    };

    // Compile the contract
    const output = JSON.parse(compiler(JSON.stringify(input)));
    
    // Check for compilation errors
    if (output.errors) {
      const errors = output.errors.filter(error => error.severity === 'error');
      if (errors.length > 0) {
        throw new Error(errors[0].formattedMessage || errors[0].message);
      }
      
      // Log warnings if any
      const warnings = output.errors.filter(error => error.severity === 'warning');
      if (warnings.length > 0) {
        console.warn('Compilation warnings:', warnings);
      }
    }

    self.postMessage({ 
      success: true, 
      output,
      warnings: output.errors?.filter(e => e.severity === 'warning') || []
    });
  } catch (error) {
    console.error('Compilation error:', error);
    self.postMessage({ 
      success: false, 
      error: error.message || 'Compilation failed',
      details: error.stack
    });
  }
};

function initCompiler() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Compiler initialization timeout'));
    }, 10000);

    if (self.Module) {
      clearTimeout(timeout);
      resolve(self.Module.cwrap('solidity_compile', 'string', ['string']));
      return;
    }

    self.Module = {
      onRuntimeInitialized: () => {
        clearTimeout(timeout);
        const compile = self.Module.cwrap('solidity_compile', 'string', ['string']);
        resolve(compile);
      },
      print: (text) => {
        console.log('Solc:', text);
      },
      printErr: (text) => {
        console.error('Solc error:', text);
      }
    };
  });
} 