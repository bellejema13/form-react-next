'use client';

import React, { useState } from 'react'; 
import Link from 'next/link'
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import styles from '@/app/styles/page.module.scss'
import Header from '@/app/components/Header'
import Form from '@/app/components/Form'
import Popup from '@/app/components/Popup'
import Society from '@/app/components/Society'
import PrivacyPolicy from '@/app/components/PrivacyPolicy';
import PrivacyPolicyFR from '@/app/components/PrivacyPolicyFR';

export default function Home() {
  const [active, setActive] = useState(false);
  const [popupId, setpopupId] = useState('');

  const t = useTranslations('Page');
  const societyTrans = useTranslations('Society');
  
  const params = useParams();

  const handlePopup = (value, id) => {
    setActive(value);
    setpopupId(id);
  }

  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <div className={styles.backgroundWrap}>
          <div className={styles.background} style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKGROUND_IMAGE_URL}')`}}></div>
          <Header />
        </div>
        <div className={styles.contentRight}>
          <div className={styles.content}>
            <div className={styles.contentTop}>
            <h2 className={`${styles.heading} ${params.locale === 'fr' ? styles.headingFR : ''}`}>{t('heading.text')} <Link href="#" id={'society'} onClick={e => { e.preventDefault(); handlePopup(true) }}>{t('heading.subtext')}</Link></h2>
              <ul className={styles.langSelector}>
                <li className={`${styles.selector} ${params.locale === 'en' ? styles.selectorActive : ''}`}><Link href="/en/las-vegas/pop-up/wynn">EN</Link></li>
                <li className={`${styles.selector} ${params.locale === 'fr' ? styles.selectorActive : ''}`}><Link href="/fr/las-vegas/pop-up/wynn">FR</Link></li>
              </ul>
            </div>
            <Form popupCallback={(val, el) => handlePopup(val, el)} />
          </div>
        </div>
      </div>
      {active && (
        <Popup
          isOpen={active}
          callback={val => handlePopup(val)}
          popupId={popupId}
          innerClass={popupId === 'privacy' ? styles.innerPrivacy : ''}
        > 
          {popupId === 'privacy' ? (
            params.locale === 'fr' ? <PrivacyPolicyFR /> : <PrivacyPolicy />
          ) : popupId === 'country' ? (
            <Society 
              id='we-chat'
              heading={societyTrans('heading')}
              desc={societyTrans('wechat.description')}
            />
          ) : (
            <Society 
              heading={societyTrans('heading')}
              desc={societyTrans('description')}
            />
          )}
        </Popup>
      )}
    </main>
  )
}
