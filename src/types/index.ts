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
        mercadoLibrePrice: z.number()
    }),
})
export type Product = z.infer<typeof productSchema>
export type CreateProductForm = Pick<Product, "type" | "haveWeight" | "weight" | "cost" | "price">
export type AddStockForm = {
    [key: string]: number
}


// CLIENTS
export const clientSchema = z.object({
    _id: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    cuil: z.string()
})
export type Client = z.infer<typeof clientSchema>
export type CreateClientForm = Pick<Client, "name" | "phoneNumber" | "address" | "cuil">



// SALES
export const saleProductSchema = z.object({
    product: productSchema,
    quantity: z.number(),
    unitPrice: z.number()
})
export const saleClientSchema = z.object({
    _id: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    cuil: z.string(),
    _v: z.number().optional()
})
export const saleTypeSchema = z.enum([
    "wholesalePrice",
    "retailPrice",
    "mercadoLibrePrice"
]);
export const saleSchema = z.object({
    _id: z.string(),
    client: saleClientSchema,
    products: z.array(saleProductSchema),
    iva: z.boolean(),
    discount: z.number(),
    subtotal: z.number(),
    total: z.number(),
    type: saleTypeSchema
})
export type Sale = z.infer<typeof saleSchema>
export type CreateSaleForm = Pick<Sale, 'client' | 'discount' | 'iva' | 'products' | 'type' >
export type SaleType = z.infer<typeof saleTypeSchema>