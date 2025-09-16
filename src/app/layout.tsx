import { Metadata } from "next";
import "./main.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Roots Portal",
  description: "Made by a certain genius",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body

      >
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
