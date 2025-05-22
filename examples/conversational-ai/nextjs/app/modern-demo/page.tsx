import { ModernVoiceWidget } from '@/components/ModernVoiceWidget';

export default function ModernDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Brainova AI Voice Assistant
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of conversational AI with our sleek, modern voice interface
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
              Next-Generation Voice Technology
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-700 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Features
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-4"></div>
                    Ultra-modern, sleek design with glassmorphism effects
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-4"></div>
                    Real-time voice activity with beautiful visual indicators
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-4"></div>
                    Smooth animations and micro-interactions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-4"></div>
                    Responsive design optimized for all devices
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-4"></div>
                    Seamless integration with advanced AI capabilities
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-700 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Quick Start
                </h3>
                <ol className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">1</span>
                    <span>Click the "Voice Chat" button in the bottom-right corner</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">2</span>
                    <span>Allow microphone access when prompted by your browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">3</span>
                    <span>Start speaking naturally with the AI assistant</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">4</span>
                    <span>Enjoy seamless, natural conversation with advanced AI</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Ready to Experience the Future?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                The voice chat widget is located in the bottom-right corner of your screen. 
                Click it to start an intelligent conversation with our AI assistant powered by cutting-edge technology.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">Pro Tip</span>
                </div>
                <p className="text-sm text-gray-600">
                  Ensure your microphone is working and you have a stable internet connection 
                  for the optimal conversational experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* The Modern Voice Widget */}
      <ModernVoiceWidget />
    </main>
  );
} 