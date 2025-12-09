'use client';

import { Button } from '@/components/ui/button';
import { addToCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';
import { Plus } from 'lucide-react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast'; // Assuming we have shadcn toast or simple alert for now

export default function AddToCart({ item }: { item: CartItem }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = () => {
        startTransition(async () => {
            await addToCart(item);
            // Optional: Show toast
            router.refresh();
        });
    }

    return (
        <Button className="w-full" type="button" onClick={handleAddToCart} disabled={isPending}>
            {isPending ? (
                'Adding...'
            ) : (
                <>
                    <Plus className="mr-2 h-4 w-4" /> Add to Cart
                </>
            )}
        </Button>
    )
}
