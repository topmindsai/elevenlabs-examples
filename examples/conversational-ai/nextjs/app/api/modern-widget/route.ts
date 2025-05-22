import { NextResponse } from "next/server";

export async function GET() {
  // Get the host from environment or default to localhost:3001
  const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3001";
  
  // JavaScript to dynamically create and inject the widget
  const widgetScript = `
    (function() {
      // Create widget container
      const container = document.createElement('div');
      container.id = 'elevenlabs-convai-widget-container';
      container.style.position = 'fixed';
      container.style.bottom = '0';
      container.style.right = '0';
      container.style.zIndex = '9999';
      document.body.appendChild(container);

      // Create and load the iframe
      const iframe = document.createElement('iframe');
      iframe.src = '${host}/modern-embed';
      iframe.style.border = 'none';
      iframe.style.width = '350px';
      iframe.style.height = '500px';
      iframe.allow = 'microphone';
      container.appendChild(iframe);

      // Add toggle button styles
      const style = document.createElement('style');
      style.textContent = \`
        .elevenlabs-widget-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: white;
          border-radius: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          z-index: 10000;
        }
        .elevenlabs-widget-toggle button {
          background: black;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .elevenlabs-widget-toggle button span {
          margin-right: 8px;
        }
      \`;
      document.head.appendChild(style);
    })();
  `;

  return new NextResponse(widgetScript, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
} 