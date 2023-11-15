"use client";

import { useTranslations } from 'next-intl';
import PropTypes from "prop-types";
import styles from '../styles/Society.module.scss';
import TextWithIcon from './TextWithIcon'
import Image from 'next/image'
import Link from 'next/link'

const Society = ({
  id,
  heading,
  desc
}) => {
  const societyTrans = useTranslations('Society');
  
  return (
    <div className={styles.content}>
      {heading && (<h2 className={styles.heading}>{heading}</h2>)}
      {desc && (<p className={styles.description}>{desc}</p>)}
      {id === 'we-chat' ? (
        <>
          <Image
            className={styles.image}
            src="/assets/images/wechat-img.svg"
            width={183}
            height={183}
            alt="WeChat"
            priority={true}
          />
          <div className={styles.link}>
            <span>{societyTrans('or')}</span>
            <Link href='https://link.louisxiii-cognac.com/WeChatLanding' target="_blank">
              {societyTrans('clickHere')}
            </Link>
          </div>
        </>
      ) : (
        <TextWithIcon />
      )}
    </div>
  )
}

Society.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  desc: PropTypes.string
};

export default Society;
