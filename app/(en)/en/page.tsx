import HomePage from "../../HomePage";
import JsonLd from "../../JsonLd";
import { homeMetadata, homeSchema } from "../../seo";

export const metadata = homeMetadata("en");

export default function Page() {
  return (
    <>
      <JsonLd data={homeSchema("en")} />
      <HomePage language="en" />
    </>
  );
}
