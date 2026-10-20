import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** 경로가 바뀌면 맨 위로, 해시가 있으면 그 요소로 이동한다. */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
