// server.js (Node.js with Express)
const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public')); //  Make sure the HTML file is in a folder named 'public'

// Enable CORS for cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// New endpoint for pest disease detection
app.post('/detect-disease', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not found in environment variables' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const imageBase64 = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;

    const prompt = `
    Analyze this crop image and identify any diseases or pests. 
    If a disease or pest is detected, provide the following information in JSON format:
    {
      "detection": "Name of the disease or pest",
      "confidence": A number between 0-100 representing confidence level,
      "description": "Brief description of the disease or pest",
      "treatment": "Recommended treatment methods",
      "prevention": "Prevention tips"
    }
    If no disease or pest is detected, return:
    {
      "detection": "Healthy",
      "confidence": 100,
      "description": "No disease or pest detected. The crop appears healthy.",
      "treatment": "No treatment needed",
      "prevention": "Continue good agricultural practices"
    }
    `;

    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      },
      { text: prompt },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts: imageParts }],
    });

    const responseText = result.response.text();
    
    // Extract JSON from the response
    let jsonResponse;
    try {
      // Find JSON in the response text (it might be surrounded by markdown code blocks or other text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (jsonError) {
      console.error('Error parsing JSON from AI response:', jsonError);
      return res.status(500).json({ 
        error: 'Failed to parse disease detection results',
        rawResponse: responseText
      });
    }

    res.json(jsonResponse);

  } catch (error) {
    console.error('Error detecting disease:', error);
    res.status(500).json({ error: 'Failed to detect disease' });
  }
});

// Original identify endpoint
app.post('/identify', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const apiKey = process.env.GEMINI_API_KEY;  // Retrieve API key from environment variables
    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not found in environment variables' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });


    const imageBase64 = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;

    const prompt = "Please provide a professional and detailed description of this image. Focus on key elements, composition, and notable features. Maintain a formal tone while being informative and precise.";
    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      },
      { text: prompt },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts: imageParts }],
    });

    const responseText = result.response.text();
    console.log(responseText);
    res.json({ description: responseText });

  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to identify image' });
  }
});

app.post('/ask', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const question = req.body.question;
    if (!question) {
      return res.status(400).json({ error: 'No question provided' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not found in environment variables' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const imageBase64 = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;

    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      },
      { text: `Regarding this image: ${question}\nPlease provide a comprehensive and professional response, supported by visual evidence from the image. Maintain a formal tone while being clear and precise.` },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts: imageParts }],
    });

    const responseText = result.response.text();
    res.json({ answer: responseText });

  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ error: 'Failed to process question' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});