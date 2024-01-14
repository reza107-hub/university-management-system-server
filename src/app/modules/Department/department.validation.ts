import {z} from 'zod'

const departmentValidationSchema = z.object({
    body:z.object({
        name: z.string(),
        shortForm: z.string(),
        code: z.string(),
        program:z.string()
    })
})



export const departmentValidation = {
    departmentValidationSchema
}