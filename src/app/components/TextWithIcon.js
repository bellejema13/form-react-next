"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image'
import styles from '../styles/TextWithIcon.module.scss';

const TextWithIcon = () => {
  const t = useTranslations('TextWithIcons');
  const list = [
    {
      "text": t('text1'),
      "icon": "/assets/images/society-icon1.svg"
    },
    {
      "text": t('text2'),
      "icon": "/assets/images/society-icon2.svg"
    },
    {
      "text": t('text3'),
      "icon": "/assets/images/society-icon3.svg"
    }
  ]

  return (
    <>
      {list && (
        <ul className={styles.list}>
          {list.map((item, key) => (
          <li className={styles.item} key={key}>
            {item.icon && (<Image
              className={styles.icon} 
              src={item.icon}
              width={97}
              height={97}
              alt={`${item.text} image`}
              priority={true}
            />)}
            <p>{item.text}</p>
          </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default TextWithIcon;
