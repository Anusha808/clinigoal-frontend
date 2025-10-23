import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaCertificate, FaDownload } from "react-icons/fa";
import "./CertificateSection.css";

const CertificateSection = ({ unlocked, onDownload }) => {
  return (
    <motion.div
      className="certificate-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="certificate-title">
        <FaCertificate className="icon" /> Certificate of Achievement
      </h2>

      {unlocked ? (
        <motion.div
          className="certificate-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="congrats-text">
            🎉 Congratulations! You’ve successfully completed this course.
          </p>
          <button className="download-btn" onClick={onDownload}>
            <FaDownload /> Download Certificate
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="locked-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaLock className="lock-icon" />
          <p>Complete the quiz to unlock your certificate.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CertificateSection;
