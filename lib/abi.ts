import 'react-toastify/dist/ReactToastify.css';
const CertiStorageABI =
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "certiHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "reporter",
				"type": "address"
			}
		],
		"name": "CertificateReported",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "certiHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uploadTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			}
		],
		"name": "CertificateStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_certiHash",
				"type": "bytes32"
			}
		],
		"name": "reportForged",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentName",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_certiHash",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_expiryDate",
				"type": "uint256"
			}
		],
		"name": "storeCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "certificates",
		"outputs": [
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "uploadTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isForged",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_issuer",
				"type": "address"
			}
		],
		"name": "getReputationScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "reputationScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_certiHash",
				"type": "bytes32"
			}
		],
		"name": "verifyCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "uploadTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isForged",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default CertiStorageABI;