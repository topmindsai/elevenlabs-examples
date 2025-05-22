import { Conversation } from '@/components/Conversation';
import { SimpleConversation } from '@/components/SimpleConversation';

export default function TestConversationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          ElevenLabs Conversational AI Test
        </h1>
        
        <div className="space-y-8">
          <div className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Direct Agent ID (Recommended for Public Agents)</h2>
            <SimpleConversation />
          </div>
          
          <div className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Signed URL (For Private Agents)</h2>
            <Conversation />
          </div>
        </div>
      </div>
    </main>
  );
} 