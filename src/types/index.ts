import { z } from 'zod'

export const productSchema = z.object({
    _id: z.string(),
    type: z.string(),
    haveWeight: z.boolean(),
    weight: z.number(),
    stock: z.number(),
    cost: z.number(),
    price: z.object({
        wholesalePrice: z.number(),
        retailPrice: z.number(),
    }),
})
export type Product = z.infer<typeof productSchema>
export type CreateProductForm = Pick<Product, "type" | "haveWeight" | "weight" | "cost" | "price">