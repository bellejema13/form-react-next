'use client';

import { useState, useEffect } from 'react';
import { useParams, redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useDebounce from '@/app/hooks/useDebounce';
import styles from '@/app/styles/Confirmation.module.scss'
import Header from '@/app/components/Header'
import TextWithIcon from '@/app/components/TextWithIcon'
import Button from '@/app/components/Button';

export default function Home() {
  const params = useParams();
  const t = useTranslations('Confirmation');
  const [active, setActive] = useState(false);
  const [user, setUser] = useState({
    first_name: '',
    last_name: ''
  });
  
  const debounce = useDebounce(active, 15000);
  
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('user_details'));
    item && setUser(item);
    setActive(true);
  }, [])
  
  useEffect(() => {
    if(debounce) {
      localStorage.removeItem('user_details');
      redirect('/');
    }
  }, [debounce])

  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <div className={styles.backgroundWrap}>
          <div className={styles.background} style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKGROUND_IMAGE_URL}')`}}></div>
          <Header />
        </div>
        <div className={styles.contentRight}>
          <div className={styles.content}>
            <h2 className={`${styles.heading} ${params.locale === 'fr' ? styles.headingFR : ''}`}>{t('heading')}</h2>
            <p className={`${styles.description} ${params.locale === 'fr' ? styles.descriptionFR : ''}`}>
              {t('description', {
                first_name: ` ${user.first_name}`,
                last_name: ` ${user.last_name}`
              })}
            </p>
            <TextWithIcon />
            <Button 
              className={styles.button}
              label={t('returnButton')}
              isLink={true}
              href='/'
            />
          </div>
        </div>
      </div>
    </main>
  )
}
