import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
};

/*
To hit endpoint try:

curl -X POST "http://localhost:3000/api" \
     -H "Authorization: Token YOUR_MODAL_TOKEN_ID:YOUR_MODAL_TOKEN_SECRET" \
     -H "Content-Type: application/json" \
     -d '{"prompt": "A cute cartoon fox with a top-hat"}'
*/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Buffer>,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const body = JSON.stringify({
    prompt: req.body.prompt,
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
    res.status(500).json({ message });
    return;
  }

  const imageBuffer = await response.arrayBuffer();
  res.setHeader('Content-Type', 'image/png');
  res.send(Buffer.from(imageBuffer));
}
