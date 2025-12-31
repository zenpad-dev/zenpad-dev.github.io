import { Github, FileText, Terminal, Heart, Keyboard, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="border-t border-border bg-gradient-to-b from-background to-muted/20 mt-20">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-1 space-y-4">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-mono font-bold text-lg tracking-tight group-hover:text-primary transition-colors">
                                Zenpad
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            A distraction-free, keyboard-first text editor built natively for Linux. Fast, minimal, and open source.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href="https://github.com/jagdishtripathy/zenpad"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
                                aria-label="View Zenpad on GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
                        <nav className="flex flex-col gap-3">
                            <Link to="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                <Terminal className="w-3.5 h-3.5" />
                                Documentation
                            </Link>
                            <Link to="/shortcuts" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                <Keyboard className="w-3.5 h-3.5" />
                                Keyboard Shortcuts
                            </Link>
                            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                <Heart className="w-3.5 h-3.5" />
                                About Project
                            </Link>
                        </nav>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">Resources</h3>
                        <nav className="flex flex-col gap-3">
                            <a
                                href="https://github.com/jagdishtripathy/zenpad/releases"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Releases
                            </a>
                            <a
                                href="https://github.com/jagdishtripathy/zenpad/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Report Issues
                            </a>
                            <a
                                href="https://github.com/jagdishtripathy/zenpad"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                            >
                                <Github className="w-3.5 h-3.5" />
                                Source Code
                            </a>
                        </nav>
                    </div>

                    {/* Support Project */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">Support the Project</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Zenpad is free and open source. Star us on GitHub or contribute to help make it better!
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground/60">
                        © {new Date().getFullYear()} Zenpad. Released under GPL 2.0 License.
                    </p>
                    <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Linux users
                    </p>
                </div>
            </div>
        </footer>
    );
}
