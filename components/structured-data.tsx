// components/structured-data.jsx
import Script from "next/script";

export const StructuredData = ({ data }: { data: Object }) => (
  // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
  <Script
    id="structured-data"
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    strategy="beforeInteractive"
  />
);
