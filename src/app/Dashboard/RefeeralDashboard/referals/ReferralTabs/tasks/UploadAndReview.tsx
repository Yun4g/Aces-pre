// pages/student-referral.tsx
import React, { useState } from 'react';
import { FileText as DocumentIcon ,  Upload } from 'lucide-react';



type DocumentField = {
  id: string;
  name: string;
  required: boolean;
  file: File | null;
};

export default function i StudentReferral() {
  


  

  // Document fields state
  const [documentFields, setDocumentFields] = useState<DocumentField[]>([
    { id: 'iep', name: 'IEP Document', required: true, file: null },
    { id: 'consent', name: 'Consent Form', required: true, file: null },
    { id: 'cognitive', name: 'Cognitive Assessment', required: true, file: null },
  ]);

  // Handle file selection
  const handleFileSelect = (id: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setDocumentFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, file: files[0] } : field
      )
    );
  };

  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300  md:p-8">
      <div className=" w-full md:max-w-4xl md:mx-auto bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 rounded-lg shadow-md overflow-hidden">
        {/* Header */}
       
        
        
        
        {/* Content Area */}
        <div className="p-4 sm:p-2">
          <h2 className="text-lg font-medium text-gray-700 dark:text-white mb-4">Document Upload</h2>
          <p className="text-sm text-gray-500 dark:text-white mb-6">
            Upload all required documentation to support this referral. Required documents are indicated with an asterisk (*).
          </p>
          
          {/* Document Upload Fields */}
          <div className="space-y-6">
            {documentFields.map((field) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  {field.name}{field.required && <span className="text-red-500 ">*</span>}
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => document.getElementById(`file-${field.id}`)?.click()}
                >
                  <input
                    id={`file-${field.id}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileSelect(field.id, e.target.files)}
                  />
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Select your file or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG up to 10MB</p>
                  <button 
                    className="mt-2 text-blue-500 text-sm font-medium hover:text-blue-600"
                  >
                    Browse files
                  </button>
                </div>
                {field.file && (
                  <div className="mt-2 flex items-center">
                    <DocumentIcon  size={16} className="text-blue-500 mr-1" />
                    <span className="text-sm text-gray-700">{field.file.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
 
      </div>
    </div>
  );
}