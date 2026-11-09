import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigation does not target an in-page hash anchor (e.g. /#about, /#fleet),
    // immediately reset the viewport scroll position to the top of the page
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;

