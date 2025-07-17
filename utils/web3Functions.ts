import Web3 from "web3";
import CertiStorageABI from "../lib/abi";

const CONTRACT_ADDRESS = "0x91aa8EB4D4C3ff7646692dd92A232F997df66595"; // Your contract
let web3: Web3 | null = null;
let contract: any = null;

if (typeof window !== "undefined" && (window as any).ethereum) {
  web3 = new Web3((window as any).ethereum);
  contract = new web3.eth.Contract(CertiStorageABI, CONTRACT_ADDRESS);
}

export const storeOnBlockchain = async (
  studentName: string,
  certiHash: string,
  ipfsHash: string,
  expiryDate: number
) => {
  if (!contract || !web3) return;

  const accounts = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });

  await contract.methods
    .storeCertificate(studentName, certiHash, ipfsHash, expiryDate)
    .send({ from: accounts[0] });
};
