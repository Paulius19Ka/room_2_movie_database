import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { MoviesProvider } from './contexts/MoviesContext.tsx';
import { UsersProvider } from "./contexts/UsersContext";

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <UsersProvider>
    <MoviesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoviesProvider>
  </UsersProvider>
)
