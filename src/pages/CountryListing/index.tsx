import React, { FC, useState } from 'react';
import useTable from 'hooks/useTable';
import PageHeader from 'components/PageHeader';
import Table from 'components/Table';
import { Page } from 'styles/elements/page';
import CountryListingActions from 'actions/countryListing';
import PAGE_SLUGS from 'consts/pageSlugs';

import Styled from './styled';

const CountryListingTablePage: FC = () => {
  const [commonNames, setCommonNames] = useState('');
  const [officialNames, setOfficialNames] = useState('');
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const {
    tableColumns,
    tableData,
    loading,
  } = useTable({
    apiActions: {
      getAll: CountryListingActions.getAll,
    },
    parserObject: {
      cca2: {
        title: 'CCA2',
        width: 100,
      },
      name: {
        title: 'Common name',
        minWidth: 100,
        render: ((text, record) => (
          <Styled.PopupButton onClick={
            () => {
              const langs = Object.keys(record.name?.nativeName);
              setIsPopupOpened(true);
              setCommonNames(record.name?.nativeName?.[`${langs[0]}`]?.common);
              setOfficialNames(record.name?.nativeName?.[`${langs[0]}`]?.official);
            }
          }
          >
            {record.name?.common}
          </Styled.PopupButton>
        )),
      },
      capital: {
        title: 'Capital',
        minWidth: 100,
        render: ((text, record) => <p>{record.capital?.[0]}</p>),
      },
      actions: {
        title: 'Actions',
        minWidth: 100,
        render: ((text, record) => (
          <Styled.Link to={`/${PAGE_SLUGS.CountryDetails}/${record.cca2}`}><Styled.EyeIcon /></Styled.Link>
        )),
      },
    },
    tableActions: {
      presets: { edit: false },
    },
  });

  return (
    <Page role="main">
      <PageHeader title="Countries" double />
      <Table
        tableProps={{
          columns: tableColumns,
          dataSource: tableData,
        }}
        havePagination={false}
        loading={loading}
      />
      {isPopupOpened && (
      <Styled.PopupWrapper>
        <Styled.PopupBg
          onClick={() => {
            setIsPopupOpened(false);
            setCommonNames('');
            setOfficialNames('');
          }}
        />
        <Styled.PopupBody>
          <Styled.PopupText>
            <b>Common name:</b>
            {` ${commonNames}`}
          </Styled.PopupText>
          <Styled.PopupText>
            <b>Official name:</b>
            {` ${officialNames}`}
          </Styled.PopupText>
        </Styled.PopupBody>
      </Styled.PopupWrapper>
      )}
    </Page>
  );
};

export default CountryListingTablePage;
