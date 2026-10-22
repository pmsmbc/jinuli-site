import 'krds-uiux/resources/cdn/krds.min.css'; // KRDS 는 여기서 1회만 읽는다.
import '@shared/ui/krds/krds-overrides.scss';
import './styles/global.scss';
import { Route, Routes } from 'react-router';
import { HomePage } from '@pages/home';
import { PrivacyIndexPage } from '@pages/privacy-index';
import { PrivacyAppPage } from '@pages/privacy-app';
import { PrivacySitePage } from '@pages/privacy-site';
import { NotFoundPage } from '@pages/not-found';
import { Layout } from './Layout';
import { ScrollToHash } from './ScrollToHash';

export function App() {
  return (
    <Layout>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyIndexPage />} />
        <Route path="/privacy/site" element={<PrivacySitePage />} />
        <Route path="/privacy/:slug" element={<PrivacyAppPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
