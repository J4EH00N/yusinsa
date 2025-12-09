import { db } from '@/db/drizzle';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllProducts() {
    const data = await db.query.products.findMany({
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
    return data;
}

export async function getProductBySlug(slug: string) {
    return await db.query.products.findFirst({
        where: eq(products.slug, slug),
    });
}
