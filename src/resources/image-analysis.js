import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

const apiKey = process.env.REACT_APP_VISION_KEY || process.env.REACT_APP_ENV.VISION_KEY;
const endpoint = process.env.REACT_APP_VISION_ENDPOINT || process.env.REACT_APP_ENV.VISION_ENDPOINT;

const visualFeatures = ["ImageType","Faces","Adult","Categories","Color","Tags","Description","Objects","Brands"];

export async function analyzeImageFromUrl(imageUrl) {  
  const client = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': apiKey } }), endpoint)

    const analysis = await client.analyzeImage(imageUrl, { visualFeatures, modelVersion: "latest"});

    return { "URL": imageUrl, ...analysis};
  }