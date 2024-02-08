import type { RequestHandler } from './$types';

export const POST = (async ({request}) => {
    const jsonBody = await request.json();
    const body = JSON.stringify({
        prompt: jsonBody.prompt || "",
        height: 768,
        width: 768,
        num_outputs: 1,
        "negative_prompt": "deformed, ugly",
    });

    const response = await fetch("https://modal-labs--instant-stable-diffusion-xl.modal.run/v1/inference", {
        method: "POST",
        headers: {
            Authorization: `Token ${process.env.MODAL_TOKEN_ID}:${process.env.MODAL_TOKEN_SECRET}`,
            "Content-Type": "application/json",
        },
        body,
    });

    if (response.status !== 201) {
        const message = await response.text();
        return Response.json({ message }, { status: 500 });
    }

    const imageBuffer = await response.arrayBuffer();
    return new Response(Buffer.from(imageBuffer), { headers: { 'Content-Type': 'image/png' } });
}) satisfies RequestHandler;
