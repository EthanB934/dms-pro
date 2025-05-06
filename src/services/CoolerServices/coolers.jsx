export const createCooler = async (cooler, token) => {
  return await fetch("http://localhost:8000/coolers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token.token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(cooler),
  }).then((res) => res.json());
};

export const getStoreCoolers = async (token) => {
  const coolersPromise = await fetch("http://localhost:8000/coolers", {
    method: "GET",
    headers: {
      Authorization: `Token ${token.token}`,
      Accept: "application/json",
    },
  });

  const coolersArray = coolersPromise.json();

  return coolersArray;
};

export const getCoolerById = async (coolerId, token) => {
  const coolersPromise = await fetch(`http://localhost:8000/coolers/${coolerId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token.token}`,
      Accept: "application/json",
    },
  });

  const coolersArray = coolersPromise.json();

  return coolersArray;
};
