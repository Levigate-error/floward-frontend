import { FC, useEffect } from 'react';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { State } from 'store/types';
import { setUser } from 'store/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PAGE_SLUGS from 'consts/pageSlugs';

const GlobalFunctionality: FC = () => {
  const dispatch = useAppDispatch();
  const { user, backendNoResponse } = useSelector((state: State) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_USE_LOCAL_API === 'true' && process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_LOCAL_API_BASE_URL
      : process.env.REACT_APP_API_BASE_URL;

    axios.interceptors.request.use((config) => {
      if (localStorage.getItem('token')) {
        // add token to all api calls if token exists
        const token = localStorage.getItem('token');
        if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
      } else if (user?.token) {
        const { token } = user;
        if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => Promise.reject(error));

    axios.interceptors.response.use((response) => response, (error) => {
      // if any api call says 401 Unauthorized, then drop the user and the token
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        dispatch(setUser(null));
      }
      return Promise.reject(error);
    });

    if (localStorage.getItem('token')) {
      dispatch(setUser({
        token: localStorage.getItem('token'),
        authenticated: true,
      }));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!(localStorage.getItem('token') || user) && !backendNoResponse && pathname !== '/auth') {
      navigate(`/${PAGE_SLUGS.Auth}`, { replace: true });
    } else if (user && pathname === `/${PAGE_SLUGS.Auth}`) {
      navigate('/', { replace: true });
    }
  }, [user, backendNoResponse, pathname, navigate]);

  return null;
};

export default GlobalFunctionality;
