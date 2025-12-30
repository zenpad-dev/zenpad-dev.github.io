import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { useEffect } from "react";

interface DownloadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DownloadDialog({ open, onOpenChange }: DownloadDialogProps) {

    // Auto-close after 3.5 seconds
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onOpenChange(false);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [open, onOpenChange]);

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        {/* Backdrop */}
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            />
                        </Dialog.Overlay>

                        {/* Content */}
                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%", marginTop: 20 }}
                                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", marginTop: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%", marginTop: 20 }}
                                transition={{ type: "spring", duration: 0.9, bounce: 0.3 }}
                                className="fixed left-1/2 top-1/2 w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-50 p-8 focus:outline-none overflow-hidden"
                            >
                                {/* Decorative Glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-primary/20 blur-[50px] -z-10 rounded-full" />

                                <div className="flex flex-col items-center text-center space-y-6">
                                    {/* Icon */}
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                        <Terminal className="w-8 h-8" />
                                    </div>

                                    <div>
                                        <Dialog.Title className="text-2xl font-bold mb-2 text-white">
                                            Download Started
                                        </Dialog.Title>
                                        <Dialog.Description className="text-muted-foreground leading-relaxed">
                                            Thanks for downloading Zenpad! <br /> Your .deb file is on its way.
                                        </Dialog.Description>
                                    </div>

                                    {/* Progress indicator */}
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 3.5, ease: "linear" }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}
