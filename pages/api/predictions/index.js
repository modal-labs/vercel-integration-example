const addBackgroundToPNG = require("lib/add-background-to-png");

export default async function handler(req, res) {
  // remnove null and undefined values
  req.body = Object.entries(req.body).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );

  const body = JSON.stringify({
    prompt: req.body.prompt,
    height: 768,
    width: 768,
    num_outputs: 1,
    "negative_prompt": "deformed, ugly",
  });

  const response = await fetch("https://modal-labs--instant-stable-diffusion-xl-dev.modal.run", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.MODAL_TOKEN_ID}:${process.env.MODAL_TOKEN_SECRET}`,
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const imageBuffer = await response.blob();
  console.log(`Server endpoint received image of size ${imageBuffer.size} bytes`);
  res.statusCode = 201;
  res.setHeader('Content-Type', 'image/png');
  res.send(imageBuffer);
  // res.end(JSON.stringify(prediction));
}
