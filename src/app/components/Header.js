import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Header.module.scss'

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.logo}>
      <Link href="/">
        <Image
          className={styles.logoDesktop}
          src="/assets/images/logo-white.svg"
          width={170}
          height={63}
          alt="LOUIS XIII Las Vegas Grand Prix"
        />
        <Image
          className={styles.logoMobile}
          src="/assets/images/logo.svg"
          width={170}
          height={63}
          alt="LOUIS XIII Las Vegas Grand Prix"
        />
      </Link>
    </h1>
  </header>
)

export default Header;
