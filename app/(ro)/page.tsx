import HomePage from "../HomePage";
import JsonLd from "../JsonLd";
import { homeMetadata, homeSchema } from "../seo";

export const metadata = homeMetadata("ro");

export default function Page() {
  return (
    <>
      <JsonLd data={homeSchema("ro")} />
      <HomePage language="ro" />
    </>
  );
}
