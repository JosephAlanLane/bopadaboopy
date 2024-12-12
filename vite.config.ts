import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Using process.env for build time
    'import.meta.env.VITE_SUPABASE_URL': `"${process.env.VITE_SUPABASE_URL}"`,
    'import.meta.env.VITE_SUPABASE_ANON_KEY': `"${process.env.VITE_SUPABASE_ANON_KEY}"`,
  }
}));
