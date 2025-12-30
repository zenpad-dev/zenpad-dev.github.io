import { motion } from "framer-motion";
import { Home, FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-8 max-w-md"
            >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mx-auto">
                    <FileQuestion className="w-12 h-12" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-foreground">404</h1>
                    <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The page you're looking for doesn't exist or has been moved. 
                        Let's get you back on track.
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
}
