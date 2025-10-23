import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./UserDashboard.css";

const CertificateComponent = ({ course, userName, completedSections }) => {
  const certificateRef = useRef();

  // ✅ Handle certificate download
  const handleDownload = async () => {
    const certificate = certificateRef.current;

    if (!certificate) {
      alert("Certificate not ready yet!");
      return;
    }

    try {
      const canvas = await html2canvas(certificate, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userName}_certificate.pdf`);
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate. Please try again later.");
    }
  };

  return (
    <div className="certificate-wrapper">
      <div ref={certificateRef} className="certificate">
        <div className="certificate-border">
          <div className="certificate-header">
            <h2>🎓 Clinigoal Academy</h2>
            <h4>Certificate of Completion</h4>
          </div>

          <div className="certificate-body">
            <p className="certificate-text">This certifies that</p>
            <h1 className="certificate-name">{userName}</h1>
            <p className="certificate-text">
              has successfully completed the course
            </p>
            <h2 className="certificate-course">“{course?.title || "Course"}”</h2>
            <p className="certificate-details">
              All sections completed:{" "}
              <strong>
                {Object.values(completedSections || {}).filter(Boolean).length}/4
              </strong>
            </p>
          </div>

          <div className="certificate-footer">
            <div className="signature">
              <hr />
              <p>Instructor Signature</p>
            </div>
            <div className="date">
              <hr />
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleDownload} className="download-btn">
        <FaDownload /> Download Certificate
      </button>
    </div>
  );
};

export default CertificateComponent;
