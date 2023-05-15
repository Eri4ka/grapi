import { FC, useState, ReactNode, createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { UserService } from '@/api/services/UserService';
import { TAuthStatus, TInstanceData } from '@/apptypes/auth';

type TAuthContext = {
  idInstance: string;
  apiTokenInstance: string;
  authStatus: TAuthStatus;
  setAuthStatus: (status: TAuthStatus) => void;
  handleSetInstanceData: ({ idInstance, apiTokenInstance }: TInstanceData) => void;
  handleLogout: () => void;
};

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

type Props = {
  children: ReactNode;
};

const AuthManager: FC<Props> = ({ children }) => {
  // Vars
  const [cookies, setCookie] = useCookies(['idInstance', 'apiTokenInstance']);
  const [authStatus, setAuthStatus] = useState<TAuthStatus>('');
  const [idInstance, setIdInstance] = useState(cookies.idInstance ?? '');
  const [apiTokenInstance, setApiTokenInstance] = useState(cookies.apiTokenInstance ?? '');

  // Handlers
  const handleSetInstanceData = ({ idInstance, apiTokenInstance }: TInstanceData) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
  };

  const handleLogout = () => {
    setAuthStatus('notAuthorized');
  };

  // Effects
  useEffect(() => {
    setCookie('idInstance', idInstance);
    setCookie('apiTokenInstance', apiTokenInstance);
  }, [apiTokenInstance, idInstance, setCookie]);

  useEffect(() => {
    if (idInstance && apiTokenInstance) {
      const fetchStateInstance = async () => {
        const data = await UserService.getStateInstance(idInstance, apiTokenInstance);

        setAuthStatus(data.stateInstance);
      };

      fetchStateInstance();
    }
  }, [apiTokenInstance, idInstance]);

  return (
    <AuthContext.Provider
      value={{
        idInstance,
        apiTokenInstance,
        authStatus,
        setAuthStatus,
        handleSetInstanceData,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthManager;
