import { ConvAIWidget } from "../../components/ConvAIWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ElevenLabs Conversational AI Widget",
  description: "Embed ElevenLabs Conversational AI on your website",
};

export default function WidgetPage() {
  return (
    <div className="w-full h-full">
      <ConvAIWidget />
    </div>
  );
} 