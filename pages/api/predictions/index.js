export default async function handler(req, res) {
  // remove null and undefined values

  // get form data from the client

  const response = await fetch("https://modal-labs--whisper.modal.run", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.MODAL_TOKEN_ID}:${process.env.MODAL_TOKEN_SECRET}`,
      // multipart/form-data is not supported in fetch API
      
    },
    // forward form data from the client to the Modal Instant endpoint
    body: JSON.stringify(req.body),
  });

  console.log(`Modal Instant Endpoint response (HTTP status: ${response.status}): ${response}`);
  if (response.status !== 201) {
    let message = await response.text();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: message }));
    return;
  }

  const data = await response.json();
  res.statusCode = 200;
  res.end(JSON.stringify(data));
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}
