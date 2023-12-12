import { object, string, number } from "yup";
import { Schema } from "./Schema";

const s = object({
    name: 
        string()
            .required()
            .default('Mauritzschilderwerken.nl'),
    url: 
        string()
            .required()
            .default('https://mauritzschilderwerken.nl'),
    interval: 
        number()
            .required()
            .min(10)
            .max(1440)
            .default(10),
    timeout: 
        number()
            .required()
            .min(5)
            .max(60)
            .default(30),
    method: 
        string()
            .required()
            .default('GET'),
})

export const schema = new Schema( s )
//export const validatorOld = new Validator( schema )