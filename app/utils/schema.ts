import { z } from 'zod';

export const ChangePasswordSchema = z.object({
    email: z.string(),
    current_password: z.string(),
    retype_password: z.string(),
    new_password: z.string(),
});

export const CreateWineSchema = z.object({
    page         : z.optional(z.string()),
    Category     : z.string(),
    Varietal     : z.optional(z.string()),
    Country      : z.optional(z.string()),
    Vintage      : z.optional(z.string()),
    Producer     : z.string(),
    Label        : z.optional(z.string()),
    Appellation  : z.optional(z.string()),
    'Ready-open' : z.optional(z.string()),
    'Ready-close': z.optional(z.string()),
    Source       : z.optional(z.string()),
    Price        : z.optional(z.coerce.number()),
    Acquired     : z.optional(z.string()),
    Notes        : z.coerce.boolean(),
    Quantity     : z.coerce.number(),
    Comments     : z.optional(z.string()),
});

export const UpdateWineSchema = z.object({
    ID           : z.optional(z.string()),
    page         : z.optional(z.string()),
    Category     : z.string(),
    Varietal     : z.optional(z.string()),
    Country      : z.optional(z.string()),
    Vintage      : z.optional(z.string()),
    Producer     : z.string(),
    Label        : z.optional(z.string()),
    Appellation  : z.optional(z.string()),
    'Ready-open' : z.optional(z.string()),
    'Ready-close': z.optional(z.string()),
    Source       : z.optional(z.string()),
    Price        : z.optional(z.coerce.number()),
    Acquired     : z.optional(z.string()),
    Notes        : z.coerce.boolean(),
    Quantity     : z.coerce.number(),
    Comments     : z.optional(z.string()),
    Archived     : z.optional(z.coerce.boolean()),
    GetMore      : z.optional(z.coerce.boolean()),
});

export const CreateCategorySchema = z.object({
    code: z.string(),
    title: z.string(),
    group: z.string(),
});

export const UpdateCategorySchema = z.object({
    ID: z.optional(z.string()),
    code: z.string(),
    title: z.string(),
    group: z.string(),
});

export const UpdateQuantitySchema = z.object({
    ID           : z.optional(z.string()),
    page         : z.optional(z.string()),
    Quantity     : z.coerce.number(),
});