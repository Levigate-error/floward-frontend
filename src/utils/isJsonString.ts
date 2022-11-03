const isJsonString = (str: any): any => {
  try {
    const json = JSON.parse(str);
    if (typeof json === 'boolean') return false;
    return json;
  } catch (e) {
    return false;
  }
};

export default isJsonString;
