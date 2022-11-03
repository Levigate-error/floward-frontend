import React, { FC, useMemo, useState } from 'react';
import isJsonString from 'utils/isJsonString';
import Styled from './styled';
import { SelectProps } from './types';

const Select: FC<SelectProps> = ({
  value,
  onChange,
  label,
  options,
  selectProps,
  disabled,
  postContent,
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  const active = useMemo<boolean>(() => focused || (!!value && value !== ''), [focused, value]);

  return (
    <Styled.Wrapper active={active}>
      {label && <Styled.Label title={label}>{label}</Styled.Label>}
      <Styled.Select
        value={value}
        onChange={(v) => (onChange ? onChange(isJsonString(v) || v) : null)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        {...selectProps}
      >
        {options.map((option) => (
          <Styled.Option
            key={option.id}
            value={['string', 'number'].includes(typeof option.value) ? option.value : JSON.stringify(option.value)}
          >
            {option.label}
          </Styled.Option>
        ))}
      </Styled.Select>
      {postContent}
    </Styled.Wrapper>
  );
};

export default Select;
