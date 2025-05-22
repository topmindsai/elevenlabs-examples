# ElevenLabs Conversational AI Demo

This is a demo of the ElevenLabs Conversational AI API.

## Getting Started

1. Create a `.env` file based on `.env.example`
2. Add your ElevenLabs API key
3. Add your Conversational AI Agent ID

### Running the Application

```bash
npm install
npm run dev
```

## Embedding the Widget on Your Website

The Conversational AI can be embedded on any website as a widget. There are two ways to include it:

### 1. Script Tag (Easiest)

Add the following script tag to your website:

```html
<script src="https://your-deployed-app.com/api/widget"></script>
```

### 2. Iframe (Advanced)

For more control, you can embed the widget as an iframe:

```html
<iframe
  src="https://your-deployed-app.com/embed"
  style="position: fixed; bottom: 0; right: 0; width: 350px; height: 500px; border: none; z-index: 9999;"
  allow="microphone"
></iframe>
```

## Deployment

Before deploying, make sure to:

1. Update the `NEXT_PUBLIC_HOST` environment variable in your deployment settings to match your production URL
2. Ensure your ElevenLabs API key and Agent ID are properly set

## Demo Page

Visit `/widget-demo` in the application to see detailed instructions for embedding the widget on other websites.

## Learn More

- [Conversational AI Quickstart](https://elevenlabs.io/docs/conversational-ai/quickstart)
- [Conversational AI SDK](https://elevenlabs.io/docs/libraries/conversational-ai-sdk-js)
