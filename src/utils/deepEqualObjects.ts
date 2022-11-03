const deepEqualObjects = (object1: any, object2: any): boolean => {
  if (!object1 || !object2) return false;

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let i = 0; i < keys1.length; i++) {
    const val1 = object1[keys1[i]];
    const val2 = object2[keys1[i]];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqualObjects(val1, val2))
      || (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
};

const isObject = (object: any): boolean => object != null && typeof object === 'object';

export default deepEqualObjects;
