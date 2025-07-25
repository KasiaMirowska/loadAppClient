export const s3FileUpload = async (file: File, customKey: string) => {
  if (!file) return;

  if (!customKey || !customKey.includes("/")) {
    throw new Error(
      "customKey must include folder/structure like receiptId/image_0.jpg"
    );
  }

  const apiBase = "https://stej0scudl.execute-api.us-east-1.amazonaws.com"; // Your API Gateway
  const encodedKey = encodeURIComponent(customKey);

  const response = await fetch(
    `${apiBase}/generate-presigned-url?fileName=${encodedKey}&fileType=${file.type}`
  );

  if (!response.ok) {
    throw new Error("Failed to get presigned URL");
  }

  const { url, key }: { url: string; key: string } = await response.json(); // key should match `customKey`

  const uploadResponse = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    try {
      const jsonError = JSON.parse(errorText);
      throw new Error(jsonError.error || "Upload failed");
    } catch {
      throw new Error("Upload failed (non-JSON response): " + errorText);
    }
  }

  return {
    success: true,
    key,
  };
};
