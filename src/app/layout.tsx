import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import ClientSideProviders from "@/providers/client-side";

export const metadata: Metadata = {
  title: "Testimonialsify",
  description: "Collect testimonials and reviews from your amazing customers.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
