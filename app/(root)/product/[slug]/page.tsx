import { getProductBySlug } from '@/lib/actions/product.actions'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import AddToCart from '@/components/ui/shared/product/add-to-cart'

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) notFound()

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Images Column */}
                <div className="col-span-2">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={1000}
                        height={1000}
                        className="w-full h-auto"
                    />
                </div>

                {/* Details Column */}
                <div className="col-span-2 p-5 space-y-4">
                    <h1 className="h1-bold text-2xl">{product.name}</h1>
                    <p>{product.rating} Stars ({product.numReviews} reviews)</p>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-xl">
                            From {product.brand}
                        </p>
                        <p className="text-gray-500">
                            {product.category}
                        </p>
                        <div className="mt-4">
                            <p className="font-bold">Description:</p>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>

                {/* Action Column */}
                <div className="col-span-1 p-5">
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <div>Price</div>
                                <div className="font-bold text-xl">${product.price}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>Status</div>
                                {product.stock > 0 ? (
                                    <Badge variant="outline">In Stock</Badge>
                                ) : (
                                    <Badge variant="destructive">Out of Stock</Badge>
                                )}
                            </div>
                            {product.stock > 0 && (
                                <AddToCart item={{
                                    productId: product.id,
                                    name: product.name,
                                    slug: product.slug,
                                    category: product.category,
                                    qty: 1,
                                    image: product.images[0],
                                    price: product.price
                                }} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
