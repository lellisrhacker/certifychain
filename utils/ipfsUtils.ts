// utils/ipfsUtils.ts

export const uploadToIPFS = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer YOUR_PINATA_JWT_HERE`,
    },
    body: formData,
  })

  if (!res.ok) throw new Error('Failed to upload to IPFS')

  const data = await res.json()
  return data.IpfsHash // return CID
}
