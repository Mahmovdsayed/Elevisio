"use client";

import { useEffect } from "react";

export const usePreventZoom = () => {
  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const inputs = document.querySelectorAll("input, textarea, select");

      const handleFocus = () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute(
            "content",
            "width=device-width, initial-scale=1, maximum-scale=1"
          );
        }
      };

      inputs.forEach((input) => {
        input.addEventListener("focus", handleFocus);
      });

      return () => {
        inputs.forEach((input) => {
          input.removeEventListener("focus", handleFocus);
        });
      };
    }
  }, []);
};
