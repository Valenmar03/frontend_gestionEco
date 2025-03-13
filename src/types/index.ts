import { z } from 'zod'

//AUTH
export const authSchema = z.object({
    userName: z.string(),
    password: z.string(),
    confirmPassword: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'userName' | 'password'>

//USER

export const userSchema = authSchema.pick({
    userName: true
}).extend({
    _id: z.string()
})
export type User = z.infer<typeof userSchema>

// PRODUCTS
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
export type AddStockForm = {
    [key: string]: number
}