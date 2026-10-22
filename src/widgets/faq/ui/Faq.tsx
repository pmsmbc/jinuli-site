/** 자주 묻는 질문 목록. 데이터는 entities/faq, 모양은 KRDS 아코디언. */
import { FAQ } from '@entities/faq';
import { KRDSAccordion, KRDSButton } from '@shared/ui/krds';
import './Faq.scss';

export function Faq() {
  return (
    <KRDSAccordion
      idPrefix="faq"
      items={FAQ.map((f) => ({
        title: f.question,
        content: (
          <>
            <p className="faq-answer">{f.answer}</p>
            {f.link && (
              <p className="faq-link">
                <KRDSButton to={f.link.to} variant="text" size="medium">
                  {f.link.label} <i className="svg-icon ico-angle right" aria-hidden="true"></i>
                </KRDSButton>
              </p>
            )}
          </>
        ),
      }))}
    />
  );
}
