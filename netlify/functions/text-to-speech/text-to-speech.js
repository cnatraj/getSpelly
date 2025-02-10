const { TextToSpeechClient } = require("@google-cloud/text-to-speech");

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse the request body
    const { text } = JSON.parse(event.body);

    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Text is required" }),
      };
    }

    // Initialize Google Cloud client with credentials from environment variables
    const client = new TextToSpeechClient({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    });

    // Construct the request
    const request = {
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    const audioContent = response.audioContent.toString("base64");

    return {
      statusCode: 200,
      body: JSON.stringify({ audioContent }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate speech" }),
    };
  }
};
