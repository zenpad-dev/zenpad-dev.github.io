import { motion } from "framer-motion";
import { ArrowRight, Terminal, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLatestRelease } from "@/hooks/useLatestRelease";
import { useState } from "react";
import { DownloadDialog } from "@/components/ui/DownloadDialog";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
    const { release, loading, error } = useLatestRelease();
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    const handleDownload = () => {
        if (release?.downloadUrl) {
            window.location.href = release.downloadUrl;
        }
        setShowDownloadModal(true);
    };

    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-20 lg:py-0">
            <DownloadDialog
                open={showDownloadModal}
                onOpenChange={setShowDownloadModal}
            />

            {/* Vibrant Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen animate-pulse" />
            <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 flex flex-col items-center text-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-8 text-primary shadow-lg shadow-primary/10 backdrop-blur-md"
                >
                    <span className={`flex h-2 w-2 rounded-full ${error ? 'bg-amber-500' : 'bg-primary'} animate-ping`} />
                    <span className="font-bold">
                        {loading ? "Checking latest..." : error ? "Latest Release" : `${release?.version || "v1.0.0"} Now Available`}
                    </span>
                    <span className="text-muted-foreground mr-1">Linux Dedicated</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative z-10 text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-black/80 via-black to-black/40 dark:from-white dark:via-white dark:to-white/50 bg-clip-text text-transparent drop-shadow-2xl py-2" // Added py-2 to prevent vertical slip
                >
                    Code with <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto] pr-2"> {/* Added pr-2 */}
                        Pure Focus
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mb-12 leading-relaxed"
                >
                    Zenpad is a high-performance, keyboard-first editor designed exclusively for Linux.
                    Experience a distraction-free environment built for speed.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <MagneticButton
                        onClick={handleDownload}
                        className="h-16 px-10 rounded-full bg-primary text-white font-bold tracking-wide flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed border border-black/10 dark:border-white/10"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Terminal className="w-5 h-5" />
                        )}
                        {loading ? "Fetching Latest..." : "Download .deb"}
                    </MagneticButton>

                    <Link to="/docs">
                        <MagneticButton className="h-16 px-10 rounded-full border border-black/10 dark:border-white/10 bg-secondary/10 dark:bg-white/5 hover:bg-secondary/20 dark:hover:bg-white/10 text-foreground font-medium flex items-center gap-2 transition-all backdrop-blur-sm">
                            Read Docs
                            <ArrowRight className="w-4 h-4" />
                        </MagneticButton>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 flex flex-col items-center gap-2"
                >
                    <p className="text-xs text-muted-foreground/60">
                        macOS and Windows support coming in future updates.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
