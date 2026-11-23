import RootShell from "../../RootShell";

export { viewport } from "../../RootShell";

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell language="en">{children}</RootShell>;
}
