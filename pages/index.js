import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Canvas from "components/canvas";
import PromptForm from "components/prompt-form";
import Dropzone from "components/dropzone";
import Download from "components/download";
import Image from "next/image";
import { XCircle as StartOverIcon } from "lucide-react";
import { Code as CodeIcon } from "lucide-react";
import { Wrench as WrenchIcon } from "lucide-react";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [userUploadedImage, setUserUploadedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      prompt: e.target.prompt.value,
      mask: maskImage,
    };

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(response);
    const blob = await response.blob();
    console.log(blob);
    console.log(`Browser client received image of size ${blob.size} bytes`);
    const imageUrl = URL.createObjectURL(blob);

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPredictions(predictions.concat([imageUrl]));
    console.log(predictions);

    // while (
    //   prediction.status !== "succeeded" &&
    //   prediction.status !== "failed"
    // ) {
    //   await sleep(1000);
    //   const response = await fetch("/api/predictions/" + prediction.id);
    //   // prediction = await response.json();
    //   const blob = await response.blob();
    //   const imageUrl = URL.createObjectURL(blob);
    //   if (response.status !== 200) {
    //     setError(prediction.detail);
    //     return;
    //   }
    //   // setPredictions(predictions.concat([prediction]));
    //   setPredictions(predictions.concat([imageUrl]));

    //   if (prediction.status === "succeeded") {
    //     setUserUploadedImage(null);
    //   }
    // }
  };

  const startOver = async (e) => {
    e.preventDefault();
    setPredictions([]);
    setError(null);
    setMaskImage(null);
    setUserUploadedImage(null);
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
          <Image
              src={predictions[predictions.length - 1]}
              alt="preview image"
              height={768}
              width={768}
          /> :
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
