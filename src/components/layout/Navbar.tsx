import { motion, AnimatePresence } from "framer-motion";
import { Github, FileText, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

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
            <div className="container mx-auto px-4 h-16 flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 group mr-4" onClick={() => setIsOpen(false)}>
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-mono font-bold text-lg tracking-tight group-hover:text-primary transition-colors">Zenpad</span>
                </Link>

                {/* Desktop Navigation - Left Aligned */}
                <div className="hidden md:flex items-center gap-6">
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
                </div>

                <div className="ml-auto hidden md:flex items-center gap-4">
                    <a
                        href="https://github.com/jagdishtripathy/zenpad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <div className="h-4 w-px bg-border" />
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Toggle (Right Aligned) */}
                <button
                    className="md:hidden ml-auto p-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-white/5 bg-background/95 backdrop-blur-xl overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-base font-medium py-2 transition-colors hover:text-primary block",
                                        location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            <a
                                href="https://github.com/jagdishtripathy/zenpad"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                            >
                                <Github className="w-4 h-4" />
                                <span>GitHub</span>
                            </a>
                            <div className="flex items-center justify-between py-2 text-sm font-medium text-muted-foreground">
                                <span>Theme</span>
                                <ThemeToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
