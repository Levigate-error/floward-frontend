import React, { FC, useMemo, useState } from 'react';
import moment from 'moment';
import Styled from './styled';
import { DatePickerProps } from './types';

const DatePicker: FC<DatePickerProps> = ({
  label, disabled, value, onChange, format,
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  const active = useMemo<boolean>(() => focused || (!!value && value !== ''), [focused, value]);

  return (
    <Styled.Wrapper active={active}>
      {label && <Styled.Label>{label}</Styled.Label>}
      <Styled.DatePicker
        placeholder=""
        allowClear
        format={format}
        value={value
          ? (moment(value, format === 'iso' ? 'YYYY-MM-DDTHH:mm:ssZ'
            : format || 'YYYY-MM-DDTHH:mm:ss')) : moment()}
        onChange={(v) => (
          onChange ? onChange(format === 'iso' ? v?.toISOString() : v?.format(format || 'YYYY-MM-DDTHH:mm:ss')) : null
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
      />
    </Styled.Wrapper>
  );
};

export default DatePicker;
