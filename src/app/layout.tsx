import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { env } from "@/env";
import ClientSideProviders from "@/providers/client-side";
import { APP_NAME } from "@/consts/app-data";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  keywords: [APP_NAME],
  description: "Collect testimonials and reviews from your amazing customers.",
  openGraph: {
    title: APP_NAME,
    description:
      "Collect testimonials and reviews from your amazing customers.",
    images: [`${env.NEXTAUTH_URL}/logo.png`],
    siteName: APP_NAME,
    locale: "es-ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description:
      "Collect testimonials and reviews from your amazing customers.",
    images: [`${env.NEXTAUTH_URL}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ClientSideProviders>
          {children}
          <Toaster />
        </ClientSideProviders>
      </body>
    </html>
  );
}
