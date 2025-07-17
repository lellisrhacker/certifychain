export async function uploadToIPFS(file: File): Promise<string> {
  const data = new FormData();
  data.append("file", file);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT || ""}`,
    },
    body: data,
  });

  const json = await res.json();
  return json.IpfsHash;
}
