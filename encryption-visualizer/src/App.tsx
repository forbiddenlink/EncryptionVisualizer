import { Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { InstallPrompt } from './components/ui/InstallPrompt';
import { OfflineIndicator } from './components/ui/OfflineIndicator';

function App() {
  return (
    <>
      <OfflineIndicator />
      <Layout>
        <Outlet />
      </Layout>
      <InstallPrompt />
    </>
  );
}

export default App;
