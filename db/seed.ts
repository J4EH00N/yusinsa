import { db } from './drizzle';
import { products } from './schema';
import sampleData from '@/lib/sample-data';
import { exit } from 'process';

async function main() {
    console.log('Seeding data...');

    await db.delete(products);

    await db.insert(products).values(sampleData.products.map(product => ({
        ...product,
        price: product.price.toString(),
        rating: product.rating.toString(),
        isFeatured: product.isFeatured ?? false,
    })));

    console.log('Data seeded successfully!');
    exit(0);
}

main().catch((err) => {
    console.error(err);
    exit(1);
});
