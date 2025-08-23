import React, { useState } from "react";
import { useResumeData } from "../../contexts/ResumeDataContext";

const ProjectStep = () => {
  const { formData, updateFormData } = useResumeData();
  const projects = formData.projects?.projects || [];
  const [currentProject, setCurrentProject] = useState({
    name: '', tech_stack: '', start_date: '', end_date: '', project_des: { lines: [''] }
  });

  const addProject = () => {
    if (!currentProject.name || !currentProject.tech_stack) return;
    
    const updatedProjects = [...projects, {
      ...currentProject,
      project_des: { lines: currentProject.project_des.lines.filter(line => line.trim()) }
    }];
    updateFormData('projects', { projects: updatedProjects });
    setCurrentProject({
      name: '', tech_stack: '', start_date: '', end_date: '', project_des: { lines: [''] }
    });
  };

  const updateProjectLine = (index, value) => {
    const newLines = [...currentProject.project_des.lines];
    newLines[index] = value;
    setCurrentProject({...currentProject, project_des: { lines: newLines }});
  };

  const addProjectLine = () => {
    setCurrentProject({
      ...currentProject, 
      project_des: { lines: [...currentProject.project_des.lines, ''] }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Projects</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add New Project</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Project Name"
            value={currentProject.name}
            onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Tech Stack"
            value={currentProject.tech_stack}
            onChange={(e) => setCurrentProject({...currentProject, tech_stack: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Start Year"
            value={currentProject.start_date}
            onChange={(e) => setCurrentProject({...currentProject, start_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="End Year"
            value={currentProject.end_date}
            onChange={(e) => setCurrentProject({...currentProject, end_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold mb-4">Project Description</h4>
          {currentProject.project_des.lines.map((line, index) => (
            <input
              key={index}
              type="text"
              placeholder={`• Project feature ${index + 1}...`}
              value={line}
              onChange={(e) => updateProjectLine(index, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3"
            />
          ))}
          <button
            onClick={addProjectLine}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4"
          >
            + Add another feature
          </button>
        </div>

        <button
          onClick={addProject}
          className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Project
        </button>
      </div>

      {projects.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Projects ({projects.length})</h3>
          {projects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{project.name}</h4>
                  <p className="text-gray-600">{project.tech_stack}</p>
                  <p className="text-sm text-gray-500">{project.start_date} - {project.end_date}</p>
                  <ul className="mt-2 text-sm text-gray-600">
                    {project.project_des.lines.map((line, i) => (
                      <li key={i}>• {line}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => {
                    const updated = projects.filter((_, i) => i !== index);
                    updateFormData('projects', { projects: updated });
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

export default ProjectStep;