import axios from 'axios';
import request from 'utils/request';

const ImageActions = {
  uploadOne: async (file: File) => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    request(axios.post('/files/image', formData), resolve, reject);
  }),
};

export default ImageActions;
