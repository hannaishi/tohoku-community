'use strict';

const header = document.querySelector('.js-header');
const toggle = document.querySelector('.js-menu-toggle');
const navigation = document.querySelector('.js-navigation');
const desktopNavigation = window.matchMedia('(min-width: 64rem)');

if (header && toggle && navigation) {
  const setMenuOpen = (open, restoreFocus = false) => {
    header.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    if (restoreFocus) toggle.focus();
  };

  const updateScrollState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false, !desktopNavigation.matches);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false, true);
    }
  });

  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setMenuOpen(false);
  });

  desktopNavigation.addEventListener('change', () => {
    const focusedElement = document.activeElement;
    setMenuOpen(false);
    if (desktopNavigation.matches && focusedElement === toggle) {
      navigation.querySelector('a').focus();
    } else if (!desktopNavigation.matches && navigation.contains(focusedElement)) {
      toggle.focus();
    }
  });

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
}
