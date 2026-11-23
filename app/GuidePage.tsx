/* eslint-disable @next/next/no-img-element -- local WebP files are pre-sized and pre-compressed for static cPanel hosting */

import { content, type Language } from "./content";
import { counterpartPath, guidePath, guides, type Guide } from "./guides";
import JsonLd from "./JsonLd";
import MobileBar from "./MobileBar";
import { guideSchema } from "./seo";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { assetPath, homeHref, photo } from "./site";

export default function GuidePage({ language, guide }: { language: Language; guide: Guide }) {
  const t = content[language];
  const home = homeHref(language);
  const others = guides[language].filter((item) => item.key !== guide.key);

  return (
    <main>
      <JsonLd data={guideSchema(language, guide)} />
      <a className="skip-link" href="#ghid">{t.skip}</a>
      <SiteHeader language={language} onHome={false} altHref={assetPath(counterpartPath(language, guide.key))} />

      <article className="guide" id="ghid">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href={home}>{t.breadcrumbHome}</a>
          <span aria-hidden="true">/</span>
          <a href={`${home}#imprejurimi`}>{t.breadcrumbGuides}</a>
        </nav>

        <header className="guide-head">
          <h1>{guide.title}</h1>
          <p className="guide-lead">{guide.lead}</p>
        </header>

        <figure className="guide-photo">
          <img
            {...photo(guide.image)}
            sizes="(max-width: 1240px) calc(100vw - 32px), 1240px"
            alt={guide.imageAlt}
            width="1600"
            height="1000"
            fetchPriority="high"
          />
        </figure>

        <div className="guide-layout">
          <div className="guide-body">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </div>

          <aside className="guide-aside">
            <div className="guide-facts">
              <h2>{t.atGlance}</h2>
              <dl>
                {guide.facts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="guide-cta">
              <h2>{t.guideCtaTitle}</h2>
              <p>{t.guideCtaText}</p>
              <a className="btn btn-light" href={`${home}#rezervare`}>{t.guideCtaButton}</a>
            </div>
          </aside>
        </div>

        <nav className="guide-more" aria-label={t.otherGuides}>
          <h2>{t.otherGuides}</h2>
          <div className="guide-cards">
            {others.map((item) => (
              <a className="guide-card" key={item.key} href={assetPath(guidePath(language, item.slug))}>
                <img
                  {...photo(item.image)}
                  sizes="(max-width: 640px) 84vw, (max-width: 920px) 50vw, 600px"
                  alt=""
                  width="1600"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                />
                <span className="guide-card-copy">
                  <strong>{item.title}</strong>
                  <span>{item.card}</span>
                  <span className="guide-card-link">{t.nearby.readGuide}</span>
                </span>
              </a>
            ))}
          </div>
        </nav>
      </article>

      <SiteFooter language={language} t={t} />
      <MobileBar language={language} bookHref={`${home}#rezervare`} />
    </main>
  );
}
