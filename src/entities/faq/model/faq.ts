/** 자주 묻는 질문. 답은 서비스 소개(entities/service)와 방침(entities/privacy-policy)에 있는 사실만 쓴다. 바뀌면 여기만 고친다. */
export interface FaqItem {
  question: string;
  /** 본문. 구조화 데이터(FAQPage)에도 이 글자 그대로 들어간다. */
  answer: string;
  /** 답 아래에 붙는 링크. 사이트 안 경로(to) 또는 바깥 주소(href). */
  link?: { label: string; to: string } | { label: string; href: string };
}

export const FAQ: FaqItem[] = [
  {
    question: '지누리컴퍼니는 무엇을 하는 회사인가요?',
    answer:
      '회원 가입 없이 바로 쓰는 앱과 웹 서비스를 직접 만들고 운영하는 작은 회사입니다. 여행 정보 사이트 "지금 여기는", 운세 사이트 "사또", 라이브캠 사이트 "On Live Tube"를 운영하고, 어린이 학습 앱 "대한 어린이 한자"를 준비하고 있습니다.',
    link: { label: '만드는 서비스 보기', to: '/#services' },
  },
  {
    question: '"지금 여기는"은 어떤 서비스인가요?',
    answer:
      '처음 가는 도시에서 어디에 묵고 무엇을 먹을지 한곳에서 보는 여행 정보 사이트입니다. 공식 안내와 공개된 후기를 바탕으로 정리한 글이며 직접 방문한 후기가 아니라는 점을 글마다 밝힙니다. 한국어·영어·일본어로 읽을 수 있습니다.',
    link: { label: 'nowyeogi.com 열기', href: 'https://nowyeogi.com/' },
  },
  {
    question: '"대한 어린이 한자" 앱은 언제 나오나요?',
    answer:
      '출시 준비 중입니다. 대한검정회 한자급수자격검정 8급부터 준5급까지 다루는 비공식 학습 앱으로, 안드로이드와 iOS 스토어에 올라가면 이 사이트의 "만드는 서비스" 절에 설치 링크를 넣고 안내합니다. 광고와 회원 가입이 없고 인터넷 없이 동작합니다.',
    link: { label: '대한 어린이 한자 개인정보처리방침', to: '/privacy/daehan-kids-hanja/' },
  },
  {
    question: '광고나 회원 가입이 있나요? 개인정보는 어떻게 되나요?',
    answer:
      '네 서비스 모두 회원 가입이 없습니다. 웹 서비스(지금 여기는, 사또, On Live Tube)는 구글 애드센스 광고로 운영하며, 방문 통계 외에 방문자가 입력하는 개인정보를 받지 않습니다. 대한 어린이 한자 앱은 광고도 없고 개인정보를 수집하지 않으며, 유료 기능은 스토어 결제로 한 번만 삽니다. 자세한 내용은 서비스별 개인정보처리방침에 있습니다.',
    link: { label: '개인정보처리방침 목록', to: '/privacy/' },
  },
  {
    question: '어디로 문의하나요?',
    answer:
      '회사, 앱, 개인정보에 관한 문의는 admin@jinuli.com 으로 보내 주세요. 영업일 기준 3일 안에 답장합니다. 각 웹 서비스의 글 정정이나 제보는 그 서비스 사이트의 연락처 페이지로도 보낼 수 있습니다.',
    link: { label: '문의하기', to: '/#contact' },
  },
];
