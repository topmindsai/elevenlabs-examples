import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ElevenLabs Conversational AI Widget Demo",
  description: "Learn how to embed the ElevenLabs Conversational AI on your website",
};

export default function WidgetDemoPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">ElevenLabs Conversational AI Widget</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Add the ElevenLabs Conversational AI to your website with a single line of code.
          The widget provides a chat interface for your users to interact with your ElevenLabs Conversational AI agent.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <a 
            href="/live-demo" 
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
          >
            View Live Demo
          </a>
          <a 
            href="/iframe-demo" 
            className="inline-flex items-center px-4 py-2 border border-black text-black rounded-full text-sm font-medium"
          >
            View Iframe Demo
          </a>
          <a 
            href="/modern-widget" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
          >
            View Modern Widget
          </a>
        </div>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <p className="mb-4">Add one of the following script tags to your website:</p>
        
        <h3 className="text-lg font-medium mt-4 mb-2">Standard Widget</h3>
        <div className="bg-black text-white p-4 rounded-md font-mono overflow-x-auto mb-4">
          {`<script src="${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3001'}/api/widget"></script>`}
        </div>
        
        <h3 className="text-lg font-medium mt-4 mb-2">Modern Widget (Recommended)</h3>
        <div className="bg-black text-white p-4 rounded-md font-mono overflow-x-auto mb-4">
          {`<script src="${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3001'}/api/modern-widget"></script>`}
        </div>
        
        <p>That's it! The widget will appear in the bottom-right corner of your website.</p>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Customization (Advanced)</h2>
        <p className="mb-4">
          If you need more control over the widget, you can embed it as an iframe directly:
        </p>
        
        <div className="bg-black text-white p-4 rounded-md font-mono overflow-x-auto">
          {`<iframe
  src="${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3001'}/embed"
  style="position: fixed; bottom: 0; right: 0; width: 350px; height: 500px; border: none; z-index: 9999;"
  allow="microphone"
></iframe>`}
        </div>
      </div>
    </div>
  );
} 