import { notFound } from "next/navigation";
import GuidePage from "../../../../GuidePage";
import { findGuide, guides } from "../../../../guides";
import { guideMetadata } from "../../../../seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.en.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = findGuide("en", slug);
  return guide ? guideMetadata("en", guide) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = findGuide("en", slug);
  if (!guide) notFound();
  return <GuidePage language="en" guide={guide} />;
}
