// To run: `node --loader ts-node/esm index.ts`
import fs from "fs";
import { Buffer } from 'buffer';


const generateSDXLImage = async () => {
    const body = JSON.stringify({
        prompt: "A cute cartoon fox with a top-hat",
        height: 768,
        width: 768,
        num_outputs: 1,
        "negative_prompt": "deformed, ugly",
    });

    const response = await fetch("https://modal-labs--instant-stable-diffusion-xl.modal.run/v1/inference", {
        method: "POST",
        headers: {
            Authorization: `Token ${process.env.MODAL_TOKEN_ID}:${process.env.MODAL_TOKEN_SECRET}`,
            "Content-Type": "application/json",
        },
        body,
    });

    if (response.status !== 201) {
        const message = await response.text();
        console.error(`Error: ${message}`);
        return;
    }

    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    const imagePath = './downloaded-image.png';
    fs.writeFile(imagePath, buffer, (err) => {
        if (err) {
            console.error('Failed to save the image:', err);
            return;
        }
        console.log(`Image saved to ${imagePath}`);
    });
}

generateSDXLImage();