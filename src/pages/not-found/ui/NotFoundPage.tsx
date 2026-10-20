import { Seo } from '@shared/lib/seo';
import { NotFoundNotice } from '@widgets/not-found-notice';

export function NotFoundPage() {
  return (
    <>
      <Seo title="페이지를 찾을 수 없어요" path="/404.html" noindex />
      <NotFoundNotice />
    </>
  );
}
