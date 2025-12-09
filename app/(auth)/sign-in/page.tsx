'use client';

import { useActionState } from 'react'; // Updated import for React 19 check compatibility or use useFormState
import { authenticate } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
// Note: In React 19, useActionState is replacing useFormState.
// If using older React/Next.js versions, might need useFormState from react-dom

export default function SignInPage() {
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign In</h1>
                <p className="text-gray-500">Enter your email below to login to your account</p>
            </div>
            <form action={dispatch} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                </div>
            </form>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline">
                    Sign up
                </Link>
            </div>
        </div>
    );
}
