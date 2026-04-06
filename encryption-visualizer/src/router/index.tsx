import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { AESPage } from '@/pages/AESPage';
import { RSAPage } from '@/pages/RSAPage';
import { BlockModesPage } from '@/pages/BlockModesPage';
import { DiffieHellmanPage } from '@/pages/DiffieHellmanPage';
import { HashingPage } from '@/pages/HashingPage';
import { SignaturesPage } from '@/pages/SignaturesPage';
import { ComparePage } from '@/pages/ComparePage';
import { GlossaryPage } from '@/pages/GlossaryPage';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.AES.slice(1), element: <AESPage /> },
      { path: ROUTES.RSA.slice(1), element: <RSAPage /> },
      { path: ROUTES.BLOCK_MODES.slice(1), element: <BlockModesPage /> },
      { path: ROUTES.DIFFIE_HELLMAN.slice(1), element: <DiffieHellmanPage /> },
      { path: ROUTES.HASHING.slice(1), element: <HashingPage /> },
      { path: ROUTES.SIGNATURES.slice(1), element: <SignaturesPage /> },
      { path: ROUTES.COMPARE.slice(1), element: <ComparePage /> },
      { path: ROUTES.GLOSSARY.slice(1), element: <GlossaryPage /> },
      { path: ROUTES.ABOUT.slice(1), element: <AboutPage /> },
    ],
  },
]);
