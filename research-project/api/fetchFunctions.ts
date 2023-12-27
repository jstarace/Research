export const basicFetch = async <returnType>(
  endpoint: string
): Promise<returnType> => {
  console.log("The function: ", endpoint);
  const response = await fetch(endpoint);
  console.log("The response: ", response);

  if (!response.ok) throw new Error("Error!");

  const data = await response.json();

  console.log("The data: ", data);

  return data;
};
