"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import { useConversation } from "@11labs/react";
import { cn } from "@/lib/utils";

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch {
    console.error("Microphone permission denied");
    return false;
  }
}

async function getSignedUrl(): Promise<string> {
  const response = await fetch("/api/signed-url");
  if (!response.ok) {
    throw Error("Failed to get signed url");
  }
  const data = await response.json();
  return data.signedUrl;
}

export function ConvAIWidget() {
  const [isMinimized, setIsMinimized] = useState(true);
  const conversation = useConversation({
    onConnect: () => {
      console.log("connected");
      setIsMinimized(false);
    },
    onDisconnect: () => {
      console.log("disconnected");
    },
    onError: error => {
      console.log(error);
      alert("An error occurred during the conversation");
    },
    onMessage: message => {
      console.log(message);
    },
  });

  async function startConversation() {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      alert("Microphone permission is required to speak with the AI assistant");
      return;
    }
    const signedUrl = await getSignedUrl();
    const conversationId = await conversation.startSession({ signedUrl });
    console.log(conversationId);
  }

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setIsMinimized(true);
  }, [conversation]);

  const toggleWidget = () => {
    if (conversation.status === "connected" && isMinimized) {
      setIsMinimized(false);
    } else if (conversation.status !== "connected") {
      setIsMinimized(!isMinimized);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {!isMinimized && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-2 w-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">
              {conversation.status === "connected"
                ? conversation.isSpeaking
                  ? "AI Assistant is speaking"
                  : "AI Assistant is listening"
                : "AI Assistant"}
            </h3>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "orb my-4 mx-auto",
                conversation.status === "connected" && conversation.isSpeaking
                  ? "orb-active animate-orb"
                  : conversation.status === "connected"
                  ? "animate-orb-slow orb-inactive"
                  : "orb-inactive"
              )}
            ></div>
            
            {conversation.status !== "connected" ? (
              <button
                className="mt-4 px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
                onClick={startConversation}
              >
                Start conversation
              </button>
            ) : (
              <button
                className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-full text-sm font-medium"
                onClick={stopConversation}
              >
                End conversation
              </button>
            )}
          </div>
        </div>
      )}
      
      <button
        onClick={toggleWidget}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
          conversation.status === "connected" && !isMinimized
            ? "bg-green-500 text-white"
            : "bg-black text-white"
        }`}
      >
        {conversation.status === "connected" && !isMinimized ? (
          <span>🎙️</span>
        ) : (
          <span>💬</span>
        )}
      </button>
    </div>
  );
} 