"use client";

import { useState } from "react";
import { uploadToIPFS } from "@/utils/uploadToIPFS";
import { hashFile } from "@/utils/hashFile";
import contract from "@/lib/contract";
import QRCode from "qrcode.react";
import { format } from "date-fns";

export default function UploadCert() {
  const [file, setFile] = useState<File | null>(null);
  const [studentName, setStudentName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [status, setStatus] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !studentName || !expiryDate) {
      setStatus("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Hashing file...");
      const certiHash = await hashFile(file);
      const certiHashBytes32 = "0x" + certiHash;

      setStatus("Uploading to IPFS...");
      const ipfs = await uploadToIPFS(file);
      setIpfsHash(ipfs);

      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];

      setStatus("Sending transaction...");
      const tx = await contract.methods
        .storeCertificate(studentName, certiHashBytes32, ipfs, Math.floor(new Date(expiryDate).getTime() / 1000))
        .send({ from: account });

      setTxHash(tx.transactionHash);
      setStatus("Certificate stored successfully!");
    } catch (err: any) {
      console.error(err);
      setStatus("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload Certificate</h1>

      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-zinc-800"
      />

      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-zinc-800"
      />

      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
      >
        {loading ? "Processing..." : "Upload & Store on Blockchain"}
      </button>

      {status && <p className="mt-4 text-sm text-center text-blue-500">{status}</p>}

      {ipfsHash && (
        <div className="mt-6 text-center">
          <p className="text-sm">IPFS CID:</p>
          <a
            href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 break-all"
          >
            {ipfsHash}
          </a>

          <div className="mt-4 flex justify-center">
            <QRCode value={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} size={128} />
          </div>
        </div>
      )}

      {txHash && (
        <div className="mt-4 text-sm text-center text-green-500">
          ✅ Transaction Hash: <br />
          <span className="break-all">{txHash}</span>
        </div>
      )}
    </div>
  );
}
