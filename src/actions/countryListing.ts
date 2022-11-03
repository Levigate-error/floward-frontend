import axios from 'axios';
import request from '../utils/request';

const CountryListingActions = {
  getAll: async (): Promise<any> => new Promise((resolve, reject) => {
    request(axios.get('https://restcountries.com/v3.1/all'), resolve, reject);
  }),
};

export default CountryListingActions;
