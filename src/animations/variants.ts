import { Variants } from 'framer-motion';

export const pageFadeVariant: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } },
};

export const drawerSlideVariant: Variants = {
  closed: { x: '100%', opacity: 0.8 },
  open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: '100%', opacity: 0.8, transition: { duration: 0.2, ease: 'easeInOut' } },
};

export const bottomSheetVariant: Variants = {
  closed: { y: '100%', opacity: 0 },
  open: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 350, damping: 32 } },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.25, ease: 'easeInOut' } },
};

export const modalScaleVariant: Variants = {
  closed: { opacity: 0, scale: 0.95, y: 10 },
  open: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', duration: 0.3, bounce: 0.15 } },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
};

export const containerStaggerVariant: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const itemFadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};
