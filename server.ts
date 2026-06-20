import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const NODE_IDS = [
  "meaning-of-n",
  "vladimir-fock-legacy",
  "abstract-number-states",
  "operator-algebra",
  "hilbert-mapping",
  "photon-statistics",
  "wigner-negativity",
  "boson-sampling",
  "schrodinger-evolution",
  "hamiltonian-drift",
  "phase-localization",
  "entropy-analysis",
  "cavity-qed",
  "superconducting-modes",
  "ion-trap",
  "photonics",
  "registry-data",
  "buy-domain",
  "whois",
  "dns"
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Serve Dynamic XML Sitemap directly to search engine crawlers (Google Search Console compatible)
  app.get("/sitemap.xml", (req, res) => {
    const host = req.get('host') || "www.fockstate.com";
    const isLocal = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("3000") || host.includes("run.app");
    const protocol = isLocal ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const mainPages = [
      { path: "", freq: "daily", priority: "1.0" },
      { path: "about", freq: "weekly", priority: "0.8" },
      { path: "portfolio", freq: "daily", priority: "0.9" },
      { path: "archive", freq: "weekly", priority: "0.7" },
      { path: "sitemap", freq: "weekly", priority: "0.7" },
      { path: "feelize", freq: "monthly", priority: "0.5" }
    ];

    mainPages.forEach(p => {
      xml += `  <url>\n    <loc>${baseUrl}/${p.path}</loc>\n    <lastmod>2026-06-15</lastmod>\n    <changefreq>${p.freq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    });

    NODE_IDS.forEach(id => {
      xml += `  <url>\n    <loc>${baseUrl}/nodes/${id}</loc>\n    <lastmod>2026-06-15</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // Serve JSON equivalent Sitemap
  app.get("/sitemap.json", (req, res) => {
    const host = req.get('host') || "www.fockstate.com";
    const isLocal = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("3000") || host.includes("run.app");
    const protocol = isLocal ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const data = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "FockState.com Dynamic Sitemap Graph",
      "publisher": "FockState.com",
      "generated": new Date().toISOString(),
      "endpoints": [
        { "url": `${baseUrl}/`, "name": "Principal Portal", "priority": 1.0, "changefreq": "daily" },
        { "url": `${baseUrl}/about`, "name": "Sarah Fock - Systems Engineer Profile", "priority": 0.8, "changefreq": "weekly" },
        { "url": `${baseUrl}/portfolio`, "name": "Premium Domains Portfolio", "priority": 0.9, "changefreq": "daily" },
        { "url": `${baseUrl}/archive`, "name": "Quantum Research Archive Nodes", "priority": 0.7, "changefreq": "weekly" },
        { "url": `${baseUrl}/sitemap`, "name": "Sitemap Directory", "priority": 0.7, "changefreq": "weekly" },
        { "url": `${baseUrl}/feelize`, "name": "Websites Built by Feelize", "priority": 0.5, "changefreq": "monthly" }
      ],
      "dynamic_resource_nodes": NODE_IDS.map(id => ({
        "url": `${baseUrl}/nodes/${id}`,
        "priority": 0.6
      }))
    };

    res.json(data);
  });

  // Serve Text-only Sitemap listing
  app.get("/sitemap.txt", (req, res) => {
    const host = req.get('host') || "www.fockstate.com";
    const isLocal = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("3000") || host.includes("run.app");
    const protocol = isLocal ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    let txt = `${baseUrl}/\n`;
    txt += `${baseUrl}/about\n`;
    txt += `${baseUrl}/portfolio\n`;
    txt += `${baseUrl}/archive\n`;
    txt += `${baseUrl}/sitemap\n`;
    txt += `${baseUrl}/feelize\n`;

    NODE_IDS.forEach(id => {
      txt += `${baseUrl}/nodes/${id}\n`;
    });

    res.header("Content-Type", "text/plain");
    res.send(txt.trim());
  });

  // Serve Robots.txt pointing Google immediately to the dynamic sitemap
  app.get("/robots.txt", (req, res) => {
    const host = req.get('host') || "www.fockstate.com";
    const isLocal = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("3000") || host.includes("run.app");
    const protocol = isLocal ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    let text = `User-agent: *\n`;
    text += `Allow: /\n\n`;
    text += `Sitemap: ${baseUrl}/sitemap.xml\n`;

    res.header("Content-Type", "text/plain");
    res.send(text);
  });

  // Integrate Vite Dev Server middleware in non-production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static build
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support client-side routing fallback for direct URL entries
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[fockstate] Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start fockstate full-stack node server:", err);
});
