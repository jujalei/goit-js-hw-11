import { refs } from './refs';

function trackScroll() {
  const offset = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (offset > coords) {
    refs.goTopBtn.classList.add('go-top-show');
  } else {
    refs.goTopBtn.classList.remove('go-top-show');
  }
}

function goTop() {
  const scrollToTop = () => {
    if (window.pageYOffset > 0) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  scrollToTop();
}

export { trackScroll, goTop };
