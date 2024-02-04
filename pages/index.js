import { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Code as CodeIcon } from "lucide-react";
import { Wrench as WrenchIcon } from "lucide-react";

import Footer from "components/footer";
import Form from "components/form";

export default function Home() {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      prompt: e.target.prompt.value,
    };

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Fetch the audio file with the Fetch API
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });


    if (!response.ok) {
      setError(`request failed HTTP ${response.status}`);
      return;
    }

    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    source.connect(audioContext.destination);

    source.start();

  };

  return (
    <div>
    <div className="max-w-[512px] mx-auto p-10 bg-white rounded-lg">
      <Head>
        <title>Modal Vercel Integration Demo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p className="pb-5 text-lg">
        This{" "}
        <a className="underline" href="https://github.com/zeke/inpainter">
          open-source demo
        </a>{" "}
        uses the{" "}
        <a
          className="underline"
          href="https://huggingface.co/docs/diffusers/en/using-diffusers/sdxl"
        >
          Stable Diffusion XL
        </a>{" "}
        model and{" "}
        <a className="underline" href="https://modal.com">
          Modal&apos;s API
        </a>{" "}
        to generate prompt-based images right in your browser.
      </p>

      <main className="container mx-auto p-5">
        {error && <div>{error}</div>}


        <div className="max-w-[512px] mx-auto">
          <Form onSubmit={handleSubmit} />

          <div className="text-center">
            <Link href="https://modal.com/docs/examples/stable_diffusion_xl">
              <a target="_blank" className="lil-button">
                <WrenchIcon className="icon" />
                Build your own Text-to-speech API with Modal
              </a>
            </Link>
            <Link href="https://github.com/modal-labs/vercel-integration-example">
              <a
                className="lil-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeIcon className="icon" />
                View code on GitHub
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
    <Footer />
    </div>
  );
}
