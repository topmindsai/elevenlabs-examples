import { VoiceWidget } from "@/components/VoiceWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ElevenLabs Modern Conversational AI Widget",
  description: "Modern widget for ElevenLabs Conversational AI",
};

export default function ModernWidgetEmbedPage() {
  return (
    <div className="w-full h-full">
      <VoiceWidget />
    </div>
  );
} 