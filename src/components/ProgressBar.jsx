
export default function ProgressBar({ currentStep, totalSteps }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3.5">
        <div
          className="bg-blue-400 h-3 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}