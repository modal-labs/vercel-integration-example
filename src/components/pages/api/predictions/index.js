export default async function handler(req, res) {
  // remove null and undefined values
  req.body = Object.entries(req.body).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
  console.log(`starting request ${req.body}`);

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

  console.log(`Modal Instant Endpoint response (HTTP status: ${response.status}): ${response}`);
  if (response.status !== 201) {
    let message = await response.text();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: message }));
    return;
  }

  const imageBlob = await response.blob();
  const arrayBuffer = await imageBlob.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);
  res.statusCode = 201;
  res.setHeader(
    'Content-Type', 'image/png',
    'Content-Length', imageBuffer.size,
  );
  res.send(imageBuffer);
}
