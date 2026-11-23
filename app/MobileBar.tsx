"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "./booking";
import { contact, content, type Language } from "./content";
import { ChatIcon, PhoneIcon } from "./icons";

// Call, WhatsApp and Book, pinned to the bottom of the screen on phones once the guest scrolls.
export default function MobileBar({ language, bookHref }: { language: Language; bookHref: string }) {
  const t = content[language];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setVisible(window.scrollY > 520);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={visible ? "mobile-bar is-visible" : "mobile-bar"} aria-label={t.mobileBar.label} aria-hidden={!visible}>
      <a href={`tel:${contact.phoneValue}`} tabIndex={visible ? 0 : -1}>
        <PhoneIcon /> {t.mobileBar.call}
      </a>
      <a href={whatsappLink()} target="_blank" rel="noreferrer" tabIndex={visible ? 0 : -1}>
        <ChatIcon /> {t.mobileBar.whatsapp}
      </a>
      <a className="mobile-book" href={bookHref} tabIndex={visible ? 0 : -1}>
        {t.mobileBar.book}
      </a>
    </nav>
  );
}
