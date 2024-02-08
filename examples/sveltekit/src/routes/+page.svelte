<script lang="ts">
    let prompt: string = "A cute cartoon fox with a top-hat";
    $: imageUrl = null;

    async function generateImage(): Promise<void> {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (response.ok) {
            const imageBuffer = await response.arrayBuffer();
            const blob = new Blob([imageBuffer], { type: 'image/png' });
            imageUrl = URL.createObjectURL(blob);
        } else {
            console.error('Error generating image');
            imageUrl = null;
        }
    }
</script>

<main>
    <form on:submit|preventDefault={generateImage}>
        <input
          type="text"
          placeholder="Enter a prompt"
          bind:value={prompt}
          class="input w-full"
        />
        <button type="submit">
          Generate Image
        </button>
    </form>
    {#if imageUrl}
        <img src={imageUrl} alt="Generated" />
    {/if}
</main>
