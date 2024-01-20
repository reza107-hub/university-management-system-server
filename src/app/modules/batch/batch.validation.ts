import {z} from 'zod'

const batchValidationSchema = z.object({
    body:z.object({
        batchNumber:z.number({required_error:'required'}),
        isAdmissionGoing:z.boolean().default(false)
    })
})

export const BatchValidation = {
    batchValidationSchema
}