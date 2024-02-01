# 🎨 Vercel Integration

Example Next.js app showing how to use Modal's Vercel Integration

A web GUI for inpainting with [Stable Diffusion](https://replicate.com/stability-ai/stable-diffusion) using Modal Instant Endpoints and the Vercel Integration.

Try it out at [TODO](https://TODO.vercel.app/)

<!-- https://user-images.githubusercontent.com/2289/TODO.mp4 -->

## Tech Stack

- [Modal](https://modal.com/), a platform for running machine learning models in the cloud.
- Next.js [server-side API routes](pages/api) for talking to the Modal API
- Next.js React components for the inpainting GUI
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Stable Diffusion](https://replicate.com/stability-ai/stable-diffusion), an open-source text-to-image generation model.
- [Lucide](https://lucide.dev/) for Icons

## Development

Prerequisites:

1. Recent version of Node.js
2. [Setup the Modal integration on Vercel](https://modal.com/docs/guide/vercel-integration)

Then install dependencies and run the server:

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
