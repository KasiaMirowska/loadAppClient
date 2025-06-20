export const s3FileUpload = async (file: File, receiptId: string) => {
  if (!file) return;

  // 1. Get presigned upload URL from your deployed API Gateway
  const apiBase = "https://1wqyztt31g.execute-api.us-east-1.amazonaws.com"; // <-- Replace with your actual one
  const response = await fetch(
    `${apiBase}/generate-presigned-url?fileName=${encodeURIComponent(
      file.name
    )}&fileType=${file.type}&receiptId=${receiptId}`
  );

  if (!response.ok) throw new Error("Failed to get presigned URL");
  const { url, key } = await response.json(); // `key` is the S3 key (optional if returned)

  // 2. Upload file to S3 using the presigned URL
  const uploadResponse = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (uploadResponse.ok) {
    return { success: true, key };
  } else {
    const errorText = await uploadResponse.text();
    try {
      const jsonError = JSON.parse(errorText);
      throw new Error(jsonError.error || "Upload failed");
    } catch {
      throw new Error("Upload failed (non-JSON response): " + errorText);
    }
  }
};
