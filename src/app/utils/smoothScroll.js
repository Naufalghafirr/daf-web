import { animate } from "framer-motion";

export const smoothScroll = (id, offset = 80) => {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

  animate(window.scrollY, y, {
    duration: 0.7,
    ease: "easeInOut",
    onUpdate: (val) => window.scrollTo(0, val),
  });
};
