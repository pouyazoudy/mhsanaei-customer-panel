import "./globals.css";

export const metadata = {
  title: "Customer Panel",
  description: "A user-friendly panel to view your VPN subscription's remaining time and volume, and manage your account with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
