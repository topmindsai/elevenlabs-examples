import { Metadata } from "next";
import { ConvAIWidget } from "../../components/ConvAIWidget";

export const metadata: Metadata = {
  title: "Live Widget Demo - ElevenLabs Conversational AI",
  description: "See the ElevenLabs Conversational AI widget in action",
};

export default function LiveDemoPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Live Widget Demo</h1>
      
      <div className="mb-12">
        <p className="mb-4">
          This page demonstrates the ElevenLabs Conversational AI widget in action. You can see the 
          widget in the bottom-right corner of this page.
        </p>
        <p className="mb-4">
          Click on the chat bubble icon to interact with the AI assistant. You'll need to allow 
          microphone permissions when prompted to speak with the assistant.
        </p>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-12">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          When a user clicks the widget button:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>The widget requests microphone permission</li>
          <li>The app obtains a signed URL from the ElevenLabs API</li>
          <li>A WebSocket connection is established for real-time communication</li>
          <li>The user can speak to the AI, and the AI responds with voice</li>
        </ol>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Real-time voice conversation</li>
            <li>Minimizable widget interface</li>
            <li>Visual feedback during conversation</li>
            <li>Responsive design</li>
          </ul>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Integration</h2>
          <p className="mb-4">
            Visit our <a href="/widget-demo" className="text-blue-600 hover:underline">Widget Demo</a> page 
            to learn how to add this widget to your own website.
          </p>
        </div>
      </div>
      
      {/* The ConvAIWidget component is rendered here but displays in the bottom-right corner */}
      <ConvAIWidget />
    </div>
  );
} 