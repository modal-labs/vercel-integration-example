import { useState } from "react";
import sample from "lodash/sample";

const samplePrompts = [
  "painting of fruit on a table in the style of Bob Ross",
  "pencil sketch of robots playing poker",
  "photo of an astronaut riding a horse",
  "futuristic cityscape at sunset, with towering skyscrapers and flying cars, in a cyberpunk style.",
  "an ancient forest shrouded in mist, with towering ancient trees and a carpet of lush ferns, illuminated by shafts of morning light.",
  "knight in shining armor battling a dragon, amidst a fiery landscape, with a castle in the background.",
  "serene beach scene at dusk, with pastel-colored skies reflecting on calm waters and silhouettes of palm trees.",
  "astronaut exploring a colorful alien market, filled with exotic creatures and strange technologies, in a vibrant sci-fi setting.",
  "majestic waterfall cascading into a hidden lagoon, surrounded by a dense tropical rainforest, with rays of sunlight filtering through.",
  "steampunk laboratory, filled with brass gadgets and bubbling potions, with an inventor working on a mechanical contraption.",
  "winter wonderland at night, with a cozy cottage, snow-covered trees, and the northern lights illuminating the sky.",
  "post-apocalyptic survivor in rugged attire, standing on a deserted street with overgrown buildings and abandoned vehicles.",
  "magical library with floating books, enchanted artifacts, and glowing runes, with a wizard reading a tome of ancient knowledge.",
  "old style map of the world where there is much more land than water",
];

export default function PromptForm(props) {
  const [prompt] = useState(sample(samplePrompts));

  return (
    <form
      onSubmit={props.onSubmit}
      className="py-5 animate-in fade-in duration-700"
    >
      <div className="flex max-w-[512px]">
        <input
          type="text"
          defaultValue={prompt}
          name="prompt"
          placeholder="Enter a prompt..."
          className="block w-full flex-grow rounded-l-md"
        />

        <button
          className="bg-black text-white rounded-r-md text-small inline-block px-3 flex-none"
          type="submit"
        >
          Generate Image
        </button>
      </div>
    </form>
  );
}
