export const createCooler = async (token) => {

  const coolerPromise = await fetch("http://localhost:8000/coolers", {
    method: "POST",
    headers: {
      Authorization: `Token ${token.token}`,
      Accept: "application/json",
    },
  });

  const cooler = coolerPromise.json()

  return cooler
};
