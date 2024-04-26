export const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

export const parseErrorMsg = (error: string) => {
  console.log(error);
  const json = JSON.parse(JSON.stringify(error));

  return json.reason || json.error?.message;
};
