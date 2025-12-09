import { getMyCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';


export default async function CartPage() {
    const cart = await getMyCart();

    if (!cart || !cart.items || (JSON.parse(cart.items as string).length === 0)) {
        return (
            <div className="flex justify-center items-center flex-col h-screen">
                <h1 className="h1-bold">Shopping Cart is empty</h1>
                <Link href="/">
                    <Button variant="outline" className="mt-4">
                        Go Shopping
                    </Button>
                </Link>
            </div>
        )
    }

    const items = JSON.parse(cart.items as string) as CartItem[];

    return (
        <div className="space-y-8">
            <h1 className="h2-bold">Shopping Cart</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.slug}>
                            <CardContent className="p-4 flex items-center gap-4">
                                <Link href={`/product/${item.slug}`}>
                                    <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md" />
                                </Link>
                                <div className="flex-1">
                                    <div className="flex justify-between font-bold">
                                        <Link href={`/product/${item.slug}`}>{item.name}</Link>
                                    </div>
                                    <p className="text-sm">{item.category}</p>
                                    <div className="mt-2 text-sm text-gray-500">
                                        Qty: {item.qty}
                                    </div>
                                </div>
                                <div className="font-bold">
                                    ${item.price}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="col-span-1">
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between font-bold text-xl pb-2 border-b">
                                <span>Subtotal</span>
                                <span>${cart.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tax</span>
                                <span>${cart.taxPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span>${cart.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl pt-2 border-t">
                                <span>Total</span>
                                <span>${cart.totalPrice}</span>
                            </div>
                            <Button className="w-full">
                                Proceed to Checkout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
