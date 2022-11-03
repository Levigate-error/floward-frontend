import { css, FlattenSimpleInterpolation } from 'styled-components';

const TextClamped = (maxLines: number | string): FlattenSimpleInterpolation => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: ${maxLines};
  word-break: break-word;
`;

export default TextClamped;
