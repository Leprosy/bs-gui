const getUID = () => {
  return `${Math.round(Math.random() * 1000)}-${new Date().getTime()}`;
};

export default getUID;
