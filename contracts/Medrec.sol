pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Medrec {
    uint public recordCount = 0;

    struct Record {
        uint id;
        string doctorId;
        string patientId;
        string ipfsHash;
    }
    
    mapping(uint => Record) public records;

    constructor() public {
        createRecord('12345', '234567', 'abcdefgh');
    }

    function createRecord(string memory _doctorId, string memory _patientId, string memory _ipfsHash) public {
        recordCount++;
        records[recordCount] = Record(recordCount, _doctorId, _patientId, _ipfsHash);
    }

    function compareStrings(string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function getDoctor(uint n, string memory _doctorId) public view returns (string[] memory) {
        uint i;
        uint j = 0;
        string[] memory array = new string[](n);
        for (i = 1; i <= recordCount; i++) {
            if(compareStrings(records[i].doctorId, _doctorId) == true)
            {
                array[j] = records[i].ipfsHash;
                j++;
            }
        }
        return array;
    } 

    function getPatient(uint n, string memory _patientId) public view returns (string[] memory) {
        uint i;
        uint j = 0;
        string[] memory array = new string[](n);
        for (i = 1; i <= recordCount; i++) {
            if(compareStrings(records[i].patientId, _patientId) == true)
            {
                array[j] = records[i].ipfsHash;
                j++;
            }
        }
        return array;
    } 
}