import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { HomePage } from "@/pages/Home";
import { DocsPage } from "@/pages/Docs";
import { ShortcutsPage } from "@/pages/Shortcuts";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/shortcuts" element={<ShortcutsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
