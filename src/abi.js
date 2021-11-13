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
    }
];

export default simpelAbi;