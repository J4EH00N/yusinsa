import ProductList from '@/components/ui/shared/product/product-list'
import { getAllProducts } from '@/lib/actions/product.actions'

export default async function Home() {
  const latestProducts = await getAllProducts()
  return (
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>
      <ProductList data={latestProducts} />
    </div>
  )
}
