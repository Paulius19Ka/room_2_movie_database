import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
