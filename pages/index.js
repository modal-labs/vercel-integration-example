import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import PromptForm from "components/prompt-form";
import Download from "components/download";
import Image from "next/image";
import { Code as CodeIcon } from "lucide-react";
import { Wrench as WrenchIcon } from "lucide-react";

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  const increment = () => {
    setIndex(Math.min(index + 1, predictions.length - 1));
  };

  const decrement = () => {
    setIndex(Math.max(index - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      prompt: e.target.prompt.value,
    };

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPredictions(predictions.concat([imageUrl]));
    setIndex(predictions.length - 1);
  };

  return (
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

        {predictions.length > 0 ? 
          <div>
            <Image
                src={predictions[index]}
                alt="preview image"
                height={768}
                width={768}
            />
            <div class="flex justify-center space-x-4">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increment}>Left</button>
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={decrement}>Right</button>
            </div>
          </div> :
          <span>Run a prompt</span>
        }

        <div className="max-w-[512px] mx-auto">
          <PromptForm onSubmit={handleSubmit} />

          <div className="text-center">
            <Download predictions={predictions} />
            <Link href="https://modal.com/docs/examples/stable_diffusion_xl">
              <a target="_blank" className="lil-button">
                <WrenchIcon className="icon" />
                Build your own Stable Diffusion API with Modal
              </a>
            </Link>
            <Link href="https://github.com/modal-labs/vercel-integration-example">
              <a
                className="lil-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeIcon className="icon" />
                See how it’s built on GitHub
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
