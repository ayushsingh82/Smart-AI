// Store compiled contract data
let compiledContract = {
  bytecode: null,
  abi: null,
  contractName: null
};

export const setCompiledContract = (data) => {
  compiledContract = { ...data };
};

export const getCompiledContract = () => {
  return compiledContract;
}; 