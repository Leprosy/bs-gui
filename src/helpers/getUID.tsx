const getUID = () => {
  return `${Math.round(Math.random() * 1000)}-${Math.round(
    Math.random() * 1000
  )}`;
};

export default getUID;
