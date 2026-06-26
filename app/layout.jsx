import "./globals.css";

export const metadata = {
  title: "terra",
  description: "Welcome to terra — specialty coffee in Cairo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full bg-background text-text">{children}</body>
    </html>
  );
}
