import { motion } from "framer-motion";
import { Keyboard, Search, Command } from "lucide-react";
import { useState } from "react";

const allShortcuts = [
    // File Operations
    { key: "Ctrl + N", action: "New Tab", category: "File Operations" },
    { key: "Ctrl + Shift + N", action: "New Window", category: "File Operations" },
    { key: "Ctrl + O", action: "Open File", category: "File Operations" },
    { key: "Ctrl + S", action: "Save", category: "File Operations" },
    { key: "Ctrl + Shift + S", action: "Save As", category: "File Operations" },
    { key: "Ctrl + W", action: "Close Tab", category: "File Operations" },
    { key: "Ctrl + Shift + T", action: "Reopen Closed Tab", category: "File Operations" },
    { key: "Ctrl + Q", action: "Quit", category: "File Operations" },
    { key: "Ctrl + ,", action: "Preferences", category: "File Operations" },

    // Editing
    { key: "Ctrl + Z", action: "Undo", category: "Editing" },
    { key: "Ctrl + Y", action: "Redo", category: "Editing" },
    { key: "Ctrl + X", action: "Cut", category: "Editing" },
    { key: "Ctrl + C", action: "Copy", category: "Editing" },
    { key: "Ctrl + V", action: "Paste", category: "Editing" },
    { key: "Ctrl + A", action: "Select All", category: "Editing" },
    { key: "Ctrl + Shift + K", action: "Delete Line", category: "Editing" },
    { key: "Ctrl + D", action: "Duplicate Line", category: "Editing" },
    { key: "Ctrl + Up", action: "Move Line Up", category: "Editing" },
    { key: "Ctrl + Down", action: "Move Line Down", category: "Editing" },
    { key: "Ctrl + /", action: "Toggle Comment", category: "Editing" },
    { key: "Ctrl + I", action: "Indent", category: "Editing" },
    { key: "Ctrl + U", action: "Unindent", category: "Editing" },
    { key: "Ctrl + Shift + U", action: "To Uppercase", category: "Editing" },
    { key: "Ctrl + Shift + L", action: "To Lowercase", category: "Editing" },

    // Search & Navigation
    { key: "Ctrl + F", action: "Find", category: "Search & Navigation" },
    { key: "Ctrl + R", action: "Find & Replace", category: "Search & Navigation" },
    { key: "Ctrl + G", action: "Find Next", category: "Search & Navigation" },
    { key: "Ctrl + Shift + G", action: "Find Previous", category: "Search & Navigation" },
    { key: "Ctrl + L", action: "Go to Line", category: "Search & Navigation" },
    { key: "Ctrl + Page Down", action: "Next Tab", category: "Search & Navigation" },
    { key: "Ctrl + Page Up", action: "Previous Tab", category: "Search & Navigation" },

    // View
    { key: "Ctrl + +", action: "Zoom In", category: "View" },
    { key: "Ctrl + -", action: "Zoom Out", category: "View" },
    { key: "Ctrl + 0", action: "Reset Zoom", category: "View" },
    { key: "F11", action: "Fullscreen", category: "View" },
    { key: "Ctrl + M", action: "Toggle Menubar", category: "View" },
];

export function ShortcutsPage() {
    const [search, setSearch] = useState("");

    const filteredShortcuts = allShortcuts.filter(s =>
        s.action.toLowerCase().includes(search.toLowerCase()) ||
        s.key.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase())
    );

    const categories = Array.from(new Set(filteredShortcuts.map(s => s.category)));

    return (
        <div className="container mx-auto px-4 py-24 max-w-5xl text-center md:text-left">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
            >
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            Keyboard Shortcuts
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Master Zenpad with these essential bindings.
                        </p>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search shortcuts..."
                            className="w-full md:w-64 h-10 pl-10 pr-4 rounded-full bg-secondary/10 border border-border focus:border-primary/50 focus:bg-secondary/20 outline-none transition-all text-sm text-foreground"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {categories.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                        <Command className="w-12 h-12 mx-auto mb-4 text-foreground" />
                        <p className="text-muted-foreground">No shortcuts found matching "{search}"</p>
                    </div>
                ) : (
                    <div className="grid gap-12">
                        {categories.map((category) => (
                            <div key={category}>
                                <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider pl-1">{category}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredShortcuts.filter(s => s.category === category).map((shortcut) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            key={shortcut.key + shortcut.action}
                                            className="group p-4 rounded-xl border border-border bg-secondary/5 hover:border-primary/20 hover:bg-secondary/10 transition-all cursor-default relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative flex justify-between items-start">
                                                <span className="font-medium text-foreground/90 text-sm">{shortcut.action}</span>
                                                <Keyboard className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-50 transition-opacity" />
                                            </div>
                                            <div className="mt-4 flex gap-1 justify-end flex-wrap">
                                                {shortcut.key.split(' ').map((k, i) => (
                                                    <kbd key={i} className="px-2 py-1 min-w-[1.5rem] text-center rounded text-xs font-bold font-mono bg-background border-b-2 border-border text-primary whitespace-nowrap shadow-sm">
                                                        {k}
                                                    </kbd>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
