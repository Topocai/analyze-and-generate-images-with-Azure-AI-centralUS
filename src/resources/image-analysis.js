const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

const endpoint = process.env.REACT_APP_VISION_ENDPOINT || process.env.REACT_APP_ENV.VISION_ENDPOINT;
const key = process.env.REACT_APP_VISION_KEY || process.env.REACT_APP_ENV.VISION_KEY;

const credential = new AzureKeyCredential(key);
const client = new createClient(endpoint, { credential });

const features = [
  'Caption',
  'Read'
];

export async function analyzeImageFromUrl(imageUrl) {
  console.log("Analyzing image from URL " + imageUrl);
  const result = await client.path('/imageanalysis:analyze').post({
    body: {
        body: imageUrl
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