import { Metadata } from "next";
import { VoiceWidget } from "@/components/VoiceWidget";

export const metadata: Metadata = {
  title: "Modern Widget - ElevenLabs Conversational AI",
  description: "A modern UI for ElevenLabs Conversational AI",
};

export default function ModernWidgetPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Modern Conversational AI Widget</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          This page demonstrates a modern, user-friendly interface for the ElevenLabs Conversational AI widget.
          The widget includes language selection and a cleaner UI based on the ElevenLabs design.
        </p>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Modern, clean design that matches ElevenLabs branding</li>
          <li>Language selection dropdown with flag icons</li>
          <li>Responsive interface that works on mobile devices</li>
          <li>Improved error handling and user feedback</li>
          <li>Accessibility improvements with proper ARIA labels</li>
          <li>Enhanced audio handling with automatic cleanup of resources</li>
        </ul>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How to Use</h2>
        <p className="mb-4">
          Click the "VOICE CHAT" button in the bottom-right corner to start a conversation with the AI assistant.
          You can select your preferred language from the dropdown menu next to the button.
        </p>
        <p>
          The widget requires microphone access to function properly. Make sure to allow microphone access when prompted.
        </p>
      </div>
      
      {/* The widget is automatically added to the page because it uses fixed positioning */}
      <VoiceWidget />
    </div>
  );
} 