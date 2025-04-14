import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { MoviesProvider } from './contexts/MoviesContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <MoviesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MoviesProvider>
)
