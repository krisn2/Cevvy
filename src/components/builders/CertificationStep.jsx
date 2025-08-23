import React, { useState } from "react";
import { useResumeData } from "../../contexts/ResumeDataContext";

const CertificationStep = () => {
  const { formData, updateFormData } = useResumeData();
  const certifications = formData.certifications?.certifications || [];
  const [currentCert, setCurrentCert] = useState({
    title: '', date: '', issuer: '', certificate_url: '', details: ['']
  });

  const addCertification = () => {
    if (!currentCert.title || !currentCert.issuer) return;
    
    const updatedCertifications = [...certifications, {
      ...currentCert,
      details: currentCert.details.filter(detail => detail.trim())
    }];
    updateFormData('certifications', { certifications: updatedCertifications });
    setCurrentCert({
      title: '', date: '', issuer: '', certificate_url: '', details: ['']
    });
  };

  const updateCertDetail = (index, value) => {
    const newDetails = [...currentCert.details];
    newDetails[index] = value;
    setCurrentCert({...currentCert, details: newDetails});
  };

  const addCertDetail = () => {
    setCurrentCert({
      ...currentCert, 
      details: [...currentCert.details, '']
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Certifications</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add Certification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Certification Title"
            value={currentCert.title}
            onChange={(e) => setCurrentCert({...currentCert, title: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Year"
            value={currentCert.date}
            onChange={(e) => setCurrentCert({...currentCert, date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Issuing Organization"
            value={currentCert.issuer}
            onChange={(e) => setCurrentCert({...currentCert, issuer: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="url"
            placeholder="Certificate URL (optional)"
            value={currentCert.certificate_url}
            onChange={(e) => setCurrentCert({...currentCert, certificate_url: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold mb-4">Additional Details (optional)</h4>
          {currentCert.details.map((detail, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Detail ${index + 1}...`}
              value={detail}
              onChange={(e) => updateCertDetail(index, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3"
            />
          ))}
          <button
            onClick={addCertDetail}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4"
          >
            + Add another detail
          </button>
        </div>

        <button
          onClick={addCertification}
          className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Certification
        </button>
      </div>

      {certifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Certifications ({certifications.length})</h3>
          {certifications.map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{cert.title}</h4>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                  {cert.certificate_url && (
                    <a href={cert.certificate_url} className="text-blue-600 text-sm underline" target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                  )}
                  {cert.details.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-600">
                      {cert.details.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={() => {
                    const updated = certifications.filter((_, i) => i !== index);
                    updateFormData('certifications', { certifications: updated });
                  }}
                  className="text-red-500 hover:text-red-700 px-2 py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationStep;