import styled from 'styled-components';

const TableStyled = styled.table`
  display: flex;
  min-width: 60%;
  margin-right: auto;
  margin-left: auto;
`;

const TableRowStyled = styled.tr`
  width: 100%;
`;

const TableBodyStyled = styled.tbody`
  width: 100%;
`;

const TableCellStyled = styled.td`
  border: 1px solid;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  min-width: 500px;
  padding: 10px;
`;

const TableSideCellStyled = styled.td`
  border: 1px solid;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  min-width: 100px;
  padding: 10px;
`;

const TableImageStyled = styled.img`
  height: 120px;
  width: auto;
`;

export default {
  TableCellStyled,
  TableStyled,
  TableRowStyled,
  TableSideCellStyled,
  TableImageStyled,
  TableBodyStyled,
};
