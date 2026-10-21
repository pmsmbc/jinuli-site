/**
 * 사이트 헤더. 구조는 node_modules/krds-uiux/html/code/header.html (1.1.0) 을 따른다:
 * header#krds-header > .header-in > .header-container > .inner > .header-branding(.logo, .header-actions)
 * 로고는 KRDS 기본 방식(.logo a 의 배경 이미지 + sr-only 글자). 이미지는 public/logo.svg, 교체 CSS 는 SiteHeader.scss.
 * + nav.krds-main-menu(데스크톱) + #mobile-nav.krds-main-menu-mobile(모바일, .is-open 으로 연다)
 * 유틸리티 메뉴·검색·로그인은 이 사이트에 없어 넣지 않는다.
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { COMPANY } from '@entities/company';
import './SiteHeader.scss';

const MENU = [
  { to: '/#apps', label: '만드는 앱' },
  { to: '/privacy/', label: '개인정보처리방침' },
  { to: '/#contact', label: '문의' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { pathname } = useLocation();
  // 해시 링크(/#apps 등)는 경로가 같아도 '현재 메뉴'가 아니다. /privacy 아래에서만 방침 메뉴를 현재로 표시한다.
  const isActive = (to: string) => !to.includes('#') && pathname.startsWith(to.replace(/\/$/, ''));

  return (
    <header id="krds-header">
      <div className="header-in">
        <div className="header-container">
          <div className="inner">
            <div className="header-branding">
              <h1 className="logo">
                <Link to="/">
                  <span className="sr-only">{COMPANY.name}</span>
                </Link>
              </h1>
              <div className="header-actions">
                <button
                  type="button"
                  className="btn-navi all"
                  aria-controls="mobile-nav"
                  aria-expanded={open}
                  onClick={() => setOpen(true)}
                >
                  전체메뉴
                </button>
              </div>
            </div>
          </div>
        </div>

        <nav className="krds-main-menu" aria-label="주요 메뉴">
          <div className="inner">
            <ul className="gnb-menu">
              {MENU.map((m) => (
                <li key={m.to}>
                  <Link
                    to={m.to}
                    className={`gnb-main-trigger is-link${isActive(m.to) ? ' active' : ''}`}
                    aria-current={isActive(m.to) ? 'page' : undefined}
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div id="mobile-nav" className={`krds-main-menu-mobile${open ? ' is-open is-backdrop' : ''}`} aria-hidden={!open}>
        <div className="gnb-wrap">
          <div className="gnb-body">
            <div className="gnb-menu">
              <div className="menu-wrap">
                <ul>
                  {MENU.map((m) => (
                    <li key={m.to}>
                      <Link to={m.to} className="gnb-main-trigger" tabIndex={open ? 0 : -1} onClick={close}>{m.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <button type="button" className="krds-btn medium icon" id="close-nav" onClick={close} tabIndex={open ? 0 : -1}>
            <span className="sr-only">전체메뉴 닫기</span>
            <i className="svg-icon ico-popup-close" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
