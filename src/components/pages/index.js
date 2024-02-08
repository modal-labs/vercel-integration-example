import { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Code as CodeIcon } from "lucide-react";
import { Wrench as WrenchIcon } from "lucide-react";

import Download from "src/components/download";
import Footer from "src/components/footer";
import Form from "src/components/form";

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

    if (response.status !== 201) {
      let err = await response.json()
      setError(`request failed HTTP ${response.status}: ${err.detail}`);
      return;
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    setPredictions(predictions.concat([imageUrl]));
    setIndex(predictions.length - 1);
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
        <a className="underline" href="https://github.com/modal-labs/vercel-integration-example">
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
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increment}>Left</button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={decrement}>Right</button>
            </div>
          </div> :
          <div role="status" className="space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
              <div className="flex items-center justify-center w-full h-72 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                  </svg>
              </div>
              <span className="sr-only">Placeholder image box</span>
          </div>
        }

        <div className="max-w-[512px] mx-auto">
          <Form onSubmit={handleSubmit} />

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
