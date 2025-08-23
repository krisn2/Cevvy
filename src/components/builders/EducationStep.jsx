import React, { useState } from "react";
import { useResumeData } from "../../contexts/ResumeDataContext";
const EducationStep = () => {
  const { formData, updateFormData } = useResumeData();
  const educations = formData.education?.educations || [];
  const [currentEdu, setCurrentEdu] = useState({
    school: '', degree: '', start_date: '', end_date: '', address: ''
  });

  const addEducation = () => {
    if (!currentEdu.school || !currentEdu.degree) return;
    
    const updatedEducations = [...educations, currentEdu];
    updateFormData('education', { educations: updatedEducations });
    setCurrentEdu({ school: '', degree: '', start_date: '', end_date: '', address: '' });
  };

  const removeEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    updateFormData('education', { educations: updatedEducations });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Education</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="School/Institution"
            value={currentEdu.school}
            onChange={(e) => setCurrentEdu({...currentEdu, school: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Degree/Program"
            value={currentEdu.degree}
            onChange={(e) => setCurrentEdu({...currentEdu, degree: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Start Year"
            value={currentEdu.start_date}
            onChange={(e) => setCurrentEdu({...currentEdu, start_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="End Year"
            value={currentEdu.end_date}
            onChange={(e) => setCurrentEdu({...currentEdu, end_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Location"
              value={currentEdu.address}
              onChange={(e) => setCurrentEdu({...currentEdu, address: e.target.value})}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
        <button
          onClick={addEducation}
          className="mt-4 bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Education
        </button>
      </div>

      {educations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Education ({educations.length})</h3>
          {educations.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.start_date} - {edu.end_date}</p>
                {edu.address && <p className="text-sm text-gray-500">{edu.address}</p>}
              </div>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700 px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationStep;