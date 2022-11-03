import axios from 'axios';
import request from '../utils/request';

const CountryDetailsActions = {
  getOne: async ({ id }: {id: string}): Promise<any> => new Promise((resolve, reject) => {
    request(axios.get(`https://restcountries.com/v3.1/alpha/${id}`), resolve, reject);
  }),
};

export default CountryDetailsActions;
