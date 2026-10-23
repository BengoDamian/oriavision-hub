import Script from "next/script";

const MEASUREMENT_ID = "G-P7CCCZEQGN";

/** Shared by the two independent root layouts; mounted once per document. */
export default function GoogleAnalytics() {
  return (
    <>
      <Script id="oriavision-ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}');
        `}
      </Script>
      <Script
        id="oriavision-ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      {/* GA4 Enhanced Measurement handles history changes. Do not also send
          manual page_view events here: they would duplicate automatic views. */}
    </>
  );
}
