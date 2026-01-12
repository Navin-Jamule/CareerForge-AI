import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {

  const scrollToForm = () => {
    const form = document.getElementById("agent-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={styles.heroContainer}>
      {/* Decorative Glow behind the text */}
      <div style={styles.glow} />

      <div style={styles.content}>

        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-gradient"
          style={styles.headline}
        >
          Delivering the Future <br /> of Careers
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={styles.subtitle}
        >
          An intelligent AI platform for resumes, interviews,
          and career decision-making.
        </motion.p>

        {/* Animated Button with Hover Effect */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="btn-primary"
          onClick={scrollToForm}
          style={styles.button}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

// Inline styles for layout (keeps it clean without editing CSS again)
const styles = {
  heroContainer: {
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textAlign: 'center',
    overflow: 'hidden',
    padding: '0 20px',
  },
  content: {
    maxWidth: '800px',
    zIndex: 10,
    position: 'relative',
  },
  headline: {
    fontSize: 'clamp(3rem, 5vw, 4.5rem)', // Responsive font size
    marginBottom: '24px',
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '40px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  glow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%)',
    zIndex: 1,
    pointerEvents: 'none',
  }
};

export default Hero;