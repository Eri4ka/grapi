import { useContext, useEffect } from 'react';

import { NotificationService } from '@/api/services/NotificationService';
import { AuthContext } from '@/components/AuthManager';
import Chat from '@/components/Chat';
import GetInstanceForm from '@/components/GetInstanceForm';
import GetQrForm from '@/components/GetQrForm';
import { MessageContext } from '@/components/MessageManager';
import { getCurrentTime } from '@/helpers/message';
import AppLayout from '@/ui/AppLayout';

const App = () => {
  const { authStatus, setAuthStatus, idInstance, apiTokenInstance } = useContext(AuthContext);
  const { companionPhone, handleAddMessageData } = useContext(MessageContext);

  const isInstanceFormOpen = authStatus === '';
  const isQrFormOpen = authStatus === 'notAuthorized';
  const isChatOpen = authStatus === 'authorized';

  useEffect(() => {
    if (idInstance && apiTokenInstance) {
      const fetchNoty = async () => {
        const response = await NotificationService.getNotification(idInstance, apiTokenInstance);

        if (response) {
          if (response.typeWebhook === 'stateInstanceChanged') {
            setAuthStatus(response.authState);
          }

          if (
            response.typeWebhook === 'outgoingMessageReceived' &&
            response.typeMessage === 'textMessage' &&
            response.senderPhone === companionPhone
          ) {
            handleAddMessageData({
              idMessage: response.idMessage,
              message: response.textMessage,
              time: getCurrentTime(response.time),
              outer: true,
            });
          }

          if (
            response.typeWebhook === 'incomingMessageReceived' &&
            response.typeMessage === 'textMessage' &&
            response.senderPhone === companionPhone
          ) {
            handleAddMessageData({
              idMessage: response.idMessage,
              message: response.textMessage,
              time: getCurrentTime(response.time),
            });
          }

          await NotificationService.deleteNotification(idInstance, apiTokenInstance, response.receiptId);
        }
      };

      const timer = setInterval(() => fetchNoty(), 5000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [idInstance, apiTokenInstance, setAuthStatus, handleAddMessageData, companionPhone]);

  return (
    <AppLayout>
      {isInstanceFormOpen && <GetInstanceForm />}
      {isQrFormOpen && <GetQrForm />}
      {isChatOpen && <Chat />}
    </AppLayout>
  );
};

export default App;
