"use client";

import { useEffect, useRef } from "react";

interface IframeWidgetProps {
  host: string;
}

export function IframeWidget({ host }: IframeWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const iframe = document.createElement("iframe");
      iframe.src = `${host}/embed`;
      iframe.style.position = "fixed";
      iframe.style.bottom = "0";
      iframe.style.right = "0";
      iframe.style.width = "350px";
      iframe.style.height = "500px";
      iframe.style.border = "none";
      iframe.style.zIndex = "9999";
      iframe.allow = "microphone";
      
      containerRef.current.appendChild(iframe);
    }
    
    // Cleanup function to remove the iframe when component unmounts
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [host]);

  return <div ref={containerRef}></div>;
} 