import {useResumeData} from "../../contexts/ResumeDataContext"

const PersonalInfoStep = () => {
  const { formData, updateFormData } = useResumeData();
  const data = formData.personal || {};

  const handleChange = (field, value) => {
    updateFormData('personal', { ...data, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Personal Information</h1>
        <p className="text-neutral-700 text-lg">Let's start with your basic information</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name"
            value={data.fullname || ''}
            onChange={(e) => handleChange('fullname', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={data.number || ''}
            onChange={(e) => handleChange('number', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="email"
            placeholder="Email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="url"
            placeholder="Website URL"
            value={data.web_url || ''}
            onChange={(e) => handleChange('web_url', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="LinkedIn Name"
            value={data.linkedin_name || ''}
            onChange={(e) => handleChange('linkedin_name', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={data.linkedin_url || ''}
            onChange={(e) => handleChange('linkedin_url', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="GitHub Name"
            value={data.github_name || ''}
            onChange={(e) => handleChange('github_name', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="url"
            placeholder="GitHub URL"
            value={data.github_url || ''}
            onChange={(e) => handleChange('github_url', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Address"
              value={data.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;