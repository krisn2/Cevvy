import React, { useState } from "react";
import { useResumeData } from "../../contexts/ResumeDataContext";

const SkillsStep = () => {
  const { formData, updateFormData } = useResumeData();
  const categories = formData.skills?.categories || [];
  const [currentCategory, setCurrentCategory] = useState({
    category_name: '', items: ['']
  });

  const addCategory = () => {
    if (!currentCategory.category_name) return;
    
    const updatedCategories = [...categories, {
      ...currentCategory,
      items: currentCategory.items.filter(item => item.trim())
    }];
    updateFormData('skills', { categories: updatedCategories });
    setCurrentCategory({ category_name: '', items: [''] });
  };

  const updateSkillItem = (index, value) => {
    const newItems = [...currentCategory.items];
    newItems[index] = value;
    setCurrentCategory({...currentCategory, items: newItems});
  };

  const addSkillItem = () => {
    setCurrentCategory({
      ...currentCategory, 
      items: [...currentCategory.items, '']
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Skills & Expertise</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add Skill Category</h3>
        
        <input
          type="text"
          placeholder="Category Name (e.g., Programming Languages)"
          value={currentCategory.category_name}
          onChange={(e) => setCurrentCategory({...currentCategory, category_name: e.target.value})}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-6"
        />

        <div>
          <h4 className="text-md font-semibold mb-4">Skills in this Category</h4>
          {currentCategory.items.map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Skill ${index + 1}...`}
              value={item}
              onChange={(e) => updateSkillItem(index, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3"
            />
          ))}
          <button
            onClick={addSkillItem}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4"
          >
            + Add another skill
          </button>
        </div>

        <button
          onClick={addCategory}
          className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Category
        </button>
      </div>

      {categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Skills ({categories.length})</h3>
          {categories.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{category.category_name}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {category.items.map((item, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updated = categories.filter((_, i) => i !== index);
                    updateFormData('skills', { categories: updated });
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

export default SkillsStep;