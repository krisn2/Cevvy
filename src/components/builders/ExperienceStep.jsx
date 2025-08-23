import React, { useState } from "react";
import { useResumeData } from "../../contexts/ResumeDataContext";

const ExperienceStep = () => {
  const { formData, updateFormData } = useResumeData();
  const experiences = formData.experience?.experiences || [];
  const [currentExp, setCurrentExp] = useState({
    position: '', company_name: '', start_date: '', end_date: '', address: '', job_des: { lines: [''] }
  });

  const addExperience = () => {
    if (!currentExp.position || !currentExp.company_name) return;
    
    const updatedExperiences = [...experiences, {
      ...currentExp,
      job_des: { lines: currentExp.job_des.lines.filter(line => line.trim()) }
    }];
    updateFormData('experience', { experiences: updatedExperiences });
    setCurrentExp({
      position: '', company_name: '', start_date: '', end_date: '', address: '', job_des: { lines: [''] }
    });
  };

  const updateJobLine = (index, value) => {
    const newLines = [...currentExp.job_des.lines];
    newLines[index] = value;
    setCurrentExp({...currentExp, job_des: { lines: newLines }});
  };

  const addJobLine = () => {
    setCurrentExp({
      ...currentExp, 
      job_des: { lines: [...currentExp.job_des.lines, ''] }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Work Experience</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Job Title"
            value={currentExp.position}
            onChange={(e) => setCurrentExp({...currentExp, position: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={currentExp.company_name}
            onChange={(e) => setCurrentExp({...currentExp, company_name: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Start Date (YYYY-MM)"
            value={currentExp.start_date}
            onChange={(e) => setCurrentExp({...currentExp, start_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="End Date (YYYY-MM)"
            value={currentExp.end_date}
            onChange={(e) => setCurrentExp({...currentExp, end_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Location"
              value={currentExp.address}
              onChange={(e) => setCurrentExp({...currentExp, address: e.target.value})}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold mb-4">Job Description</h4>
          {currentExp.job_des.lines.map((line, index) => (
            <input
              key={index}
              type="text"
              placeholder={`• Job responsibility ${index + 1}...`}
              value={line}
              onChange={(e) => updateJobLine(index, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3"
            />
          ))}
          <button
            onClick={addJobLine}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4"
          >
            + Add another responsibility
          </button>
        </div>

        <button
          onClick={addExperience}
          className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Experience
        </button>
      </div>

      {experiences.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Experience ({experiences.length})</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{exp.position}</h4>
                  <p className="text-gray-600">{exp.company_name}</p>
                  <p className="text-sm text-gray-500">{exp.start_date} - {exp.end_date}</p>
                  {exp.address && <p className="text-sm text-gray-500">{exp.address}</p>}
                  <ul className="mt-2 text-sm text-gray-600">
                    {exp.job_des.lines.map((line, i) => (
                      <li key={i}>• {line}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => {
                    const updated = experiences.filter((_, i) => i !== index);
                    updateFormData('experience', { experiences: updated });
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

export default ExperienceStep;