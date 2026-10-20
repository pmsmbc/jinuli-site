import { useEffect } from 'react';
import { fullTitle, useHeadStore, type HeadData } from './head';

/** 페이지 컴포넌트 맨 위에 한 번 둔다. 렌더 결과는 없다. */
export function Seo(props: HeadData) {
  const store = useHeadStore();
  // 서버 렌더(renderToString)는 동기 1회 렌더라 렌더 중에 기록해도 안전하다. 브라우저에서는 store 가 없다.
  store?.set(props);
  useEffect(() => {
    document.title = fullTitle(props.title);
  }, [props.title]);
  return null;
}
