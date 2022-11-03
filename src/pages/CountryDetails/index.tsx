import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { Page } from 'styles/elements/page';
import Loading from 'components/Loading';
import EditorHeader from 'components/EditorHeader';
import { GetOneType } from 'actions/_utils/defaultActions/types';
import displayRequestError from 'utils/displayRequestError';
import { UseEditorReturnType } from 'hooks/useEditor/types';
import CountryDetailsActions from 'actions/countryDetailes';
import Styled from './styled';

const getCurrencyString = (val: any): string => {
  let currencyString = '';
  Object.keys(val).forEach((v, index) => {
    if (index === 0) {
      currencyString += `${val[`${v}`]?.name} - ${val[`${v}`]?.symbol}`;
    } else {
      currencyString += `\n${val[`${v}`]?.name} - ${val[`${v}`]?.symbol}`;
    }
  });
  return currencyString;
};

const getLanguageString = (val: any):string => {
  let languageString = '';
  Object.keys(val).forEach((v, index) => {
    if (index === 0) {
      languageString += `${val[`${v}`]}`;
    } else {
      languageString += ` | ${val[`${v}`]}`;
    }
  });
  return languageString;
};

const BetsEditorPage: FC = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [dataLoaded, setDataLoaded] = useState<UseEditorReturnType['data']>({
    id,
    commonName: null,
    officialName: null,
    currencies: null,
    languages: null,
    flag: null,
  });

  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    if (id) {
      await (CountryDetailsActions.getOne as GetOneType)({ id })
        .then((res) => {
          const loadedData: DataType = res?.data?.[0] || null;
          if (loadedData) {
            setDataLoaded({
              id: loadedData.cca2,
              commonName: loadedData.name?.common,
              officialName: loadedData.name?.official,
              currencies: getCurrencyString(loadedData.currencies),
              languages: getLanguageString(loadedData.languages),
              flag: loadedData.flags.svg || loadedData.flags.png,
            });
          }
        })
        .catch((e) => {
          displayRequestError(enqueueSnackbar, e, 'Error happened when retrieving data');
        });
    }
    setLoading(false);
  }, [id, enqueueSnackbar]);

  useEffect((): void => {
    loadData().then();
  }, [loadData]);

  return (
    <Page role="main">
      {loading && <Loading />}
      <EditorHeader title={`Country detail with cca2: ${dataLoaded.id}`} />
      <Styled.TableStyled>
        <Styled.TableBodyStyled>
          <Styled.TableRowStyled>
            <Styled.TableSideCellStyled>Common Name</Styled.TableSideCellStyled>
            <Styled.TableCellStyled>{dataLoaded.commonName}</Styled.TableCellStyled>
          </Styled.TableRowStyled>
          <Styled.TableRowStyled>
            <Styled.TableSideCellStyled>Official Name</Styled.TableSideCellStyled>
            <Styled.TableCellStyled>{dataLoaded.officialName}</Styled.TableCellStyled>
          </Styled.TableRowStyled>
          <Styled.TableRowStyled>
            <Styled.TableSideCellStyled>Currencies</Styled.TableSideCellStyled>
            <Styled.TableCellStyled>{dataLoaded.currencies}</Styled.TableCellStyled>
          </Styled.TableRowStyled>
          <Styled.TableRowStyled>
            <Styled.TableSideCellStyled>Languages</Styled.TableSideCellStyled>
            <Styled.TableCellStyled>{dataLoaded.languages}</Styled.TableCellStyled>
          </Styled.TableRowStyled>
          <Styled.TableRowStyled>
            <Styled.TableSideCellStyled>Flag</Styled.TableSideCellStyled>
            <Styled.TableCellStyled>
              <Styled.TableImageStyled src={dataLoaded.flag} alt="flag" />
            </Styled.TableCellStyled>
          </Styled.TableRowStyled>
        </Styled.TableBodyStyled>
      </Styled.TableStyled>
    </Page>
  );
};

export default BetsEditorPage;
