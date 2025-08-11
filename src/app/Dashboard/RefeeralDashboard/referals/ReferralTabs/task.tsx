// components/ReferralForm.tsx
import { useState } from 'react';
 import ReferrerInfo from './tasks/ReferrerInfo';
import StudentDetails from './tasks/StudentDetails';
import ProgramSelection from './tasks/ProgramSelection';
import UploadAndReview from './tasks/UploadAndReview';


const ReferralForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  console.log(formData)

  const goToNextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, 4));
  };

  const goToPrevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    
  };

  const handleSubmitReferral = () => {
    console.log('Submitting referral:', formData);
  
  };

  const updateFormData = (newData: object) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <div className=" p-4 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300  rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold"> Referral information</h1>
        <div className="flex space-x-1">
          <button className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

     
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-500' : 'text-gray-400'}`} >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}` }>
              <span>1</span>
            </div>
            <span className="text-xs mt-1">Referrer Info</span>
          </div>

          <div className="flex-1 h-1 mx-2 bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className={`h-full transition-all duration-300 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} ></div>
          </div>

          <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <span>2</span>
            </div>
            <span className="text-xs mt-1">Student Details</span>
          </div>

          <div className="flex-1 h-1 mx-2 bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className={`h-full transition-all duration-300  ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`} ></div>
          </div>

          <div className={`flex flex-col items-center  ${currentStep >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <span>3</span>
            </div>
            <span className="text-xs mt-1">Program Selection</span>
          </div>

          <div className="flex-1 h-1 mx-2 bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className={`h-full transition-colors duration-300 ${currentStep >= 4 ? 'bg-blue-500' : 'bg-gray-200'}`} ></div>
          </div>

          <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <span>4</span>
            </div>
            <span className="text-xs mt-1">Upload and Review</span>
          </div>
        </div>
      </div>

      {/* Form Steps */}
      <div className="mb-6">
        {currentStep === 1 && <ReferrerInfo updateFormData={updateFormData} formData={formData} />}
        {currentStep === 2 && <StudentDetails updateFormData={updateFormData} formData={formData} />}
        {currentStep === 3 && <ProgramSelection updateFormData={updateFormData} formData={formData} />}
        {currentStep === 4 && <UploadAndReview updateFormData={updateFormData} formData={formData} />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-2 justify-between mt-6">
        <div className="flex ">
          {currentStep > 1 && (
            <button onClick={goToPrevStep} className="px-4 py-2 border-2 rounded-md text-gray-600 hover:bg-gray-50">
              Previous
            </button>
          )}
         
        </div>
        <div>
        <button onClick={handleSaveDraft} className="px-4 py-2 border-2 mr-3 rounded-lg text-gray-600 hover:bg-gray-50">
            Save Draft
          </button>
          {currentStep < 4 ? (
            <button onClick={goToNextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Next step
            </button>
          ) : (
            <button onClick={handleSubmitReferral} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Submit referral
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;