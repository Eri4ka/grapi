import { useContext, useEffect } from 'react';

import { NotificationService } from '@/api/services/NotificationService';
import { AuthContext } from '@/components/AuthManager';
import Chat from '@/components/Chat';
import GetInstanceForm from '@/components/GetInstanceForm';
import GetQrForm from '@/components/GetQrForm';
import { MessageContext } from '@/components/MessageManager';
import { POLLING_NOTY_TIMEOUT } from '@/constants/index';
import { getCurrentTime } from '@/helpers/message';
import AppLayout from '@/ui/AppLayout';

const App = () => {
  // Vars
  const { authStatus, setAuthStatus, idInstance, apiTokenInstance } = useContext(AuthContext);
  const { companionPhone, handleAddMessageData } = useContext(MessageContext);

  const isQrFormOpen = authStatus === 'notAuthorized' || authStatus === 'starting';
  const isChatOpen = authStatus === 'authorized';
  const isInstanceFormOpen = !isQrFormOpen && !isChatOpen;

  // Effects
  useEffect(() => {
    const isInstanceExists = idInstance && apiTokenInstance;

    if (isInstanceExists) {
      const fetchNotifications = async () => {
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

      const timer = setInterval(() => fetchNotifications(), POLLING_NOTY_TIMEOUT);

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
