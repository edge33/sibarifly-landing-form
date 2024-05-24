import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import instance, { setToken } from '../axios/axiosInstance';

type AuthContextProviderProps = {
  children: JSX.Element;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const tokenResponse = await instance.post<{ token: string }>(
          '/auth/refreshToken',
        );
        setAuthenticated(!!tokenResponse.data.token);
        setToken(tokenResponse.data.token);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
