import { NextResponse } from "next/server";

// Helper to add CORS headers
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET() {
  const agentId = process.env.NEXT_PUBLIC_AGENT_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;
  
  if (!agentId) {
    console.error("NEXT_PUBLIC_AGENT_ID is not set");
    return NextResponse.json(
      { error: "Agent ID is not configured" },
      { status: 500, headers: corsHeaders() }
    );
  }
  
  if (!apiKey) {
    console.error("ELEVENLABS_API_KEY is not set");
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 500, headers: corsHeaders() }
    );
  }
  
  try {
    console.log("Fetching signed URL for agent ID:", agentId);
    
    // Using the exact URL from the documentation
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      {
        headers: {
          'xi-api-key': apiKey,
        },
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to get signed URL:", response.status, errorText);
      return NextResponse.json(
        { error: `Failed to get signed URL: ${response.status} ${errorText}` },
        { status: response.status, headers: corsHeaders() }
      );
    }
    
    const data = await response.json();
    console.log("Successfully obtained signed URL");
    
    return NextResponse.json({ signedUrl: data.signed_url }, { headers: corsHeaders() });
  } catch (error) {
    console.error("Error fetching signed URL:", error);
    return NextResponse.json(
      { error: "Failed to get signed URL due to an unexpected error" },
      { status: 500, headers: corsHeaders() }
    );
  }
} 