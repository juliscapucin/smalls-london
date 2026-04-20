"use client";

import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    updateWidth();

    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width !== null && width <= 1024;
  const isDesktop = width !== null && width > 1024;

  return { isMobile, isDesktop };
};
