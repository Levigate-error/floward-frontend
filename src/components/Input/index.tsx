import React, {
  FC, FormEvent, useMemo, useState,
} from 'react';
import {
  IconDefinition,
  findIconDefinition,
} from '@fortawesome/fontawesome-svg-core';
import { InputProps } from './types';
import Styled from './styled';

const eyeIcon: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'eye' });

const Input: FC<InputProps> = ({
  value,
  onInput,
  onChange,
  placeholder,
  nativePlaceholder,
  useOnlyNativePlaceholder,
  type = 'text',
  passwordVisible,
  onTogglePassword,
  noNewLine = false,
  readonly = false,
  disabled = false,
  error = false,
  errorMessage = 'You cant\'t leave this field empty',
  onChangeError,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const onInputEvent = (event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>): void => {
    let { value: newValue }: any = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (noNewLine) newValue = newValue.replace(/(\r\n|\n|\r)/gm, '');
    if (type === 'number') newValue = newValue && !Number.isNaN(Number(newValue)) ? parseFloat(newValue) : 0;
    if (!readonly) {
      if (onInput) onInput(newValue);
      if (onChange) onChange(newValue);
    }
  };
  const onFocus = (): void => {
    setFocused(true);
  };
  const onBlur = (): void => {
    if (onChangeError) {
      onChangeError(false);
    }
    setFocused(false);
  };

  const inputActive = useMemo<boolean>(() => (
    focused || (value !== null && value !== undefined && value !== '')
  ), [value, focused]);
  const inputType = useMemo<string>(() => (
    type === 'password' && passwordVisible ? 'text' : type
  ), [type, passwordVisible]);

  return (
    <Styled.Wrapper focused={focused} disabled={disabled}>
      {(placeholder && !useOnlyNativePlaceholder) && (
        <Styled.Placeholder active={inputActive} title={placeholder}>
          {placeholder}
        </Styled.Placeholder>
      )}
      {type === 'textarea' ? (
        <Styled.Textarea
          value={value}
          autoSize={{ minRows: 3 }}
          onInput={onInputEvent}
          onBlur={onBlur}
          onFocus={onFocus}
          readOnly={readonly}
          disabled={disabled}
        />
      ) : (
        <>
          <Styled.Input
            type={inputType}
            value={value}
            placeholder={
              useOnlyNativePlaceholder || (nativePlaceholder && inputActive) ? nativePlaceholder || placeholder : ''
            }
            readOnly={readonly}
            disabled={disabled}
            onInput={onInputEvent}
            onChange={onInputEvent}
            onBlur={onBlur}
            onFocus={onFocus}
            isPassword={type === 'password'}
          />
          {type === 'password' && (
            <Styled.PasswordEye onClick={onTogglePassword} type="button">
              <Styled.PasswordEyeIcon icon={eyeIcon} />
            </Styled.PasswordEye>
          )}
        </>
      )}
      {error && (
        <Styled.ErrorMessage>
          {errorMessage}
        </Styled.ErrorMessage>
      )}
    </Styled.Wrapper>
  );
};

export default Input;
