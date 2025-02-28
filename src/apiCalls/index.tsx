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
