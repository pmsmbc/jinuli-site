import { describe, expect, it } from 'vitest';
import { fullTitle, renderHead } from './head';

describe('seo/head', () => {
  it('사이트 이름을 제목 뒤에 붙이고, 첫 페이지는 그대로 둔다', () => {
    expect(fullTitle('지누리컴퍼니')).toBe('지누리컴퍼니');
    expect(fullTitle('개인정보처리방침')).toBe('개인정보처리방침 — 지누리컴퍼니');
  });
  it('canonical 은 사이트 URL + 경로이고, 특수문자는 이스케이프한다', () => {
    const html = renderHead({ title: 'A & B', path: '/privacy/', description: '<x>' });
    expect(html).toContain('<link rel="canonical" href="https://jinuli.com/privacy/" />');
    expect(html).toContain('<title>A &amp; B — 지누리컴퍼니</title>');
    expect(html).toContain('content="&lt;x&gt;"');
    expect(html).not.toContain('noindex');
  });
  it('noindex 를 켜면 robots 메타가 들어간다', () => {
    expect(renderHead({ title: 't', path: '/x/', noindex: true })).toContain('name="robots" content="noindex"');
  });
});
