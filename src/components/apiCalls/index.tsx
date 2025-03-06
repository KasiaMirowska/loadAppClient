export const apiCall = async () => {
  const response = await fetch("http://localhost:8080");
  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    console.log("eee jere", errorData);
    throw new Error(errorData.error || "Unknown API error");
  }
};

export const s3FileUpload = async (file: any) => {
  if (!file) return;
  //generate access url to s3 bucket
  const response = await fetch(
    `http://localhost:8080/generate-presigned-url?fileName=${file.name}&fileType=${file.type}`
  );

  const data = await response.json();

  const { url } = data;
  const uploadResponse = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      // "Access-Control-Allow-Origin": "*",
    },
    body: file,
  });

  if (uploadResponse.ok) {
    return { success: true };
  } else {
    const textResponse = await uploadResponse.text();
    console.log("Raw response text:", textResponse);

    // Try to parse the response as JSON, if possible
    try {
      const errorData = JSON.parse(textResponse);
      console.log("Parsed error data:", errorData);
      throw new Error(errorData.error || "Error during upload");
    } catch (e) {
      // If it's not valid JSON, it's likely an XML error page
      console.log("Error response is not JSON, raw response:", textResponse);
      throw new Error("Error during upload (non-JSON response)");
    }
  }
};
