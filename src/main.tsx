import React from 'react';
import ReactDOM from 'react-dom/client';

import 'react-tooltip/dist/react-tooltip.css';

import '@/styles/index.scss';

import AuthManager from '@/components/AuthManager';
import MessageManager from '@/components/MessageManager';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthManager>
      <MessageManager>
        <App />
      </MessageManager>
    </AuthManager>
  </React.StrictMode>,
);
