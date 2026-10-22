import type { ReactNode } from 'react';
import { KRDSSkipLink } from '@shared/ui/krds';
import { SiteHeader } from '@widgets/site-header';
import { SiteFooter } from '@widgets/site-footer';
import { MobileCta } from '@widgets/mobile-cta';

/** KRDS 페이지 뼈대: #wrap > 건너뛰기 링크 + #krds-header + #container > main#main + #krds-footer (+ 모바일 고정 문의 버튼) */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="wrap">
      <KRDSSkipLink target="#main" />
      <SiteHeader />
      <div id="container">
        <main id="main" tabIndex={-1}>{children}</main>
      </div>
      <SiteFooter />
      <MobileCta />
    </div>
  );
}
