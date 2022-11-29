import React, { createContext, useCallback, useState, useContext, FC, ReactNode, ReactChild, ReactChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import { useToast } from './toast';

interface AuthState {
  token: string;
  user: Object;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: Object;
  signIn(credentials: SignInCredencials): Promise<void>;
  signOut(): void;
}

type Props = {
  children: JSX.Element,
};

const AuthContext = createContext<IAuthContext>({} as IAuthContext);


export const AuthProvider: React.FC<Props> = ({children}) => {
  const navigate = useNavigate();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@LogWorking:token');
    const user = localStorage.getItem('@LogWorking:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredencials) => {
    
    await api.post('sessions', { email, password })
    .then((response) => {
      const { token, user } = response.data;

      localStorage.setItem('@LogWorking:token', token);
      localStorage.setItem('@LogWorking:user', JSON.stringify(user));
  
      setData({ token, user });
  
      navigate('/dashboard');
    })
    .catch(() => {
      alert('Revise suas credenciais')
    })

    
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@LogWorking:token');
    localStorage.removeItem('@LogWorking:user');

    
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