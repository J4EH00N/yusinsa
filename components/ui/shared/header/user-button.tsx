import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react'; // Ensure lucide-react is installed or use appropriate icons
import Link from 'next/link';
import { signOut } from '@/auth';

export default async function UserButton() {
    const session = await auth();

    if (!session) {
        return (
            <Button asChild>
                <Link href="/sign-in">
                    <User className="mr-2 h-4 w-4" /> Sign In
                </Link>
            </Button>
        );
    }

    return (
        <div className="flex gap-2 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{session.user?.name?.slice(0, 1).toUpperCase()}</p>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <form action={async () => {
                            'use server';
                            await signOut();
                        }} className="w-full">
                            <Button variant="ghost" className="w-full justify-start h-4 p-0">
                                <LogOut className="mr-2 h-4 w-4" /> Log out
                            </Button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
