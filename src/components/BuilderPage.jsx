import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { API_URL } from "../config";
import ResumeDataContext from "../contexts/ResumeDataContext";

// Import all step components
import PersonalInfoStep from "./builders/PersonalInfoStep";
import EducationStep from "./builders/EducationStep";
import ExperienceStep from "./builders/ExperienceStep";
import SkillsStep from "./builders/SkillsStep";
import ProjectStep from "./builders/ProjectStep";
import CertificationStep from "./builders/CertificationStep";

// Import UI components
import ProgressBar from "./ProgressBar";
import Toast from "./Toast";

const steps = [
  { id: 1, name: "Personal Info", component: PersonalInfoStep },
  { id: 2, name: "Education", component: EducationStep },
  { id: 3, name: "Experience", component: ExperienceStep },
  { id: 4, name: "Skills", component: SkillsStep },
  { id: 5, name: "Projects", component: ProjectStep },
  { id: 6, name: "Certifications", component: CertificationStep }
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    personal: {},
    education: { educations: [] },
    experience: { experiences: [] },
    skills: { categories: [] },
    projects: { projects: [] },
    certifications: { certifications: [] }
  });

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem('Token');

    if (!token) {
      setToast({
        title: "Error",
        description: "You must be logged in to create a resume."
      });
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 3000);
      return;
    }

    try {
      console.log(JSON.stringify(formData))
      const response = await fetch(`${API_URL}/resume`, {        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`    
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'resume.pdf'; 
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        setToast({
          title: "Success!",
          description: "Your resume has been generated and is downloading."
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit resume');
      }
    } catch (err) {
      setToast({
        title: "Error",
        description: err.message || "Failed to submit resume. Please try again."
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <ResumeDataContext.Provider value={{ formData, updateFormData }}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Toast toast={toast} />
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Build Your Resume
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create a professional resume that stands out. Follow our step-by-step process to showcase your skills and experience.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Step {currentStep}: {steps[currentStep - 1].name}
              </h2>
              <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                {currentStep} of {steps.length}
              </span>
            </div>
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
            <div className="p-8 lg:p-12">
              <div className="transform transition-all duration-500 ease-in-out">
                <CurrentStepComponent />
              </div>
            </div>
            
            {/* Card Footer with Navigation */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
                <div className="w-full sm:w-auto">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto group flex justify-center sm:justify-start items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl hover:border-gray-400 hover:bg-white transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                      <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                      Previous Step
                    </button>
                  )}
                </div>

                <div className="">
                  {currentStep < steps.length ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto group flex justify-center sm:justify-end items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                      Next Step
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto group flex justify-center sm:justify-end items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-4 focus:ring-green-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Finish & Save
                          <Check className="h-5 w-5 transition-transform group-hover:scale-110" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              {currentStep === steps.length ? (
                "Ready to complete your resume"
              ) : (
                `${steps.length - currentStep} ${steps.length - currentStep === 1 ? 'step' : 'steps'} remaining`
              )}
            </div>
          </div>
        </div>
      </div>
    </ResumeDataContext.Provider>
  );
}