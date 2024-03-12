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

async function analyze(imageUrl) {
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
    console.log(iaResult)
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

export async function analyzeImageFromUrl(imageUrl) {
  const img = new Image();
  img.src = imageUrl;

  return new Promise((resolve, reject) => {
    img.onload = async () => resolve(await analyze(imageUrl));
    img.onerror = () => {
      if (imageUrl.trim() === '') return reject(new Error('Please, put an image url in the box below the preview.'));
      return reject(new Error('I can\'t reach the image, please check the url and try again.'));
    };
  });

}