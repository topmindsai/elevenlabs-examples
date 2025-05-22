import { Metadata } from "next";
import { IframeWidget } from "@/components/IframeWidget";

export const metadata: Metadata = {
  title: "Iframe Demo - ElevenLabs Conversational AI",
  description: "Example of embedding the widget using an iframe",
};

export default function IframeDemo() {
  const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Iframe Embedding Demo</h1>
      
      <div className="mb-8">
        <p>
          This page demonstrates how the widget looks when embedded on another website using an iframe.
        </p>
      </div>
      
      <div className="border border-gray-300 rounded-lg p-8 bg-white mb-12 min-h-[500px] relative">
        <h2 className="text-xl font-semibold mb-4">Example Website Content</h2>
        <p className="mb-4">This represents a third-party website where the widget is embedded.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium mb-2">Sample Section 1</h3>
            <p>This is placeholder content to simulate a real website. The AI chat widget appears in the bottom-right corner.</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium mb-2">Sample Section 2</h3>
            <p>Users can interact with the widget while browsing the rest of the website content.</p>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-medium mb-2">About This Demo</h3>
          <p>The widget is embedded below using an iframe with the following HTML code:</p>
          <pre className="bg-black text-white p-3 rounded-md mt-2 text-sm overflow-x-auto">
            {`<iframe
  src="${host}/embed"
  style="position: fixed; bottom: 0; right: 0; width: 350px; height: 500px; border: none; z-index: 9999;"
  allow="microphone"
></iframe>`}
          </pre>
        </div>
        
        {/* Use a client component for the iframe */}
        <IframeWidget host={host} />
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <p className="mb-4">
          Visit our <a href="/widget-demo" className="text-blue-600 hover:underline">Widget Demo</a> page for detailed installation instructions.
        </p>
        <p>
          Check out the <a href="/live-demo" className="text-blue-600 hover:underline">Live Demo</a> to see the widget implemented directly as a React component.
        </p>
      </div>
    </div>
  );
} 