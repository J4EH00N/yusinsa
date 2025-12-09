import { integer, pgTable, text, boolean, numeric, timestamp, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    category: text("category").notNull(),
    images: text("images").array().notNull(),
    brand: text("brand").notNull(),
    description: text("description").notNull(),
    stock: integer("stock").notNull(),
    price: numeric("price", { precision: 12, scale: 2 }).notNull().default('0'),
    rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default('0'),
    numReviews: integer("num_reviews").notNull().default(0),
    isFeatured: boolean("is_featured").default(false),
    banner: text("banner"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").default('NO_NAME').notNull(),
    email: text("email").notNull().unique(),
    password: text("password"),
    role: text("role").default('user').notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const carts = pgTable("carts", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id),
    sessionCartId: text("session_cart_id").notNull(),
    items: text("items").default('[]').notNull(),
    itemsPrice: numeric("items_price", { precision: 12, scale: 2 }).notNull().default('0'),
    totalPrice: numeric("total_price", { precision: 12, scale: 2 }).notNull().default('0'),
    shippingPrice: numeric("shipping_price", { precision: 12, scale: 2 }).notNull().default('0'),
    taxPrice: numeric("tax_price", { precision: 12, scale: 2 }).notNull().default('0'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
