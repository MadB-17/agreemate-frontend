import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgreeMate",
  description: "AI-generated image detector",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
