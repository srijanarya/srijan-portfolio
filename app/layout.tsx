import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

/**
 * Two-font system — restrained on purpose.
 *  - Geist Mono = body, labels, eval-tool functional UI
 *  - Instrument Serif italic = quote-pulls, decision-page subtitles
 *
 * No Inter. No Geist Sans. No Roboto. The eval-tool aesthetic uses mono
 * because that's what Anthropic / Patronus / Braintrust use in their own
 * tools — using it here visually performs "I ship eval-rigorous AI systems"
 * before the reader processes a single word.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://srijan-portfolio.vercel.app"),
  title: {
    default: "Srijan Arya — AI Run #001",
    template: "%s · Srijan Arya",
  },
  description:
    "AI-Native Senior Engineer. Designs production AI systems, dispatches AI for implementation, owns eval rigor end-to-end. 400K+ LOC live, 99.7% classifier accuracy, top 5% of 286,757 in WorldQuant BRAIN IQC 2026.",
  authors: [{ name: "Srijan Arya" }],
  openGraph: {
    title: "Srijan Arya — AI Run #001",
    description:
      "AI-Native Senior Engineer. The portfolio is rendered as an eval dashboard. The AI being evaluated is me.",
    type: "website",
    siteName: "Srijan Arya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Srijan Arya — AI Run #001",
    description:
      "AI-Native Senior Engineer. The portfolio is rendered as an eval dashboard.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="bg-noise bg-grid min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
