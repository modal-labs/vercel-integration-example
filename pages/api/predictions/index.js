import fetch from 'node-fetch';
import fetch from 'node-fetch';


export default async function handler(req, res) {
  // remove null and undefined values
  req.body = Object.entries(req.body).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
  console.log(`starting request ${req.body}`);

  const body = JSON.stringify({
    text: req.body.prompt,
  });

  const response = await fetch("https://modal-labs--tts.modal.run", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.MODAL_TOKEN_ID}:${process.env.MODAL_TOKEN_SECRET}`,
      "Content-Type": "application/json",
    },
    body,
  });

  console.log(`Modal Instant Endpoint response (HTTP status: ${response.status}): ${response}`);
  if (response.ok) {
    const audioBuffer = await response.body();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'audio/wav');
    res.send(audioBuffer);
    return;
  }

}
