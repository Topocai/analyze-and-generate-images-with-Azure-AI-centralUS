const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

//const endpoint = process.env.REACT_APP_VISION_ENDPOINT || process.env.VISION_ENDPOINT;
//const key = process.env.REACT_APP_VISION_KEY || process.env.VISION_KEY;

const credential = new AzureKeyCredential("16d7192893ce4bd78037b3cb2cd55a36");
const client = createClient("https://cvai-topocai.cognitiveservices.azure.com/", credential);

const features = [
  'Caption',
  'Read'
];

export async function analyzeImageFromUrl(imageUrl) {
  console.log("Analyzing image from URL " + imageUrl);
  const result = await client.path('/imageanalysis:analyze').post({
    body: {
        url: imageUrl
    },
    queryParameters: {
        features: features
    },
    contentType: 'application/json'
  });

  const iaResult = result.body;

  if (iaResult.captionResult) {
    console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
  }
  if (iaResult.readResult) {
    iaResult.readResult.blocks.forEach(block => console.log(`Text Block: ${JSON.stringify(block)}`));
  }
}