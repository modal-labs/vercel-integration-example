# 💚 Modal Vercel Integration

Example Next.js app showing how to use Modal's Vercel Integration.

Create pictures with [Stable Diffusion](https://huggingface.co/docs/diffusers/en/using-diffusers/sdxl) using Modal Instant Endpoints and Modal's Vercel Integration.

Try it out at [vercel-integration-example-pi-henna.vercel.app](https://vercel-integration-example-pi-henna.vercel.app/).

<!-- https://user-images.githubusercontent.com/2289/TODO.mp4 -->

## Tech Stack

* [Modal](https://modal.com/), a platform for running machine learning models in the cloud.
* Next.js [server-side API routes](pages/api) for talking to the Modal API
* Next.js React components for the inpainting GUI
* [Tailwind CSS](https://tailwindcss.com/) for styling
* [Stable Diffusion XL](https://huggingface.co/docs/diffusers/en/using-diffusers/sdxl), an open-source text-to-image generation model.

## Development

### Setup

1. Recent version of Node.js
2. [Setup the Modal integration on Vercel](https://modal.com/docs/guide/vercel-integration)

Then install dependencies and run the server:

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## Deploy

Setup the [Modal Vercel Integration](https://vercel.com/integrations/modal) and deploy this app on Vercel by clicking below! 

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmodal-labs%2Fvercel-integration-example&demo-title=Modal%20Simple%20Stable%20Diffusion%20Demo&demo-description=An%20example%20of%20using%20Modal's%20Vercel%20Integration%20to%20deploy%20a%20simple%20Next.js%20app.&demo-url=https%3A%2F%2Fmodal-vercel-integration-example.vercel.app&demo-image=https%3A%2F%2Fmodal-public-assets.s3.amazonaws.com%2Fvercel-integration-example-app-screenshot.png&integration-ids=oac_WTLyBAo3X9Y9G7ug2kQvq490)

