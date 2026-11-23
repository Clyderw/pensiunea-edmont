import RootShell from "../RootShell";

export { viewport } from "../RootShell";

export default function RomanianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell language="ro">{children}</RootShell>;
}
