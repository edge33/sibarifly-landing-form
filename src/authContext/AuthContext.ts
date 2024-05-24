import React, { useContext } from 'react';

type AuthContextType = {
  authenticated: boolean;
  setAuthenticated: (token: boolean) => void;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuthContext = () => useContext(AuthContext) as AuthContextType;

export default AuthContext;
