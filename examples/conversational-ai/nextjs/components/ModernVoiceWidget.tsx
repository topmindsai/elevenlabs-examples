'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';

export function ModernVoiceWidget() {
  const [isMinimized, setIsMinimized] = useState(true);
  
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected');
      setIsMinimized(false);
    },
    onDisconnect: () => {
      console.log('Disconnected');
    },
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent ID directly (for public agents)
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID || 'qzfCTUbp54hEcfcvTgAP',
      });

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setIsMinimized(true);
  }, [conversation]);

  const toggleWidget = () => {
    if (conversation.status === "connected" && isMinimized) {
      setIsMinimized(false);
    } else if (conversation.status !== "connected") {
      if (isMinimized) {
        setIsMinimized(false);
        setTimeout(() => {
          startConversation();
        }, 100);
      } else {
        setIsMinimized(true);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Widget */}
      {!isMinimized && (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-4 w-96 max-w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-xl">
              {conversation.status === "connected"
                ? conversation.isSpeaking
                  ? "AI is speaking..."
                  : "Listening..."
                : "Voice Assistant"}
            </h3>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
              aria-label="Minimize"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Voice Activity Indicator */}
            <div className="relative mb-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                conversation.status === "connected" && conversation.isSpeaking
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                  : conversation.status === "connected"
                  ? "bg-gradient-to-r from-green-400 to-blue-500 shadow-lg shadow-green-400/30"
                  : "bg-gradient-to-r from-gray-300 to-gray-400"
              }`}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              {conversation.status === "connected" && (
                <>
                  <div className="absolute -inset-3 rounded-full border-2 border-blue-300/50 animate-ping"></div>
                  <div className="absolute -inset-6 rounded-full border border-blue-200/30 animate-pulse"></div>
                </>
              )}
            </div>
            
            <div className="w-full flex justify-center">
              {conversation.status !== "connected" ? (
                <button
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-sm font-semibold flex items-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={startConversation}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Start Voice Chat
                </button>
              ) : (
                <button
                  className="px-8 py-4 bg-white border-2 border-red-400 text-red-500 rounded-2xl text-sm font-semibold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={stopConversation}
                >
                  End Conversation
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 font-medium">
              Powered by <span className="text-blue-600 font-semibold">Brainova AI</span>
            </p>
          </div>
        </div>
      )}
      
      {/* Minimized Widget */}
      {isMinimized && (
        <div className="group flex flex-col items-center">
          <button
            onClick={toggleWidget}
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full py-4 px-6 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 group-hover:shadow-blue-500/25"
            aria-label="Open voice chat"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-sm font-semibold">Voice Chat</span>
          </button>
          
          {/* Powered by text */}
          <div className="mt-2 text-xs text-gray-500 font-medium">
            Powered by <span className="text-blue-600 font-semibold">Brainova AI</span>
          </div>
          
          {/* Floating tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
              Click to start voice conversation
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 