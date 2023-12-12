import { forIn, toPairs } from "lodash";
import { ValidationError, type ObjectSchema } from "yup";

export type SchemaField<T> = {
    value: T;
    error: string | undefined;
    valid: boolean;
    type: string;
}
export type SchemaFields<T extends Record<string, any>> = {
    [K in keyof T]: T[K];
}

export type SchemaErrors<T extends Record<string, any>> = {
    [K in keyof T]: string | null;
}

export class Schema<T extends Record<string, any>> {
    public fields: SchemaFields<T> = {} as SchemaFields<T>;

    public errors: SchemaErrors<T> = {} as SchemaErrors<T>; 

    public constructor( public validator: ObjectSchema<T> ) {
        /**
         * Some types are missing on the spec object
         * Author of `yup` did not include all returned types
         */
        for( const [key, value] of Object.entries( validator.fields )  ) {
            this.fields[key as keyof T] = value.spec.default;
        }

        for( const [key, value] of Object.entries( validator.fields )  ) {
            this.errors[key as keyof T] = null;
        }
    }

    /**
     * Validates schema and transform errors into
     * more human friendly error messages
     * 
     * @param object    data to validate
     * @returns boolean
     */
    public async validate( data: T ) {
        /**
         * Reset all field errors before before assigning errors 
         */          
        forIn(this.errors, error => error = null)

        try {
            await this.validator.validate(data, { abortEarly: false });

            return true;
        } catch (error) {  
            if ( ! (error instanceof ValidationError) ) {
                return false;
            }

            error.inner.forEach(error => {
                this.errors[error.path as keyof T] = error.message
            } )

            // Always return false
            return false;
        }
    }
}