import { css } from 'styled-components';

const AntStyled = css`
  .ant-popover {
    &-title {
      border-radius: 10px 10px 0 0;
    }

    &-inner {
      border-radius: 10px;
    }
  }

  .ant-space {
    width: 100%;
  }

  .ant-table-content > table > thead.ant-table-thead > tr > th.ant-table-cell {
    background-color: #4848fd;
    color: #fff;
  }
`;

export default AntStyled;
