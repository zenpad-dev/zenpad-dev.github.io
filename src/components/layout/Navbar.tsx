import { motion } from "framer-motion";
import { Github, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navbar() {
    const location = useLocation();

    const links = [
        { name: "About", path: "/about" },
        { name: "Docs", path: "/docs" },
        { name: "Shortcuts", path: "/shortcuts" },
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-mono font-bold text-lg tracking-tight group-hover:text-primary transition-colors">Zenpad</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary relative",
                                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                    <div className="h-4 w-px bg-white/10" />
                    <a
                        href="https://github.com/jagdishtripathy/zenpad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
