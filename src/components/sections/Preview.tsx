import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FilePlus, FolderOpen, Download, Undo, Redo,
    Scissors, Copy, Clipboard, Search, X, Minus, Square
} from "lucide-react";

type Snippet = {
    lang: string;
    file: string;
    cmd: string;
    code: string[];
    color: string; // Tab accent color
};

const snippets: Snippet[] = [
    {
        lang: "Python",
        file: "script.py",
        cmd: "zenpad script.py",
        code: [
            "import sys",
            "",
            "def main():",
            "    print('Zenpad is fast')",
            "    return 0"
        ],
        color: "bg-blue-500"
    },
    {
        lang: "Go",
        file: "main.go",
        cmd: "zenpad main.go",
        code: [
            "package main",
            "import \"fmt\"",
            "",
            "func main() {",
            "    fmt.Println(\"Simplicity\")",
            "}"
        ],
        color: "bg-cyan-500"
    },
    {
        lang: "Rust",
        file: "main.rs",
        cmd: "zenpad main.rs",
        code: [
            "fn main() {",
            "    println!(\"Memory Safe\");",
            "    let x = \"Blazingly Fast\";",
            "}"
        ],
        color: "bg-orange-500"
    },
    {
        lang: "C",
        file: "main.c",
        cmd: "zenpad main.c",
        code: [
            "#include <stdio.h>",
            "",
            "int main() {",
            "    printf(\"Native Power\\n\");",
            "    return 0;",
            "}"
        ],
        color: "bg-slate-500"
    },
    {
        lang: "C++",
        file: "game.cpp",
        cmd: "zenpad game.cpp",
        code: [
            "#include <iostream>",
            "using namespace std;",
            "",
            "int main() {",
            "    cout << \"No Bloat\" << endl;",
            "    return 0;",
            "}"
        ],
        color: "bg-blue-600"
    },
    {
        lang: "Java",
        file: "Main.java",
        cmd: "zenpad Main.java",
        code: [
            "public class Main {",
            "    public static void main(String[] args) {",
            "        System.out.println(\"Robust\");",
            "    }",
            "}"
        ],
        color: "bg-red-500"
    },
    {
        lang: "JavaScript",
        file: "app.js",
        cmd: "zenpad app.js",
        code: [
            "const zenpad = require('zenpad');",
            "",
            "console.log('Versatile');",
            "const features = ['Fast', 'Minimal'];"
        ],
        color: "bg-yellow-400"
    },
    {
        lang: "Ruby",
        file: "script.rb",
        cmd: "zenpad script.rb",
        code: [
            "puts 'Elegant Syntax'",
            "zenpad_is_great = true",
            "if zenpad_is_great",
            "  puts 'Enjoy Coding'",
            "end"
        ],
        color: "bg-red-600"
    },
    {
        lang: "PHP",
        file: "index.php",
        cmd: "zenpad index.php",
        code: [
            "<?php",
            "echo 'Hello World';",
            "$zenpad = true;",
            "if ($zenpad) {",
            "    echo 'Productivity';",
            "}"
        ],
        color: "bg-indigo-500"
    }
];

export function Preview() {
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [phase, setPhase] = useState<"terminal" | "editor" | "reset">("terminal");
    const [typedText, setTypedText] = useState("");
    const [editorLines, setEditorLines] = useState<string[]>([]);
    const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

    const current = snippets[snippetIndex];

    // Stage 1: Terminal Typing
    useEffect(() => {
        if (phase === "terminal") {
            setTypedText("");
            let i = 0;
            const interval = setInterval(() => {
                setTypedText(current.cmd.slice(0, i + 1));
                i++;
                if (i > current.cmd.length + 5) {
                    clearInterval(interval);
                    setPhase("editor");
                }
            }, 80);
            return () => clearInterval(interval);
        }
    }, [phase, snippetIndex]);

    // Stage 2: Editor Typing
    useEffect(() => {
        if (phase === "editor") {
            let lineIndex = 0;
            let charIndex = 0;
            setEditorLines([""]);
            setCursorPos({ line: 1, col: 1 });

            const interval = setInterval(() => {
                if (lineIndex >= current.code.length) {
                    clearInterval(interval);
                    // Wait then cycle
                    setTimeout(() => {
                        setPhase("reset");
                        setTimeout(() => {
                            setSnippetIndex(prev => (prev + 1) % snippets.length);
                            setPhase("terminal");
                        }, 500); // Fade out time
                    }, 2000); // Read time
                    return;
                }

                const currentLineTarget = current.code[lineIndex];

                if (charIndex <= currentLineTarget.length) {
                    setEditorLines(prev => {
                        const newLines = [...prev];
                        newLines[lineIndex] = currentLineTarget.slice(0, charIndex);
                        return newLines;
                    });
                    setCursorPos({
                        line: lineIndex + 1,
                        col: charIndex + 1
                    });
                    charIndex++;
                } else {
                    lineIndex++;
                    charIndex = 0;
                    if (lineIndex < current.code.length) {
                        setEditorLines(prev => [...prev, ""]);
                        setCursorPos({ line: lineIndex + 1, col: 1 });
                    }
                }
            }, 40);

            return () => clearInterval(interval);
        }
    }, [phase, snippetIndex]);

    // Enhanced Syntax Highlighting
    const highlightCode = (line: string) => {
        // Regex for various languages
        const keywords = /\b(def|return|import|int|void|if|else|echo|using|namespace|class|public|private|function|include|printf|cout|endl|package|func|fmt|fn|let|println|const|require|puts|end|console|var)\b/g;
        const strings = /(".*?"|'.*?')/g;
        const numbers = /\b\d+\b/g;
        const comments = /(\/\/.*|#.*)/g; // Basic comments
        const directives = /(#include|#define|using namespace)/g;

        // We split by all these tokens to isolate them
        const tokens = line.split(/(".*?"|'.*?'|\/\/.*|#.*|<\?php|\?>|\b(?:\d+|def|return|import|int|void|if|else|echo|using|namespace|class|public|private|function|include|printf|cout|endl|package|func|fmt|fn|let|println|const|require|puts|end|console|var)\b)/g);

        return tokens.map((part, i) => {
            if (!part) return null;

            if (part.match(strings)) return <span key={i} className="text-green-600">{part}</span>;
            if (part.match(comments)) return <span key={i} className="text-gray-400 italic">{part}</span>;
            if (part.trim() === "<?php" || part.trim() === "?>") return <span key={i} className="text-red-500 font-bold">{part}</span>;
            if (part.match(directives)) return <span key={i} className="text-purple-600 font-bold">{part}</span>;
            if (part.match(keywords)) return <span key={i} className="text-purple-600 font-bold">{part}</span>;
            if (part.match(numbers)) return <span key={i} className="text-blue-500">{part}</span>;
            if (part.startsWith("$")) return <span key={i} className="text-blue-600">{part}</span>;

            return <span key={i} className="text-[#2e3436]">{part}</span>;
        });
    };

    return (
        <section className="py-24 overflow-hidden relative min-h-[600px] flex items-center justify-center">

            <div className="container mx-auto px-4 bg-transparent z-10 w-full max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        From Terminal to <span className="text-primary">Flow</span>
                    </h2>
                </div>

                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                    className="w-full flex justify-center"
                >
                    <motion.div
                        layout
                        initial={{ width: "min(600px, 90vw)", height: 400, borderRadius: 12 }}
                        animate={{
                            width: phase === "editor" ? "100%" : "min(600px, 90vw)",
                            height: phase === "editor" ? 500 : 350,
                            backgroundColor: phase === "editor" ? "#fbfbfb" : "#0f0f0f",
                            borderColor: phase === "editor" ? "#d4d4d4" : "rgba(255,255,255,0.1)"
                        }}
                        transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                        className="rounded-xl overflow-hidden flex flex-col relative shadow-2xl"
                    >
                        <AnimatePresence mode="wait">
                            {phase === "terminal" ? (
                                <motion.div
                                    key="terminal-content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col h-full bg-black/90"
                                >
                                    {/* Terminal Title Bar */}
                                    <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <div className="ml-4 text-xs font-mono text-muted-foreground/50">
                                            bash
                                        </div>
                                    </div>

                                    {/* Terminal Body */}
                                    <div className="p-6 font-mono text-sm md:text-base flex-1">
                                        <div className="text-green-500">
                                            <span className="text-blue-400">user@linux:~$</span> {typedText}
                                            <motion.span
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                                className="inline-block w-2.5 h-5 bg-green-500 align-middle ml-1"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : phase === "editor" ? (
                                <motion.div
                                    key="editor-content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col h-full font-sans text-sm text-[#2e3436] bg-[#f2f2f2]"
                                >
                                    {/* GTK Header Bar */}
                                    <div className="h-10 bg-[#e8e8e7] border-b border-[#dadada] flex items-center justify-between px-4 select-none">
                                        <div className="w-16" /> {/* Spacer for centering */}
                                        <span className="font-bold text-[#2e3436] drop-shadow-sm">Zenpad</span>
                                        <div className="flex gap-4 text-[#5e5c64]">
                                            <Minus className="w-3 h-3" />
                                            <Square className="w-3 h-3" />
                                            <X className="w-3 h-3" />
                                        </div>
                                    </div>

                                    {/* Menu Bar */}
                                    <div className="h-7 bg-[#f6f5f4] border-b border-[#dadada] flex items-center px-2 gap-4 text-xs text-[#2e3436]">
                                        <span className="cursor-pointer hover:bg-black/5 px-2 py-1 rounded">File</span>
                                        <span className="cursor-pointer hover:bg-black/5 px-2 py-1 rounded">Edit</span>
                                        <span className="cursor-pointer hover:bg-black/5 px-2 py-1 rounded">Search</span>
                                        <span className="cursor-pointer hover:bg-black/5 px-2 py-1 rounded">View</span>
                                        <span className="cursor-pointer hover:bg-black/5 px-2 py-1 rounded">Document</span>
                                        <span className="cursor-pointer hover:bg-black/5 px-2 py-1 rounded">Help</span>
                                    </div>

                                    {/* Toolbar */}
                                    <div className="h-10 bg-[#f6f5f4] border-b border-[#dadada] flex items-center px-2 gap-1 text-[#5e5c64]">
                                        <button className="p-1.5 hover:bg-black/5 rounded"><FilePlus className="w-4 h-4" /></button>
                                        <button className="p-1.5 hover:bg-black/5 rounded"><FolderOpen className="w-4 h-4" /></button>
                                        <button className="p-1.5 hover:bg-black/5 rounded"><Download className="w-4 h-4" /></button>
                                        <div className="w-px h-5 bg-[#dadada] mx-1" />
                                        <button className="p-1.5 hover:bg-black/5 rounded"><Undo className="w-4 h-4" /></button>
                                        <button className="p-1.5 hover:bg-black/5 rounded"><Redo className="w-4 h-4" /></button>
                                        <div className="w-px h-5 bg-[#dadada] mx-1" />
                                        <button className="p-1.5 hover:bg-black/5 rounded"><Scissors className="w-4 h-4" /></button>
                                        <button className="p-1.5 hover:bg-black/5 rounded"><Copy className="w-4 h-4" /></button>
                                        <button className="p-1.5 hover:bg-black/5 rounded"><Clipboard className="w-4 h-4" /></button>
                                        <div className="w-px h-5 bg-[#dadada] mx-1" />
                                        <button className="p-1.5 hover:bg-black/5 rounded"><Search className="w-4 h-4" /></button>
                                    </div>

                                    {/* Tabs */}
                                    <div className="h-8 bg-[#e1e1e1] flex items-end px-1 gap-1 border-b border-[#dadada]">
                                        <div className="bg-[#ffffff] px-3 py-1.5 rounded-t-md text-xs font-medium flex items-center gap-2 border-l border-r border-t border-[#cecece] relative top-px">
                                            <span>{current.file}</span>
                                            <X className="w-3 h-3 hover:bg-black/10 rounded-full p-0.5 cursor-pointer" />
                                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${current.color}`} />
                                        </div>
                                        <div className="px-3 py-1.5 text-xs font-medium text-[#5e5c64] hover:bg-[#eaeaea] rounded-t-md cursor-pointer flex items-center gap-2">
                                            <X className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                        </div>
                                    </div>

                                    {/* Main Editor Area */}
                                    <div className="flex-1 flex bg-white overflow-hidden">
                                        {/* Line Numbers */}
                                        <div className="w-10 bg-[#f3f3f3] border-r border-[#efefef] flex flex-col items-end pr-2 pt-2 text-[#b0b0b0] font-mono text-xs select-none">
                                            {editorLines.length > 0 ? editorLines.map((_, i) => (
                                                <div key={i} className="leading-6">{i + 1}</div>
                                            )) : <div className="leading-6">1</div>}
                                        </div>

                                        {/* Code Content */}
                                        <div className="flex-1 p-2 font-mono text-sm overflow-auto text-left">
                                            {editorLines.map((line, i) => (
                                                <div key={i} className="leading-6 whitespace-pre relative">
                                                    {highlightCode(line)}
                                                    {i === editorLines.length - 1 && (
                                                        <motion.span
                                                            animate={{ opacity: [1, 0] }}
                                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                                            className="absolute inline-block w-0.5 h-4 bg-black align-middle ml-0.5 top-1"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Status Bar */}
                                    <div className="h-6 bg-[#f6f5f4] border-t border-[#dadada] flex items-center px-4 text-[11px] text-[#5e5c64] justify-between">
                                        <span>{current.lang}</span>
                                        <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
                                    </div>

                                </motion.div>
                            ) : (
                                // Reset state (Empty container while switching)
                                <motion.div
                                    key="reset-content"
                                    className="w-full h-full bg-black/90"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
