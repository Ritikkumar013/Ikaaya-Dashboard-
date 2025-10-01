// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Ikaaya Realty ",
//   description: "Admin Panel for Ikaaya Realty",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
        
//         {children}
//         <Toaster richColors />
        
//       </body>
//     </html>
//   );
// }

"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ikaaya Realty",
  description: "Admin Panel for Ikaaya Realty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024); // block if screen < 1024px (Tailwind "lg")
    };

    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isMobile ? (
          // 📵 Show this if on mobile or small screen
          <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-md">
              <h1 className="text-2xl font-bold mb-3">📵 Desktop Only</h1>
              <p className="text-gray-600">
                This admin dashboard is not available on mobile devices. <br />
                Please open it on a desktop or laptop.
              </p>
            </div>
          </div>
        ) : (
          // ✅ Normal content when screen size is OK
          <>
            {children}
            <Toaster richColors />
          </>
        )}
      </body>
    </html>
  );
}
