import {z} from 'zod'

const batchValidationSchema = z.object({
    body:z.object({
        batchNumber:z.number({required_error:'required'}),
        isAdmissionGoing:z.boolean().default(true)
    })
})
const updateBatchValidationSchema = z.object({
    body:z.object({
        batchNumber:z.number({required_error:'required'}).optional(),
        isAdmissionGoing:z.boolean().default(true).optional()
    })
})

export const BatchValidation = {
    batchValidationSchema,
    updateBatchValidationSchema
}