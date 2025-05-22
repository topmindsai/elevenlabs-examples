import { NextResponse } from "next/server";

export async function GET() {
  const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
  
  const scriptContent = `
    (function() {
      // Create iframe element
      const iframe = document.createElement('iframe');
      iframe.src = '${host}/embed';
      iframe.style.position = 'fixed';
      iframe.style.bottom = '0';
      iframe.style.right = '0';
      iframe.style.width = '350px';
      iframe.style.height = '500px';
      iframe.style.border = 'none';
      iframe.style.zIndex = '9999';
      iframe.allow = 'microphone';
      iframe.style.display = 'block';
      iframe.style.overflow = 'hidden';
      iframe.style.opacity = '1';
      iframe.style.transition = 'opacity 0.3s ease';
      
      // Append iframe to body
      document.body.appendChild(iframe);
      
      // Add event listener for messages from iframe (if needed)
      window.addEventListener('message', function(event) {
        if (event.origin !== '${host}') return;
        // Handle messages from the iframe if needed
      });
    })();
  `;
  
  return new NextResponse(scriptContent, {
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
} 