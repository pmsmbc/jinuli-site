import type { ReactNode } from 'react';
import { KRDSSkipLink } from '@shared/ui/krds';
import { SiteHeader } from '@widgets/site-header';
import { SiteFooter } from '@widgets/site-footer';

/** KRDS 페이지 뼈대: #wrap > 건너뛰기 링크 + #krds-header + #container > main#main + #krds-footer */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="wrap">
      <KRDSSkipLink target="#main" />
      <SiteHeader />
      <div id="container">
        <main id="main" tabIndex={-1}>{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
