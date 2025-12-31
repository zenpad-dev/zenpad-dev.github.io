import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { HomePage } from "@/pages/Home";
import { DocsPage } from "@/pages/Docs";
import { AboutPage } from "@/pages/About";
import { ShortcutsPage } from "@/pages/Shortcuts";
import { NotFoundPage } from "@/pages/NotFound";

import { ThemeProvider } from "@/components/theme-provider";
import { ReactLenis } from "lenis/react";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="zenpad-theme">
      <ReactLenis root>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/shortcuts" element={<ShortcutsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </ReactLenis>
    </ThemeProvider>
  );
}

export default App;
