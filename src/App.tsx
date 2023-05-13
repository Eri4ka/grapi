import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '@/components/AuthManager';
import GetInstanceForm from '@/components/GetInstanceForm';
import GetQrForm from '@/components/GetQrForm';
import AppLayout from '@/ui/AppLayout';

const App = () => {
  const { authStatus } = useContext(AuthContext);

  const [isOpenInstanceForm, setIsOpenInstanceForm] = useState(false);
  const [isOpenQrForm, setIsOpenQrForm] = useState(false);

  useEffect(() => {
    if (authStatus === '') {
      setIsOpenInstanceForm(true);
    }

    if (authStatus === 'notAuthorized') {
      setIsOpenQrForm(true);
      setIsOpenInstanceForm(false);
    }

    if (authStatus === 'authorized') {
      setIsOpenQrForm(false);
      setIsOpenInstanceForm(false);
    }
  }, [authStatus]);

  return (
    <AppLayout>
      <GetInstanceForm isOpen={isOpenInstanceForm} />
      <GetQrForm isOpen={isOpenQrForm} />
    </AppLayout>
  );
};

export default App;
