/**
 * KRDS 버튼/링크 래퍼. 검증된 클래스: krds-btn + (xsmall|small|medium|large|xlarge) + (primary|secondary|tertiary|text|link)
 * 출처: node_modules/krds-uiux/html/code/button*.html, link.html (krds-uiux 1.1.0)
 * to → 라우터 Link, href → 외부 <a>, 둘 다 없으면 <button>.
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';

export type KRDSButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type KRDSButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'link';

interface Common {
  size?: KRDSButtonSize;
  variant?: KRDSButtonVariant;
  className?: string;
  children: ReactNode;
}
type AnchorRest = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href' | 'children'>;
type ButtonRest = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export type KRDSButtonProps =
  | (Common & { to: string; href?: never } & AnchorRest)
  | (Common & { href: string; to?: never } & AnchorRest)
  | (Common & { to?: never; href?: never } & ButtonRest);

export function KRDSButton(props: KRDSButtonProps) {
  const { size = 'medium', variant, className, children, ...rest } = props;
  const classNames = ['krds-btn', size, variant, className].filter(Boolean).join(' ');

  if (rest.to !== undefined) {
    const { to, ...anchor } = rest as { to: string } & AnchorRest;
    return <Link to={to} className={classNames} {...anchor}>{children}</Link>;
  }
  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as { href: string } & AnchorRest;
    return <a href={href} className={classNames} {...anchor}>{children}</a>;
  }
  const { type = 'button', ...button } = rest as ButtonRest;
  return <button type={type} className={classNames} {...button}>{children}</button>;
}
