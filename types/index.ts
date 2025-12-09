import { products, carts } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

// INTENTIONALLY MODIFIED to include number for price/rating temporarily if needed, 
// but Drizzle 'numeric' returns string.
export type Product = InferSelectModel<typeof products>;
export type Cart = InferSelectModel<typeof carts>;
export type CartItem = {
    productId: string;
    name: string;
    slug: string;
    category: string;
    qty: number;
    image: string;
    price: string;
}
