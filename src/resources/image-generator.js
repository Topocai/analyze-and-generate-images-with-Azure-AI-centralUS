import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || process.env.AZURE_OPENAI_API_KEY, dangerouslyAllowBrowser: true 
});

export async function generateImage({prompt, size = "256x256"}) {
    return new Promise((resolve, reject) => {
        openai.images.generate({
            prompt: prompt,
            size: size,
            n: 1,
        }).then((generated) => {
            resolve(generated);
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}