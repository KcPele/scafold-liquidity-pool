"use client";

import Script from "next/script";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { CONTEXT_Provider } from "~~/context";
import "~~/styles/globals.css";

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : `http://localhost:${process.env.PORT || 3000}`;
// const imageUrl = `${baseUrl}/thumbnail.jpg`;

// const title = "Scaffold-ETH 2 App";
// const titleTemplate = "%s | Scaffold-ETH 2";
// const description = "Built with 🏗 Scaffold-ETH 2";

// export const metadata: Metadata = {
//   metadataBase: new URL(baseUrl),
//   title: {
//     default: title,
//     template: titleTemplate,
//   },
//   description,
//   openGraph: {
//     title: {
//       default: title,
//       template: titleTemplate,
//     },
//     description,
//     images: [
//       {
//         url: imageUrl,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     images: [imageUrl],
//     title: {
//       default: title,
//       template: titleTemplate,
//     },
//     description,
//   },
//   icons: {
//     icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
//   },
// };

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <Script src="/js/jquery-3.3.1.js"></Script>
        <Script src="/js/js-plugins/leaflet.js"></Script>
        <Script src="/js/js-plugins/MarkerClusterGroup.js"></Script>
        <Script src="/js/js-plugins/crum-mega-menu.js"></Script>
        <Script src="/js/js-plugins/waypoints.js"></Script>
        <Script src="/js/js-plugins/jquery-circle-progress.js"></Script>
        <Script src="/js/js-plugins/segment.js"></Script>
        <Script src="/js/js-plugins/bootstrap.js"></Script>
        <Script src="/js/js-plugins/imagesLoaded.js"></Script>
        <Script src="/js/js-plugins/jquery.matchHeight.js"></Script>
        <Script src="/js/js-plugins/jquery-countTo.js"></Script>
        <Script src="/js/js-plugins/Headroom.js"></Script>
        <Script src="/js/js-plugins/jquery.magnific-popup.js"></Script>
        <Script src="/js/js-plugins/popper.min.js"></Script>
        <Script src="/js/js-plugins/particles.js"></Script>
        <Script src="/js/js-plugins/perfect-scrollbar.js"></Script>
        <Script src="/js/js-plugins/jquery.datetimepicker.full.js"></Script>
        <Script src="/js/js-plugins/svgxuse.js"></Script>
        <Script src="/js/js-plugins/select2.js"></Script>
        <Script src="/js/js-plugins/smooth-scroll.js"></Script>
        <Script src="/js/js-plugins/sharer.js"></Script>
        <Script src="/js/js-plugins/isotope.pkgd.min.js"></Script>
        <Script src="/js/js-plugins/ajax-pagination.js"></Script>
        <Script src="/js/js-plugins/swiper.min.js"></Script>
        <Script src="/js/js-plugins/material.min.js"></Script>
        <Script src="/js/js-plugins/orbitlist.js"></Script>
        <Script src="/js/js-plugins/highstock.js"></Script>
        <Script src="/js/js-plugins/bootstrap-datepicker.js"></Script>
        <Script src="/js/js-plugins/TimeCircles.js"></Script>
        <Script src="/js/js-plugins/ion.rangeSlider.js"></Script>
        <Script defer src="fonts/fontawesome-all.js"></Script>
        <Script src="/js/main.js"></Script>
        <Script src="/js/svg-loader.js"></Script>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>
            <CONTEXT_Provider>
              {children}
              <Toaster />
            </CONTEXT_Provider>
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
