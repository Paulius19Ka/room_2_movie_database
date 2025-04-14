import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { MoviesProvider } from './contexts/MoviesContext.tsx';
import { UsersProvider } from './contexts/UsersContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <MoviesProvider>
    <UsersProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsersProvider>
  </MoviesProvider>
)
