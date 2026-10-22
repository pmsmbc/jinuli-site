import { describe, expect, it } from 'vitest';
import { fullTitle, renderHead } from './head';
import { breadcrumbListJsonLd, faqPageJsonLd } from './json-ld';

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
  it('SNS 썸네일(og:image·twitter:card)이 절대 URL 로 들어간다', () => {
    const html = renderHead({ title: 't', path: '/' });
    expect(html).toContain('<meta property="og:image" content="https://jinuli.com/og.png" />');
    expect(html).toContain('<meta property="og:image:width" content="1200" />');
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(html).toContain('<meta property="og:locale" content="ko_KR" />');
  });
  it('noindex 를 켜면 robots 메타가 들어간다', () => {
    expect(renderHead({ title: 't', path: '/x/', noindex: true })).toContain('name="robots" content="noindex"');
  });
  it('구조화 데이터는 객체마다 script 하나이고 @context 가 붙고 < 는 이스케이프된다', () => {
    const html = renderHead({ title: 't', path: '/', jsonLd: [{ '@type': 'Organization', name: 'a</script>' }, { '@type': 'WebSite' }] });
    expect(html.match(/<script type="application\/ld\+json">/g)).toHaveLength(2);
    expect(html).toContain('{"@context":"https://schema.org","@type":"Organization","name":"a\\u003c/script>"}');
  });
});

describe('seo/json-ld', () => {
  it('브레드크럼은 홈을 1번으로 넣고 마지막은 현재 경로를 쓴다', () => {
    const ld = breadcrumbListJsonLd([{ name: '개인정보처리방침', path: '/privacy/' }, { name: '앱' }], '/privacy/app/');
    expect(ld.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://jinuli.com/' },
      { '@type': 'ListItem', position: 2, name: '개인정보처리방침', item: 'https://jinuli.com/privacy/' },
      { '@type': 'ListItem', position: 3, name: '앱', item: 'https://jinuli.com/privacy/app/' },
    ]);
  });
  it('FAQ 는 질문·답을 Question/Answer 로 만든다', () => {
    const ld = faqPageJsonLd([{ question: 'q', answer: 'a' }]);
    expect(ld.mainEntity).toEqual([{ '@type': 'Question', name: 'q', acceptedAnswer: { '@type': 'Answer', text: 'a' } }]);
  });
});
