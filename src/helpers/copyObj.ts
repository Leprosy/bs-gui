const copyObj = (obj: unknown) => {
  return JSON.parse(JSON.stringify(obj));
}


export default copyObj;