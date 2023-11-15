export default function useScrollLock() {
  const scrollLock = (lock = true) => {
    const html = document.querySelector('html');

    if(lock) {
      const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
      html.style.position = 'fixed';
      html.style.width = '100%';
      html.style.height = '100%';
      html.style.overflow = 'hidden';
      html.style.top = `-${scrollY}`;
    } else {
      const scrollY = html.style.top;
      html.style.position = '';
      html.style.top = '';
      html.style.height = '';
      html.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });
  };

  return [
    scrollLock
  ];
}
