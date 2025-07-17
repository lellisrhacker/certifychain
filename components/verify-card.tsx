"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/useToast";
import {
  Search,
  QrCode,
  ExternalLink,
  Flag,
  User,
  Calendar,
  Hash,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface VerifyCardProps {
  initialHash?: string;
  onVerificationResult: (result: any) => void;
}

export function VerifyCard({
  initialHash = "",
  onVerificationResult,
}: VerifyCardProps) {
  const [hash, setHash] = useState(initialHash);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (initialHash) {
      handleVerify();
    }
  }, [initialHash]);

  const handleVerify = async () => {
    if (!hash.trim()) {
      toast({
        title: "Hash required",
        description: "Please enter a certificate hash",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    try {
      const res = await fetch(`/api/verify?hash=${hash}`);
      const result = await res.json();

      setVerificationResult(result);
      onVerificationResult(result);

      toast({
        title: result.isValid
          ? "Verification successful"
          : "Verification failed",
        description: result.isValid
          ? "Certificate is valid and authentic"
          : result.reason || "Certificate could not be verified",
        variant: result.isValid ? "default" : "destructive",
      });
    } catch (err) {
      toast({
        title: "Verification error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setIsVerifying(false);
  };

  const handleReportForged = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for reporting. This will be reviewed.",
    });
  };

  return (
    <Card className="glassmorphism border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-purple-400" />
          Verify Certificate
        </CardTitle>
        <CardDescription>
          Enter certificate hash or scan QR code to verify authenticity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hash" className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Certificate Hash
            </Label>
            <div className="flex gap-2">
              <Input
                id="hash"
                placeholder="Enter certificate hash"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                disabled={isVerifying}
                className="font-mono"
              />
              <Button size="icon" variant="outline" disabled>
                <QrCode className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Example: 7184cf8e (short hash for demo)
            </p>
          </div>

          <Button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isVerifying ? "Verifying..." : "Verify Certificate"}
          </Button>
        </div>

        {verificationResult && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              {verificationResult.isValid ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400" />
              )}
              <span
                className={`font-medium ${
                  verificationResult.isValid
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {verificationResult.isValid
                  ? "Certificate Valid"
                  : "Certificate Invalid"}
              </span>
            </div>

            {verificationResult.isValid ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Detail label="Student Name" icon={User} value={verificationResult.studentName} />
                  <Detail label="Upload Date" icon={Calendar} value={verificationResult.uploadDate} />
                  <Detail label="Expiry Date" icon={Calendar} value={verificationResult.expiryDate} />
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4" /> Status
                    </Label>
                    <Badge variant={verificationResult.isForged ? "destructive" : "default"}>
                      {verificationResult.isForged ? "Flagged as Forged" : "Authentic"}
                    </Badge>
                  </div>
                </div>

                <DetailLink label="IPFS Link" value={verificationResult.ipfsLink} />

                <div className="space-y-2">
                  <Label className="text-sm">Issuer Address</Label>
                  <p className="font-mono text-sm bg-muted/20 p-2 rounded">
                    {verificationResult.issuerAddress}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Reputation Score:</span>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {verificationResult.issuerReputation}/100
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReportForged}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Flag className="w-4 h-4" /> Report as Forged
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">
                  {verificationResult.reason || "Unable to verify certificate."}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Detail({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm">
        <Icon className="w-4 h-4" /> {label}
      </Label>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function DetailLink({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <div className="flex items-center gap-2">
        <Input value={value} readOnly className="text-sm" />
        <Button
          size="icon"
          variant="outline"
          onClick={() => window.open(value, "_blank")}
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
