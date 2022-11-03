const querify = (queryObj: QueryType): string => new URLSearchParams(queryObj as any).toString();

export default querify;
