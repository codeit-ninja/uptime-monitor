export const GET = async <T = unknown>( url: URL | RequestInfo, params: Record<string, any> ) : Promise<T> => {
    const request = await fetch( params ? `${url}?${new URLSearchParams( params )}` : url );

    return await request.json();
}

export const POST = async <T = unknown>( url: URL | RequestInfo, data?: Record<string, any> ) : Promise<T> => {
    const request = await fetch( url,
        {
            method: 'POST',
            body: data ? JSON.stringify( data ) : null,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    return await request.json();
}