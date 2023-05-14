import { useContext, useEffect, useState } from 'react';

import { NotificationService } from '@/api/services/NotificationService';
import { AuthContext } from '@/components/AuthManager';
import Chat from '@/components/Chat';
import GetInstanceForm from '@/components/GetInstanceForm';
import GetQrForm from '@/components/GetQrForm';
import { MessageContext } from '@/components/MessageManager';
import AppLayout from '@/ui/AppLayout';

const App = () => {
  const { authStatus, setAuthStatus, idInstance, apiTokenInstance } = useContext(AuthContext);
  const { companionPhone, messageData, handleAddMessageData } = useContext(MessageContext);

  const isInstanceFormOpen = authStatus === '';
  const isQrFormOpen = authStatus === 'notAuthorized';
  const isChatOpen = authStatus === 'authorized';

  // useEffect(() => {
  //   if (authStatus === '') {
  //     setIsOpenInstanceForm(true);
  //   }

  //   if (authStatus === 'notAuthorized') {
  //     setIsOpenQrForm(true);
  //     setIsOpenInstanceForm(false);
  //   }

  //   if (authStatus === 'authorized') {
  //     setIsOpenQrForm(false);
  //     setIsOpenInstanceForm(false);
  //   }
  // }, [authStatus]);

  useEffect(() => {
    const fetchNoty = async () => {
      const response = await NotificationService.getNotification(idInstance, apiTokenInstance);

      if (response) {
        const responseBody = await response.body;

        if (responseBody.typeWebhook === 'stateInstanceChanged') {
          setAuthStatus(responseBody.stateInstance);
          await NotificationService.deleteNotification(idInstance, apiTokenInstance, response.receiptId);
        }

        if (responseBody.typeWebhook === 'outgoingMessageReceived') {
          await NotificationService.deleteNotification(idInstance, apiTokenInstance, response.receiptId);
        }

        if (responseBody.typeWebhook === 'incomingMessageReceived') {
          // handleAddMessageData({idMessage: responseBody.idMessage, })
          await NotificationService.deleteNotification(idInstance, apiTokenInstance, response.receiptId);
        }
      }
    };

    const timer = setInterval(() => fetchNoty(), 5000);
    return () => {
      clearInterval(timer);
    };
  }, [idInstance, apiTokenInstance, setAuthStatus]);
  console.log(authStatus);
  return (
    <AppLayout>
      {isInstanceFormOpen && <GetInstanceForm />}
      {isQrFormOpen && <GetQrForm />}
      {isChatOpen && <Chat />}
    </AppLayout>
  );
};

export default App;
