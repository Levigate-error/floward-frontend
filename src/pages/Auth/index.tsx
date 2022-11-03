import React, {
  FC, FormEvent, useCallback, useState,
} from 'react';
import Loading from 'components/Loading';
import Input from 'components/Input';
import { useAppDispatch } from 'store';
import { login } from 'store/auth/thunks';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import displayRequestError from 'utils/displayRequestError';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Styled from './styled';
import { setUser } from '../../store/auth';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isRemembered, setIsRemembered] = useState<boolean>(false);

  const onChangeCheckbox = (e: CheckboxChangeEvent):void => {
    setIsRemembered(e.target.checked);
  };
  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!email) {
      setEmailError(true);
      setEmailErrorMessage('Email should not be empty');
    } else if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage('Password should not be empty');
    } else if (!(/\S+@\S+\.\S+/.test(email))) {
      setEmailError(true);
      setEmailErrorMessage('Email should be in valid form');
    } else if (!loading) {
      setLoading(true);
      await dispatch(login({ email, password, isRemembered }))
        .unwrap()
        .then((token) => {
          navigate('/', { replace: true });
          if (token) {
            dispatch(setUser({
              token,
              authenticated: true,
            }));
          }
        })
        .catch((e) => {
          setLoading(false);
          displayRequestError(enqueueSnackbar, e, 'An error occurred while trying to login');
        });
    }
  }, [loading, email, password, isRemembered, dispatch, navigate, enqueueSnackbar]);

  return (
    <Styled.Wrapper>
      <Styled.PageBox title="Login">
        {loading && <Loading />}

        <Styled.Form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Email"
            nativePlaceholder="yourmail@gmail.com"
            value={email}
            onInput={(value: string) => setEmail(value)}
            error={emailError}
            errorMessage={emailErrorMessage}
            onChangeError={setEmailError}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onInput={(value: string) => setPassword(value)}
            onTogglePassword={() => setPasswordVisible(!passwordVisible)}
            passwordVisible={passwordVisible}
            error={passwordError}
            errorMessage={passwordErrorMessage}
            onChangeError={setPasswordError}
          />
          <Styled.Checkbox onChange={onChangeCheckbox}>Remember me</Styled.Checkbox>
          <Styled.Button type="submit">
            <span>Login</span>
          </Styled.Button>
        </Styled.Form>
      </Styled.PageBox>
    </Styled.Wrapper>
  );
};

export default Auth;
