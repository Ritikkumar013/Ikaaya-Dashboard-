
"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function LayoutContent({
  children,
  geistSans,
  geistMono,
}: {
  children: React.ReactNode;
  geistSans: { variable: string };
  geistMono: { variable: string };
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {isMobile ? (
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
        <>
          {children}
          <Toaster richColors />
        </>
      )}
    </body>
  );
}