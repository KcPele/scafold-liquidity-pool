"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { CONTEXT_Provider } from "~~/context";
import "~~/styles/globals.css";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

const title = "Scaffold-ETH 2 App";
const titleTemplate = "%s | Scaffold-ETH 2";
const description = "Built with 🏗 Scaffold-ETH 2";

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
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>
            <CONTEXT_Provider>
              {children}
              <Toaster />
            </CONTEXT_Provider>
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
        <script src="js/jquery-3.3.1.js"></script>
        <script src="js/js-plugins/leaflet.js"></script>
        <script src="js/js-plugins/MarkerClusterGroup.js"></script>
        <script src="js/js-plugins/crum-mega-menu.js"></script>
        <script src="js/js-plugins/waypoints.js"></script>
        <script src="js/js-plugins/jquery-circle-progress.js"></script>
        <script src="js/js-plugins/segment.js"></script>
        <script src="js/js-plugins/bootstrap.js"></script>
        <script src="js/js-plugins/imagesLoaded.js"></script>
        <script src="js/js-plugins/jquery.matchHeight.js"></script>
        <script src="js/js-plugins/jquery-countTo.js"></script>
        <script src="js/js-plugins/Headroom.js"></script>
        <script src="js/js-plugins/jquery.magnific-popup.js"></script>
        <script src="js/js-plugins/popper.min.js"></script>
        <script src="js/js-plugins/particles.js"></script>
        <script src="js/js-plugins/perfect-scrollbar.js"></script>
        <script src="js/js-plugins/jquery.datetimepicker.full.js"></script>
        <script src="js/js-plugins/svgxuse.js"></script>
        <script src="js/js-plugins/select2.js"></script>
        <script src="js/js-plugins/smooth-scroll.js"></script>
        <script src="js/js-plugins/sharer.js"></script>
        <script src="js/js-plugins/isotope.pkgd.min.js"></script>
        <script src="js/js-plugins/ajax-pagination.js"></script>
        <script src="js/js-plugins/swiper.min.js"></script>
        <script src="js/js-plugins/material.min.js"></script>
        <script src="js/js-plugins/orbitlist.js"></script>
        <script src="js/js-plugins/highstock.js"></script>
        <script src="js/js-plugins/bootstrap-datepicker.js"></script>
        <script src="js/js-plugins/TimeCircles.js"></script>
        <script src="js/js-plugins/ion.rangeSlider.js"></script>
        <script defer src="fonts/fontawesome-all.js"></script>
        <script src="js/main.js"></script>
        <script src="js/svg-loader.js"></script>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
