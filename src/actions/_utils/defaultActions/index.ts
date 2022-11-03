import axios, { AxiosResponse } from 'axios';
import request from 'utils/request';
import ImageStore from 'actions/image';
import querify from 'utils/querify';
import { DefaultActionsProps, DefaultActionsReturnType } from './types';

const defaultActions = ({
  requestUrl,
  useRemoveIdAsParam,
  getAllDefaultQuery,
  useGetAllIdAsQuery,
  requestUrlPostText = '',
}: DefaultActionsProps): DefaultActionsReturnType => ({
  getAll: async ({
    query, id,
  }) => new Promise((resolve, reject) => {
    request(axios.get(`${requestUrl}${
      id && !useGetAllIdAsQuery ? `/${id}` : ''
    }${requestUrlPostText}?${
      id && useGetAllIdAsQuery ? `id=${id}&` : ''
    }${
      (!!query && Object.values(query).length > 0) ? `&${
        Object.entries(query)
          .map(([key, value]) => (
            value != null ? `${key}=${value}` : undefined
          ))
          .filter((v) => !!v)
          .join('&')
      }` : ''
    }${
      (getAllDefaultQuery ? `&${querify(getAllDefaultQuery)}` : '')
    }`), resolve, reject);
  }),

  getOne: async ({ id }) => new Promise((resolve, reject) => {
    request(axios.get(`${requestUrl}/${id}${requestUrlPostText}`), resolve, reject);
  }),

  saveOne: async ({
    id, data, media, query, isUpdate,
  }) => new Promise((resolve, reject) => {
    (async () => {
      let proceed = true;
      // upload media if exists
      if (media && !(data instanceof FormData)) {
        const mediaEntries = Object.entries(media);
        for (let i = 0; i < mediaEntries.length; i++) {
          if (!proceed) return;
          const mediaKey = mediaEntries[i][0];
          const mediaValue = mediaEntries[i][1];
          if (mediaValue.file && mediaValue.url !== mediaValue.initUrl) {
            await ImageStore.uploadOne(mediaValue.file as File)
              .then((res) => {
                data[mediaKey] = (res as AxiosResponse).data.result;
              })
              .catch((e) => {
                proceed = false;
                reject(e);
              });
          }
        }
      }

      if (!proceed) return;

      // upload data
      await request(axios[id || isUpdate ? 'put' : 'post'](`${requestUrl}${
        id ? `/${id}` : ''
      }${requestUrlPostText}${
        query ? `?${querify(query)}` : ''
      }`, data), resolve, reject);
    })();
  }),

  removeByIds: async ({ ids }) => new Promise((resolve, reject) => {
    request(axios.delete(useRemoveIdAsParam
      ? `${requestUrl}/${ids[0]}${requestUrlPostText}`
      : `${requestUrl}?ids=${ids.join(',')}`), resolve, reject);
  }),
});

export default defaultActions;
