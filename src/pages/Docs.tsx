import { motion } from "framer-motion";
import {
    Terminal, BookOpen, Download, Settings, FileText,
    AlertTriangle, Github, Zap, Command, Moon, Cpu, ChevronDown
} from "lucide-react";
import { Link } from "react-scroll";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";

const sections = [
    { id: "overview", title: "Overview" },
    { id: "features", title: "Key Features" },
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage Basics" },
    { id: "configuration", title: "Configuration" },
    { id: "troubleshooting", title: "Troubleshooting" },
];

export function DocsPage() {
    // Mobile navigation state
    const [activeSection, setActiveSection] = useState("overview");

    // Scroll to section when selected from dropdown
    const handleMobileNavChange = (value: string) => {
        setActiveSection(value);
        const element = document.getElementById(value);
        if (element) {
            const offset = -100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition + offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                {/* Mobile Section Navigator */}
                <div className="lg:hidden sticky top-20 z-40 bg-background/95 backdrop-blur-xl border border-border rounded-xl p-2 mb-8">
                    <Select.Root value={activeSection} onValueChange={handleMobileNavChange}>
                        <Select.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-secondary/10 rounded-lg border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground">
                            <span className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-primary" />
                                <Select.Value placeholder="Jump to section..." />
                            </span>
                            <Select.Icon>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content className="overflow-hidden bg-background border border-border rounded-xl shadow-xl z-50 min-w-[var(--radix-select-trigger-width)]">
                                <Select.Viewport className="p-2">
                                    {sections.map((section) => (
                                        <Select.Item
                                            key={section.id}
                                            value={section.id}
                                            className="relative flex items-center px-4 py-3 text-sm text-muted-foreground hover:bg-secondary/20 hover:text-foreground rounded-lg cursor-pointer outline-none data-[state=checked]:text-primary data-[state=checked]:bg-primary/10"
                                        >
                                            <Select.ItemText>{section.title}</Select.ItemText>
                                        </Select.Item>
                                    ))}
                                </Select.Viewport>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                </div>

                {/* Desktop Sidebar Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:block space-y-8 sticky top-32 h-fit"
                >
                    <div className="flex items-center gap-2 text-primary mb-6">
                        <BookOpen className="w-5 h-5" />
                        <span className="font-bold tracking-tight">On this page</span>
                    </div>
                    <nav className="space-y-1 border-l border-border pl-4">
                        {sections.map((section) => (
                            <Link
                                key={section.id}
                                to={section.id}
                                smooth={true}
                                duration={500}
                                offset={-100}
                                className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer relative group"
                                activeClass="text-primary font-medium"
                                spy={true}
                                onSetActive={() => setActiveSection(section.id)}
                            >
                                <span className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                {section.title}
                            </Link>
                        ))}
                    </nav>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-3 space-y-24"
                >
                    {/* Header */}
                    <div className="border-b border-border pb-8">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 break-words text-foreground">
                            Documentation
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                            Zenpad is a distraction-free text editor for Linux. It helps you focus on writing code, not configuring plugins.
                        </p>
                    </div>

                    {/* Overview */}
                    <section id="overview" className="scroll-mt-32 space-y-6">
                        <h2 className="text-3xl font-bold mb-6 text-foreground">What is Zenpad?</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Zenpad is a native GTK application designed for developers who value speed and simplicity. It provides essential features like syntax highlighting and session management without the bloat of modern IDEs.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-border bg-secondary/10">
                                <h3 className="font-bold text-foreground mb-2">Build for Focus</h3>
                                <p className="text-sm text-muted-foreground">Minimal UI elements to keep your attention on the content.</p>
                            </div>
                            <div className="p-4 rounded-xl border border-border bg-secondary/10">
                                <h3 className="font-bold text-foreground mb-2">Linux Native</h3>
                                <p className="text-sm text-muted-foreground">Integrates seamlessly with GNOME and other GTK desktop environments.</p>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section id="features" className="scroll-mt-32 space-y-6">
                        <h2 className="text-3xl font-bold mb-6 text-foreground">Key Features</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <FeatureCard
                                icon={Command} color="text-blue-500" bg="bg-blue-500/10"
                                title="Keyboard First"
                                desc="Navigate files, switch tabs, and edit text without touching the mouse."
                                className="md:col-span-2"
                            />
                            <FeatureCard
                                icon={Moon} color="text-purple-500" bg="bg-purple-500/10"
                                title="Focus Mode"
                                desc="Toggle UI elements with a single keystroke (F11/Ctrl+M) for pure writing."
                            />
                            <FeatureCard
                                icon={Zap} color="text-yellow-600 dark:text-yellow-400" bg="bg-yellow-500/10"
                                title="Lightweight"
                                desc="Starts instantly (<50ms) and uses under 50MB of RAM. ideal for older machines."
                            />
                            <FeatureCard
                                icon={Cpu} color="text-emerald-500" bg="bg-emerald-500/10"
                                title="No Telemetry"
                                desc="Your code is your business. No tracking, no analytics, no cloud sync."
                                className="md:col-span-2"
                            />
                        </div>
                    </section>

                    {/* Installation */}
                    <section id="installation" className="scroll-mt-32 space-y-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <Download className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-foreground">Installation</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-foreground">Option 1: Debian / Ubuntu (Recommended)</h3>
                                <div className="p-6 rounded-2xl bg-secondary/20 dark:bg-black/40 border border-border font-mono text-sm space-y-4 overflow-x-auto">
                                    <div className="flex gap-4 text-muted-foreground border-b border-border pb-2 min-w-max">
                                        <Terminal className="w-4 h-4" />
                                        <span>Terminal</span>
                                    </div>
                                    <div className="min-w-max">
                                        <p className="text-muted-foreground mb-2"># 1. Download the latest .deb package</p>
                                        <p className="text-muted-foreground mb-2"># 2. Install via apt to handle dependencies:</p>
                                        <div className="flex gap-2 text-blue-600 dark:text-blue-300">
                                            <span className="select-none text-muted-foreground">$</span>
                                            sudo apt install ./zenpad_1.1.0_all.deb
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 text-foreground">Option 2: Build from Source</h3>
                                <div className="p-6 rounded-2xl bg-secondary/20 dark:bg-black/40 border border-border font-mono text-sm space-y-4 overflow-x-auto">
                                    <div className="min-w-max">
                                        <p className="text-muted-foreground mb-2"># Install dependencies</p>
                                        <div className="flex gap-2 text-amber-600 dark:text-amber-300">
                                            <span className="select-none text-muted-foreground">$</span>
                                            <span className="break-all">sudo apt install python3-gi gir1.2-gtksource-4</span>
                                        </div>
                                    </div>
                                    <div className="min-w-max">
                                        <p className="text-muted-foreground mb-2"># Run directly</p>
                                        <div className="flex gap-2 text-foreground dark:text-white">
                                            <span className="select-none text-muted-foreground">$</span>
                                            ./bin/zenpad
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Usage */}
                    <section id="usage" className="scroll-mt-32 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-foreground">Usage Basics</h2>
                        </div>

                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p className="text-lg">
                                Launch Zenpad from your application menu or terminal.
                            </p>
                            <div className="my-6 p-4 bg-secondary/20 dark:bg-white/5 rounded-lg border border-border inline-block font-mono text-foreground dark:text-white">
                                zenpad [filename]
                            </div>
                            <h3 className="text-foreground text-xl font-bold mt-8 mb-4">Quick Tips</h3>
                            <ul className="grid gap-4 list-none pl-0">
                                <li className="flex gap-3">
                                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold h-fit mt-1 shrink-0">NEW</span>
                                    <span>Press <strong>Ctrl+N</strong> to open a new tab. Tabs are persistent saving your session automatically.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold h-fit mt-1 shrink-0">FOCUS</span>
                                    <span>Press <strong>F11</strong> to toggle Fullscreen and <strong>Ctrl+M</strong> to hide the menubar for a pure coding experience.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Configuration */}
                    <section id="configuration" className="scroll-mt-32 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <Settings className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-foreground">Configuration</h2>
                        </div>
                        <p className="text-lg text-muted-foreground break-words">
                            Zenpad stores its configuration in <code className="text-primary">~/.config/zenpad/settings.json</code>.
                        </p>
                        <div className="p-6 rounded-2xl bg-secondary/20 dark:bg-[#0f0f0f] border border-border font-mono text-sm overflow-hidden relative overflow-x-auto">
                            <div className="absolute top-4 right-4 text-xs text-muted-foreground">settings.json</div>
                            <pre className="text-blue-600 dark:text-blue-300 min-w-max">
                                {`{
  "theme": "zen-dark",
  "font_family": "Monospace",
  "font_size": 12,
  "tab_width": 4,
  "auto_indent": true,
  "highlight_current_line": true,
  "show_line_numbers": true
}`}
                            </pre>
                        </div>
                    </section>

                    {/* Troubleshooting */}
                    <section id="troubleshooting" className="scroll-mt-32 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 dark:text-red-400">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-foreground">Troubleshooting</h2>
                        </div>

                        <div className="space-y-4">
                            <details className="group p-4 rounded-xl bg-secondary/10 dark:bg-white/5 border border-border open:bg-secondary/20 dark:open:bg-white/10 transition-colors cursor-pointer">
                                <summary className="font-bold flex items-center justify-between text-foreground">
                                    "ModuleNotFoundError: No module named 'gi'"
                                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground pl-4 border-l-2 border-primary">
                                    This means Python GObject bindings are missing. Run: <br />
                                    <code className="text-foreground dark:text-white mt-2 block break-all">sudo apt install python3-gi</code>
                                </p>
                            </details>

                            <details className="group p-4 rounded-xl bg-secondary/10 dark:bg-white/5 border border-border open:bg-secondary/20 dark:open:bg-white/10 transition-colors cursor-pointer">
                                <summary className="font-bold flex items-center justify-between text-foreground">
                                    Fonts look pixelated or wrong
                                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground pl-4 border-l-2 border-primary">
                                    Ensure you have a monospace font installed. You can change the "font_family" in your settings.json to "Hack", "Fira Code", or "JetBrains Mono".
                                </p>
                            </details>
                        </div>
                    </section>

                    {/* Support */}
                    <section className="pt-8 border-t border-border">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-foreground">Need more help?</h3>
                                <p className="text-muted-foreground">Check out the GitHub repository to report issues or contribute.</p>
                            </div>
                            <a
                                href="https://github.com/jagdishtripathy/zenpad"
                                target="_blank"
                                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform"
                            >
                                <Github className="w-5 h-5" />
                                Visit GitHub
                            </a>
                        </div>
                    </section>

                </motion.div>
            </div>
        </div>
    );
}

function FeatureCard({ icon: Icon, color, bg, title, desc, className = "" }: any) {
    return (
        <div className={`p-6 rounded-2xl border border-border bg-secondary/5 hover:bg-secondary/10 transition-colors group ${className}`}>
            <div className={`w-fit p-3 rounded-xl ${bg} ${color} mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
        </div>
    )
}
