import type { PrivacyPolicy } from './types';
import { DAEHAN_KIDS_HANJA_POLICY } from './daehan-kids-hanja';

export const PRIVACY_POLICIES: PrivacyPolicy[] = [DAEHAN_KIDS_HANJA_POLICY];

export const findPolicy = (appSlug: string): PrivacyPolicy | undefined =>
  PRIVACY_POLICIES.find((p) => p.appSlug === appSlug);

/** 본문 안의 (https://...) 를 링크로 바꾸기 위해 문장을 조각낸다. */
export function splitLinks(text: string): Array<{ type: 'text'; value: string } | { type: 'link'; value: string }> {
  const out: Array<{ type: 'text'; value: string } | { type: 'link'; value: string }> = [];
  const re = /https?:\/\/[^\s)]+/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push({ type: 'text', value: text.slice(last, m.index) });
    out.push({ type: 'link', value: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ type: 'text', value: text.slice(last) });
  return out;
}
