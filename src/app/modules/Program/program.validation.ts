import {z} from 'zod'

const programValidationSchema = z.object({
    body:z.object({
        name:z.string({required_error:'required'}).trim()
    })
})

export const ProgramValidation = {
    programValidationSchema
}