import Web3 from "web3";
const simpelAbi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "records",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "doctorId",
        "type": "string"
      },
      {
        "name": "patientId",
        "type": "string"
      },
      {
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x34461067"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "recordCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x900407bc"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_doctorId",
        "type": "string"
      },
      {
        "name": "_patientId",
        "type": "string"
      },
      {
        "name": "_ipfsHash",
        "type": "string"
      }
    ],
    "name": "createRecord",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xfacff5d2"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "a",
        "type": "string"
      },
      {
        "name": "b",
        "type": "string"
      }
    ],
    "name": "compareStrings",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xbed34bba"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "n",
        "type": "uint256"
      },
      {
        "name": "_doctorId",
        "type": "string"
      }
    ],
    "name": "getDoctor",
    "outputs": [
      {
        "name": "",
        "type": "string[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xc150d899"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "n",
        "type": "uint256"
      },
      {
        "name": "_patientId",
        "type": "string"
      }
    ],
    "name": "getPatient",
    "outputs": [
      {
        "name": "",
        "type": "string[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x38920422"
  }
];
const contractAddr = '0x6230BFBf4a84bF4FA33073FF971B40cCC213c34c';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const setRecord = async () => {
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const contract = new web3.eth.Contract(simpelAbi, contractAddr);
    const gas = await contract.methods.createRecord('a', 'b', 'c').estimateGas();
    const result = await contract.methods.createRecord('a', 'b','c').send({
        from: account, gas
    })
    console.log(result);
}

export const getDoctorRecords =  async (length, doctorId) => {
  await window.ethereum.enable();
  const contract = new web3.eth.Contract(simpelAbi, contractAddr);
  const result = await contract.methods.getDoctor(length ,doctorId).call();
  return result;
};

export const getPatientRecord = async (length, patientId) => {
  await window.ethereum.enable();
  const contract = new web3.eth.Contract(simpelAbi, contractAddr);
  const result = await contract.methods.getPatient(length ,patientId).call();
  return result;
}
export default setRecord;
