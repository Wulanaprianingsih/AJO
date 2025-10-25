"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Spin } from "antd";

export default function GlobalLoading({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      setLoading(true);
      const timer = setTimeout(() => {
        setCurrentPath(pathname);
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, currentPath]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <Spin size="large" />
        </div>
      )}
      {children}
    </>
  );
}
