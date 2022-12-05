import React, { createContext, useCallback, useState, useContext, FC, ReactNode, ReactChild, ReactChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import { useToast } from './toast';

interface User {
  name: string;
  email: string;
  path: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: User;
  signIn(credentials: SignInCredencials): Promise<void>;
  signOut(): void;
}

type Props = {
  children: JSX.Element,
};

const AuthContext = createContext<IAuthContext>({} as IAuthContext);


export const AuthProvider: React.FC<Props> = ({children}) => {
  const navigate = useNavigate();

  window.addEventListener('storage', () => {
    const token = localStorage.getItem('@MPSchemas:token');

    if (!token)
      signOut();
  });

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@MPSchemas:token');
    const user = localStorage.getItem('@MPSchemas:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredencials) => {
    
    await api.post('login', { email, password })
    .then((response) => {
      const { token, user } = response.data;

      localStorage.setItem('@MPSchemas:token', token);
      localStorage.setItem('@MPSchemas:user', JSON.stringify(user));
  
      setData({ token, user });
  
      navigate('/esquemas');
    })
    .catch(() => {
      alert('Revise suas credenciais')
    })

    
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@MPSchemas:token');
    localStorage.removeItem('@MPSchemas:user');

    
    setData({} as AuthState);

    navigate('/login');
  }, []);

  return <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}