import Web3 from "web3";
import ABI from "./abi";

const web3 = new Web3("http://127.0.0.1:7545"); // Ganache RPC URL

export const CONTRACT_ADDRESS = "0x91aa8EB4D4C3ff7646692dd92A232F997df66595";

const contract = new web3.eth.Contract(ABI as any, CONTRACT_ADDRESS);

export default contract;
