"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { useConversation } from "@11labs/react";
import { cn } from "@/lib/utils";
import { getPublicAgentId, getPublicHost } from "@/lib/env";

// Type definition
type LanguageOption = {
  code: string;
  flag: string;
  name: string;
};

export function VoiceWidget() {
  // --- State ---
  const [isMinimized, setIsMinimized] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
    code: "en-US",
    flag: "🇺🇸",
    name: "English",
  });
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);
  
  // --- Refs ---
  const languageMenuRef = useRef<HTMLDivElement>(null);
  
  // --- Constants ---
  const languages: LanguageOption[] = [
    { code: "en-US", flag: "🇺🇸", name: "English" },
    { code: "es-ES", flag: "🇪🇸", name: "Spanish" },
    { code: "fr-FR", flag: "🇫🇷", name: "French" },
    { code: "de-DE", flag: "🇩🇪", name: "German" },
    { code: "it-IT", flag: "🇮🇹", name: "Italian" },
  ];

  // --- Helper Functions ---
  async function requestMicrophonePermission() {
    try {
      // Request with more specific constraints for better compatibility
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      // Store the stream so we can clean it up later
      setAudioStream(stream);
      return true;
    } catch (error) {
      console.error("Microphone permission denied:", error);
      return false;
    }
  }
  
  async function getSignedUrl(): Promise<string> {
    // Get the host from the window location to handle port correctly
    const host = getPublicHost();
    const url = `${host}/api/signed-url`;
    
    console.log("Fetching signed URL from:", url);
    try {
      const response = await fetch(url);
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries([...response.headers]));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to get signed URL. Status:", response.status, "Error:", errorText);
        throw Error(`Failed to get signed URL: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      if (!data.signedUrl) {
        console.error("Missing signedUrl in response:", data);
        throw Error("Missing signedUrl in response");
      }
      
      return data.signedUrl;
    } catch (error) {
      console.error("Error in getSignedUrl:", error);
      throw error;
    }
  }

  // --- Handlers defined before they're used ---
  const handleDisconnect = useCallback(() => {
    console.log("Disconnected from conversation WebSocket");
    
    // If not manually reconnecting, clean up audio
    if (!isReconnecting && audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
    }
  }, [audioStream, isReconnecting]);
  
  // --- Conversation Hook ---
  const conversation = useConversation({
    // Connection event handlers
    onConnect: () => {
      console.log("Connected to conversation WebSocket");
      setIsMinimized(false);
      setIsReconnecting(false);
    },
    onDisconnect: handleDisconnect,
    onError: error => {
      console.error("Conversation error:", error);
      // Only show alert if not in reconnection mode
      if (!isReconnecting) {
        alert("An error occurred during the conversation");
      }
    },
    
    // Message handlers
    onMessage: message => {
      console.log("Conversation message:", message);
    },
    onSpeechStart: () => {
      console.log("AI started speaking");
    },
    onSpeechEnd: () => {
      console.log("AI stopped speaking");
    },
    onTentativeTranscript: (transcript: string) => {
      console.log("Tentative transcript:", transcript);
    },
    onFinalTranscript: (transcript: string) => {
      console.log("Final transcript:", transcript);
    },
    
    // Other options
    volume: 1.0,
    autoSendPtt: true,
    
    // Language and agent overrides
    overrides: {
      agent: {
        language: selectedLanguage.code as any,
      }
    }
  });
  
  // --- Core Functions ---
  const stopConversation = useCallback(async () => {
    try {
      // Set reconnecting to false to ensure we clean up resources
      setIsReconnecting(false);
      await conversation.endSession();
      setIsMinimized(true);
      
      // Clean up audio stream
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        setAudioStream(null);
      }
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  }, [conversation, audioStream]);
  
  async function startConversation() {
    try {
      console.log("Starting conversation...");
      
      // Step 1: Request microphone permission
      console.log("Requesting microphone permission...");
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        console.error("Microphone permission denied");
        alert("Microphone permission is required to speak with the AI assistant");
        return;
      }
      console.log("Microphone permission granted");
      
      // Step 2: Try direct agent ID first
      console.log("Trying to connect with agent ID directly...");
      try {
        const agentId = getPublicAgentId();
        console.log("Using agent ID:", agentId);
        
        const directConversationId = await Promise.race([
          conversation.startSession({ agentId }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Direct agent ID connection timeout")), 10000)
          )
        ]);
        
        console.log("Conversation started with direct agent ID. Conversation ID:", directConversationId);
        return; // Return early if direct connection works
      } catch (agentIdError) {
        console.error("Failed to connect with agent ID, trying signed URL:", agentIdError);
        // Continue to signed URL approach (don't alert here)
      }
      
      // Step 3: Get signed URL (fallback)
      console.log("Getting signed URL...");
      let signedUrl;
      try {
        signedUrl = await getSignedUrl();
        console.log("Got signed URL:", signedUrl.substring(0, 30) + "..." + signedUrl.substring(signedUrl.length - 20));
      } catch (urlError) {
        console.error("Failed to get signed URL:", urlError);
        alert("Failed to get authenticated connection. Please check your API key and agent ID.");
        return;
      }
      
      // Step 4: Start conversation session with signed URL
      console.log("Starting conversation session with signed URL...");
      try {
        // Added explicit timeout to ensure the WebSocket has enough time to connect
        const conversationId = await Promise.race([
          conversation.startSession({ signedUrl }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Conversation connection timeout")), 10000)
          )
        ]);
        console.log("Conversation started with ID:", conversationId);
      } catch (sessionError) {
        console.error("Error starting conversation session:", sessionError);
        alert("Failed to start conversation. Please check your network connection and try again.");
        return;
      }
    } catch (error) {
      console.error("Unexpected error in startConversation:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  }
  
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
  
  const changeLanguage = (language: LanguageOption) => {
    setSelectedLanguage(language);
    setIsLanguageMenuOpen(false);
    
    // If a conversation is active, restart it with the new language
    if (conversation.status === "connected") {
      // Set reconnecting to true to prevent cleanup
      setIsReconnecting(true);
      stopConversation().then(() => {
        setTimeout(() => {
          startConversation();
        }, 500);
      });
    }
  };
  
  // --- Effects ---
  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Clean up audio resources when component unmounts
  useEffect(() => {
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioStream]);
  
  // --- Render ---
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {!isMinimized && (
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-2 w-80 max-w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">
              {conversation.status === "connected"
                ? conversation.isSpeaking
                  ? "AI is speaking"
                  : "AI is listening"
                : "Voice Chat"}
            </h3>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Minimize"
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
            
            <div className="w-full flex justify-center mt-2">
              {conversation.status !== "connected" ? (
                <button
                  className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium flex items-center"
                  onClick={startConversation}
                >
                  <span className="mr-2">📞</span> VOICE CHAT
                </button>
              ) : (
                <button
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full text-sm font-medium"
                  onClick={stopConversation}
                >
                  End conversation
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100 text-center text-xs text-gray-500">
            Powered by ElevenLabs Conversational AI
          </div>
        </div>
      )}
      
      {isMinimized && (
        <div className="bg-white rounded-full shadow-lg p-1 flex items-center mb-2">
          <button
            onClick={toggleWidget}
            className="flex items-center justify-center bg-black text-white rounded-full py-2 px-4"
            aria-label="Open voice chat"
          >
            <span className="mr-2">📞</span> VOICE CHAT
          </button>
          
          <div className="relative px-2" ref={languageMenuRef}>
            <button 
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 ml-1"
              aria-label="Language selection"
            >
              <span>{selectedLanguage.flag}</span>
              <span className="ml-1 text-xs">▼</span>
            </button>
            
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-1 z-10">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${
                      language.code === selectedLanguage.code ? "bg-gray-50" : ""
                    }`}
                    onClick={() => changeLanguage(language)}
                  >
                    <span className="mr-2">{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 