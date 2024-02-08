"use client";

import { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("A cute cartoon fox with a top-hat");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const generateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    // Making a POST request to Modal's instant Stable Diffusion endpoint
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt, 
        }),
      });

      if (response.status === 200) {
        const imageBuffer = await response.arrayBuffer();
        const blob = new Blob([imageBuffer], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } else {
        const message = await response.text();
        setImageUrl(null); 
        console.error(`Error: ${message}`);
      }
    } catch (error) {
      console.error('Failed to fetch image:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={generateImage} className="flex gap-4 w-full">
        <input
          type="text"
          placeholder="Enter a prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="input w-full"
        />
        <button type="submit" className="btn border border-black bg-white">
          Generate Image
        </button>
      </form>
      {imageUrl && (
        <img src={imageUrl} alt="Generated" className="mt-4 max-w-full h-auto" />
      )}
    </main>
  );
}
