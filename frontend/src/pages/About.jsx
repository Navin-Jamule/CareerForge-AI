import React from "react";
import { motion } from "framer-motion";
import {
  Network,
  Server,
  Search,
  FileText,
  Cpu,
  Code2
} from "lucide-react";

/*
  About Page: Uses a "Bento Grid" layout to showcase features
  and the technical architecture (LangGraph + FastAPI).
*/

const features = [
  {
    icon: <Network size={32} color="#00e5ff" />,
    title: "Multi-Agent Orchestration",
    description: "Built on LangGraph. A smart 'Categorizer' agent analyzes your intent and routes queries to specialized sub-agents for Resumes, Interviews, or Learning.",
    colSpan: 2, // Spans 2 columns
  },
  {
    icon: <Server size={32} color="#4facfe" />,
    title: "FastAPI Backend",
    description: "High-performance, stateless Python architecture ensuring rapid responses and robust error handling.",
    colSpan: 1,
  },
  {
    icon: <Search size={32} color="#ff00e5" />,
    title: "Live Job Intelligence",
    description: "Unlike static AI, we integrate Google Search tools to fetch real-time job listings from the last 7-14 days.",
    colSpan: 1,
  },
  {
    icon: <FileText size={32} color="#00ff9d" />,
    title: "Markdown Resumes",
    description: "Generates ATS-friendly, clean Markdown resumes instantly, ready for export and customization.",
    colSpan: 1,
  },
  {
    icon: <Cpu size={32} color="#ffd700" />,
    title: "Intelligent Routing",
    description: "No manual selection needed. The AI detects if you need a mock interview or a tutorial automatically.",
    colSpan: 1,
  },
];

function About() {
  return (
    <div style={styles.pageContainer}>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "60px" }}
      >
        <h1 className="text-gradient" style={{ fontSize: "3rem", marginBottom: "16px" }}>
          Under the Hood
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#94a3b8", maxWidth: "600px", margin: "0 auto" }}>
          CareerForge AI combines the power of <strong>LangChain</strong>, <strong>LangGraph</strong>, and <strong>FastAPI</strong> to deliver accurate, context-aware career guidance.
        </p>
      </motion.div>

      {/* Bento Grid Layout */}
      <div style={styles.grid}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            style={{
              ...styles.card,
              gridColumn: window.innerWidth > 768 ? `span ${feature.colSpan}` : "span 1",
            }}
          >
            <div style={styles.iconWrapper}>{feature.icon}</div>
            <h3 style={styles.cardTitle}>{feature.title}</h3>
            <p style={styles.cardDesc}>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Architecture Flow Section (Visualizing the Diagram) */}
      <motion.div
        className="glass-panel"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: "40px", padding: "40px", textAlign: "center" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <Code2 size={24} color="#666" />
          <span style={styles.flowText}>User Query</span>
          <span style={styles.arrow}>→</span>

          <span style={{...styles.badge, borderColor: "#00e5ff", color: "#00e5ff"}}>FastAPI Gateway</span>
          <span style={styles.arrow}>→</span>

          <span style={{...styles.badge, borderColor: "#7000ff", color: "#a855f7"}}>LangGraph Router</span>
          <span style={styles.arrow}>→</span>

          <div style={{ display: "flex", gap: "10px" }}>
            <span style={styles.miniBadge}>Resume Agent</span>
            <span style={styles.miniBadge}>Interview Agent</span>
            <span style={styles.miniBadge}>Search Tool</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

// Inline Styles for Grid
const styles = {
  pageContainer: {
    maxWidth: "1100px",
    margin: "120px auto 60px", // Top margin clears fixed navbar
    padding: "0 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 Columns on desktop
    gap: "24px",
  },
  card: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    transition: "transform 0.3s ease",
  },
  iconWrapper: {
    marginBottom: "20px",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#fff",
  },
  cardDesc: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    color: "#b0c7ff",
  },
  flowText: {
    fontWeight: "600",
    color: "#fff"
  },
  arrow: {
    color: "#555",
    fontSize: "1.2rem",
    margin: "0 10px"
  },
  badge: {
    padding: "8px 16px",
    border: "1px solid",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "0.9rem",
    background: "rgba(255,255,255,0.02)"
  },
  miniBadge: {
    padding: "6px 12px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "8px",
    fontSize: "0.8rem",
    color: "#ccc"
  }
};

export default About;