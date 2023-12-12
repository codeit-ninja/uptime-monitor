export const GET = async ( url: URL | RequestInfo, params: Record<string, any> ) => {
    const request = await fetch( params ? `${url}?${new URLSearchParams( params )}` : url );

    return await request.json();
}

export const POST = async ( url: URL | RequestInfo, data: Record<string, any> ) => {
    const request = await fetch( url,
        {
            method: 'POST',
            body: JSON.stringify( data ),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    return await request.json();
}