import { json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request }) => {
    console.log(Object.fromEntries(await request.formData()))

    return json('');
}