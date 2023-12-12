/**
 * Generate a random ID to use on input elements
 * 
 * @returns {string}
 */
export const generateInputId = () => 'input-' + Math.random().toString(16).slice(2);

export const useTry = <T extends () => any>( tryer: T ): [ReturnType<T> | null, Error | null] => {
    try {
        return [tryer(), null]
    } catch(error) {
        return [null, error as Error]
    }
}

export const useTryAsync = async <T extends () => any>( tryer: T ): Promise<[Awaited<ReturnType<T>> | null, Error | null]> => {
    try {
        return [await tryer(), null]
    } catch(error) {
        return [null, error as Error]
    }
}