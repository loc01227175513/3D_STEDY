import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/common/constant';
import Cookies from 'js-cookie';

const saveAccessToken = (token: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    expires: 7,
  });
};

const removeAllToken = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

const saveRefreshToken = (token: string) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    expires: 7,
  });
};

const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export { saveAccessToken, removeAllToken, saveRefreshToken, getAccessToken, getRefreshToken };
