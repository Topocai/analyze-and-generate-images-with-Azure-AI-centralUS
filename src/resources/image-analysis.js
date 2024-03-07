const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

const endpoint = process.env.REACT_APP_VISION_ENDPOINT || process.env.AZURE_VISION_ENDPOINT;
const key = process.env.REACT_APP_VISION_KEY || process.env.AZURE_VISION_KEY;

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = [
  'Caption',
  'Read'
];

export async function analyzeImageFromUrl(imageUrl) {
   const response = await client.path('/imageanalysis:analyze').post({
    body: {
        url: imageUrl
    },
    queryParameters: {
        features: features
    },
    contentType: 'application/json'
  }).then((response) => {

    const iaResult = response.body;
    if (iaResult.captionResult) {
      console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
      return iaResult.captionResult.text;
    }
    if (iaResult.readResult) {
      iaResult.readResult.blocks.forEach(block => console.log(`Text Block: ${JSON.stringify(block)}`));
    }
  });

  return response
}