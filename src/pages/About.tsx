import { motion } from "framer-motion";
import { Heart, Terminal, Zap, Globe, MessageSquare } from "lucide-react";

export function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-20"
            >
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                        Why Zenpad?
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        In a world of electron-bloat and 500MB text editors, we wanted something that just writes.
                    </p>
                </div>

                {/* Philosophy Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                        <div className="p-3 bg-blue-500/10 w-fit rounded-xl text-blue-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Speed First</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Native GTK architecture means Zenpad starts instantly and uses minimal RAM. No loading spinners, ever.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                        <div className="p-3 bg-purple-500/10 w-fit rounded-xl text-purple-400">
                            <Terminal className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Keyboard Centric</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Your hands should never leave the home row. Every action consists of a meaningful shortcut.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                        <div className="p-3 bg-pink-500/10 w-fit rounded-xl text-pink-400">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Calm Design</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            No notifications, no social integration, no AI assistant popping up. Just you and your code.
                        </p>
                    </div>
                </div>

                {/* Mission / Content */}
                <div className="space-y-12">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold">The Problem</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Modern development tools have become operating systems in themselves. They are powerful, yes, but often overwhelming. When you just need to edit a config file, write a quick script, or take notes, waiting 10 seconds for an IDE to load feels like an eternity.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Zenpad fills the gap between <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">nano</code> and <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">VS Code</code>. It brings the GUI comforts—tabs, scrolling, mouse support—without the weight.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold">Who is this for?</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Linux System Administrators",
                                "Minimalist Developers",
                                "Students learning Python/C",
                                "Distraction-free Writers"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Globe className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-bold">Open & Transparent</h2>
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Zenpad is Open Source (GPLv2). We believe tools should be owned by their users.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-green-400 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                No Telemetry / Tracking
                            </div>
                            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-400 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                100% Free & Open Source
                            </div>
                        </div>
                    </section>

                    {/* Author Note */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden">
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2 text-primary uppercase tracking-widest text-sm font-bold">
                                <MessageSquare className="w-4 h-4" />
                                Maintainer Note
                            </div>
                            <p className="text-lg italic text-muted-foreground font-serif leading-relaxed">
                                "I built Zenpad because I missed the days when software was small, fast, and did exactly one thing well. It's a labor of love, and I hope it helps you find your flow state."
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <a href="https://github.com/jagdishtripathy" target="_blank" className="text-sm font-medium hover:text-primary transition-colors">
                                    @jagdishtripathy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
