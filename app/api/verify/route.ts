interface Certificate {
  studentName: string;
  ipfsHash: string;
  uploadTimestamp: string;
  expiryDate: string;
  isForged: boolean;
  issuer: string;
}

import { NextRequest, NextResponse } from "next/server";
import contract from "@/lib/serverContract"; // ✅ server-side compatible

export async function POST(req: NextRequest) {
  const { hash } = await req.json();

  try {
    const cert = await contract.methods.verifyCertificate(hash).call() as Certificate;


    if (!cert.ipfsHash) {
      return NextResponse.json({ isValid: false, reason: "Certificate not found" }, { status: 404 });
    }

    const issuerReputation = await contract.methods.getReputationScore(cert.issuer).call();

    return NextResponse.json({
      isValid: true,
      studentName: cert.studentName,
      ipfsLink: `https://ipfs.io/ipfs/${cert.ipfsHash}`,
      uploadDate: new Date(Number(cert.uploadTimestamp) * 1000).toISOString().split("T")[0],
      expiryDate: new Date(Number(cert.expiryDate) * 1000).toISOString().split("T")[0],
      issuerAddress: cert.issuer,
      issuerReputation,
      isForged: cert.isForged,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
