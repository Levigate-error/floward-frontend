import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import deepEqualObjects from 'utils/deepEqualObjects';
import displayRequestError from 'utils/displayRequestError';
import {
  FieldType, UseEditorProps, UseEditorReturnType,
} from './types';
import { datalify, fieldify, mediafy } from './utils';
import { GetOneType } from '../../actions/_utils/defaultActions/types';

const useEditor = ({
  apiActions,
  parseLoadedData,
  parserObject = {},
  title,
  editorPagePrefix,
  parseSaveData,
  onSaveOne,
  postLoad,
  loadTableData,
}: UseEditorProps): UseEditorReturnType => {
  if (title && !title.slug) title.slug = 'name';

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UseEditorReturnType['data']>({ id: null, ...datalify(parserObject) });
  const [initData, setInitData] = useState<UseEditorReturnType['initData']>(null);
  const [media, setMedia] = useState<UseEditorReturnType['media']>(mediafy(parserObject));

  const itemId = useMemo<number | null>(() => (id && !Number.isNaN(Number(id)) ? parseInt(id, 10) : null), [id]);

  const loadData = useCallback(async () => {
    if (itemId && apiActions?.getOne) {
      setLoading(true);

      await (apiActions?.getOne as GetOneType)({ id: itemId })
        .then((res) => {
          const loadedData: DataType = res?.data?.result || null;

          if (loadedData) {
            const dataToSet: DataType = {};
            const mediaToSet: UseEditorReturnType['media'] = media ? { ...media } : null;

            if (!parseLoadedData) {
              Object.entries(data)
                .forEach(([key, value]) => {
                  dataToSet[key] = loadedData[key] !== undefined ? loadedData[key] : value;
                });
            } else {
              parseLoadedData(loadedData, dataToSet);
            }

            if (mediaToSet) {
              Object.keys(mediaToSet).forEach((key) => {
                mediaToSet[key].initUrl = (loadedData[key] as string | null | undefined) || null;
                mediaToSet[key].url = mediaToSet[key].initUrl;
              });

              setMedia(mediaToSet);
            }

            setData(dataToSet);
            setInitData(dataToSet);

            if (typeof postLoad === 'function') {
              postLoad(dataToSet);
            }
          }
        })
        .catch((e) => {
          displayRequestError(enqueueSnackbar, e, 'An error occurred while trying to get data');
        });

      if (!postLoad) {
        setLoading(false);
      }
    } else if (typeof postLoad === 'function') {
      setLoading(true);
      postLoad(data);
    }
    // eslint-disable-next-line
  }, [itemId]);

  useEffect(() => {
    loadData().then();
    // eslint-disable-next-line
  }, [itemId]);

  const pageTitle = useMemo<string>(() => (
    data?.[title?.slug as string]
      ? (
        itemId
          ? `Change ${title?.label}: ${data?.[title?.slug as string]}`
          : `Creation ${title?.label}: ${data?.[title?.slug as string]}`
      )
      : (itemId ? `Change ${title?.label}` : `Creation ${title?.label}`)
  ), [data, title, itemId]);

  const fields = useMemo<FieldType[]>(() => (
    fieldify({
      parserObject, data, setData,
    })
  ), [data, parserObject]);

  const needsSave = useMemo<boolean>(() => {
    if (!itemId || !deepEqualObjects(data, initData)) return true;

    if (media) {
      const mediaValues = Object.values(media);
      for (let i = 0; i < mediaValues.length; i++) {
        if (mediaValues[i].url !== mediaValues[i].initUrl) return true;
      }
    }

    return false;
  }, [data, initData, media, itemId]);

  const onSave = useCallback(async () => {
    if (onSaveOne) {
      await onSaveOne({
        saveId: itemId,
        saveData: data,
        saveInitData: initData,
        saveMedia: media,
        saveLoading: loading,
        saveSetLoading: setLoading,
        saveNeedsSave: needsSave,
        saveLoadData: loadData,
      });
    } else if (!loading && needsSave && apiActions?.saveOne) {
      setLoading(true);

      await apiActions?.saveOne(!parseSaveData ? { id: itemId, data, media } : await parseSaveData({
        itemId,
        initData,
        data,
        media,
      }))
        .then((res) => {
          const newId = res?.data?.result?.id;
          if (itemId) {
            loadData();
          } else if (newId) {
            if (editorPagePrefix) {
              navigate(`${editorPagePrefix}/${newId}`, { replace: true });
            } else if (loadTableData !== undefined) {
              loadTableData();
            } else {
              console.error('useEditor: editorPagePrefix is not defined');
            }
          } else {
            console.error('useEditor: id wasn\'t returned from the create request');
          }
        })
        .catch((e) => {
          setLoading(false);
          displayRequestError(enqueueSnackbar, e, 'An error occurred while trying to save data');
        });
    } else if (!apiActions?.saveOne) {
      console.error('useEditor: neither apiActions.saveOne nor onSaveOne provided');
    }
    // eslint-disable-next-line
  }, [loading, needsSave, itemId, data, media, loadData]);

  return {
    itemId,
    loading,
    data,
    initData,
    setData,
    setInitData,
    pageTitle,
    fields,
    media,
    setMedia,
    needsSave,
    onSave,
    setLoading,
  };
};

export default useEditor;
