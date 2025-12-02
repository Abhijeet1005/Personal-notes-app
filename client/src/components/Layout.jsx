import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-muted/20">
            <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between">
                    <div className="mr-4 flex">
                        <a className="mr-6 flex items-center space-x-2" href="/">
                            <span className="hidden font-bold sm:inline-block">Expandable Tasks</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground mr-2">
                            {user?.username}
                        </span>
                        <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>
            <main className="container py-6">
                {children}
            </main>
        </div>
    );
};

export default Layout;
