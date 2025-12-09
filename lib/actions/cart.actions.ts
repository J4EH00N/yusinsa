'use server';

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { carts, products } from "@/db/schema";
import { CartItem } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Helper to calculate prices
const calcPrice = (items: CartItem[]) => {
    const itemsPrice = items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
    }
}

export async function addToCart(item: CartItem) {
    const sessionCookie = (await cookies()).get('sessionCartId')?.value;
    const sessionCartId = sessionCookie || crypto.randomUUID();

    // Set cookie if not exists
    if (!sessionCookie) {
        (await cookies()).set('sessionCartId', sessionCartId);
    }

    const session = await auth();
    const userId = session?.user?.id ? session.user.id : undefined;

    // Check for existing cart
    const cart = await db.query.carts.findFirst({
        where: userId
            ? eq(carts.userId, userId)
            : eq(carts.sessionCartId, sessionCartId)
    });

    if (cart) {
        // Update existing cart
        const items = JSON.parse(cart.items as string) as CartItem[];
        const existItem = items.find((x) => x.productId === item.productId);

        if (existItem) {
            existItem.qty += 1;
        } else {
            items.push(item);
        }

        const prices = calcPrice(items);

        await db.update(carts).set({
            items: JSON.stringify(items),
            ...prices
        }).where(eq(carts.id, cart.id));

    } else {
        // Create new cart
        const items = [item];
        const prices = calcPrice(items);

        await db.insert(carts).values({
            userId,
            sessionCartId,
            items: JSON.stringify(items),
            ...prices
        });
    }

    revalidatePath(`/product/${item.slug}`);
    revalidatePath('/cart');
}

export async function getMyCart() {
    const sessionCookie = (await cookies()).get('sessionCartId')?.value;
    const session = await auth();
    const userId = session?.user?.id;

    if (!sessionCookie && !userId) return undefined;

    const cart = await db.query.carts.findFirst({
        where: userId
            ? eq(carts.userId, userId)
            : sessionCookie ? eq(carts.sessionCartId, sessionCookie) : undefined
    });

    return cart;
}
