import { AxiosResponse } from 'axios';

const request = async (
  axiosRequest: Promise<AxiosResponse>,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
): Promise<void> => (
  axiosRequest
    .then((res) => {
      resolve(res);
    })
    .catch((e) => {
      reject(e);
    })
);

export default request;
