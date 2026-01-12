import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Loader2 } from "lucide-react";
import apiClient from "../api/client";
import ResponseView from "./ResponseView";

function AgentForm() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");
    setCategory("");

    try {
      const res = await apiClient.post("/query", {
        query: query,
      });

      setCategory(res.data.category);
      setResponse(res.data.response);
    } catch (error) {
      setResponse("Error communicating with backend. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="agent-form" style={{ position: "relative", zIndex: 10, padding: "0 20px" }}>

      {/* Glass Container */}
      <motion.div
        className="glass-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={styles.container}
      >

        {/* Header */}
        <div style={styles.header}>
          <Sparkles color="#00e5ff" size={24} style={{ marginRight: '10px' }} />
          <h2 style={styles.title}>Ask the AI Career Agent</h2>
        </div>

        {/* Input Area */}
        <div style={styles.inputWrapper}>
          <textarea
            rows={4}
            placeholder="e.g. 'Build a resume for a React Developer role' or 'Mock interview for a PM position'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.textarea}
          />
        </div>

        {/* Action Bar */}
        <div style={styles.actionBar}>
          <p style={styles.hint}>
            Powered by Multi-Agent LangGraph Architecture
          </p>

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            style={styles.button}
          >
            {loading ? (
              <>
                <Loader2 className="spin" size={18} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                Processing...
              </>
            ) : (
              <>
                Run Agent <Send size={18} style={{ marginLeft: '8px' }} />
              </>
            )}
          </button>
        </div>

      </motion.div>

      {/* Response Section */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResponseView category={category} response={response} />
        </motion.div>
      )}

      {/* Inline Keyframes for Spinner */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

// Internal Styles
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto 80px',
    padding: '40px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Darker inner bg
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'vertical',
    transition: 'border-color 0.3s',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  hint: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '160px',
    justifyContent: 'center',
  }
};

export default AgentForm;