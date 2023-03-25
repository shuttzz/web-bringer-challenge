import { createContext, ReactNode, useContext, useState } from 'react';

export type TokenContextType = {
  token: string;
  storeToken: (token: string) => void;
};

const TokenContext = createContext<TokenContextType>({} as TokenContextType);

function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('');

  const storeToken = (tokenToStore: string) => {
    setToken(tokenToStore);
  };

  return <TokenContext.Provider value={{ storeToken, token }}>{children}</TokenContext.Provider>;
}

const useToken = () => {
  const context = useContext(TokenContext);

  if (!context) throw new Error('Token context must be use inside TokenProvider');

  return context;
};

export { useToken, TokenProvider };
