import { useState, useEffect } from 'react';

interface ProgramSelectionProps {
  updateFormData: (data: any) => void;
  formData: any;
}

const ProgramSelection: React.FC<ProgramSelectionProps> = ({ updateFormData, formData }) => {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(formData.selectedPrograms || []);
  const [classification, setClassification] = useState(formData.classification || '');
  const [reasonForReferral, setReasonForReferral] = useState(formData.reasonForReferral || '');
  const [urgentReferral, setUrgentReferral] = useState(formData.urgentReferral || false);
  const [urgentReason, setUrgentReason] = useState(formData.urgentReason || '');

  const toggleProgram = (program: string) => {
    if (selectedPrograms.includes(program)) {
      setSelectedPrograms(selectedPrograms.filter(p => p !== program));
    } else {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  useEffect(() => {
    updateFormData({
      selectedPrograms,
      classification,
      reasonForReferral,
      urgentReferral,
      urgentReason
    });
  }, [selectedPrograms, classification, reasonForReferral, urgentReferral, urgentReason, updateFormData]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Program Selection</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`p-4 border rounded-md ${selectedPrograms.includes('academic') ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={selectedPrograms.includes('academic')}
              onChange={() => toggleProgram('academic')}
              className="mt-1 mr-2"
            />
            <div>
              <h3 className="font-medium text-gray-800">Academic Intervention</h3>
              <p className="text-sm text-gray-600">Targeted support for students struggling with core academics: math, reading, writing, and homework</p>
            </div>
          </label>
        </div>
        
        <div className={`p-4 border rounded-md ${selectedPrograms.includes('executive') ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={selectedPrograms.includes('executive')}
              onChange={() => toggleProgram('executive')}
              className="mt-1 mr-2"
            />
            <div>
              <h3 className="font-medium text-gray-800">Executive Function Coaching</h3>
              <p className="text-sm text-gray-600">Support for planning, time management, organization, and focus</p>
            </div>
          </label>
        </div>
        
        <div className={`p-4 border rounded-md ${selectedPrograms.includes('behavioral') ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={selectedPrograms.includes('behavioral')}
              onChange={() => toggleProgram('behavioral')}
              className="mt-1 mr-2"
            />
            <div>
              <h3 className="font-medium text-gray-800">Behavioral Support</h3>
              <p className="text-sm text-gray-600">Support for behavior management and addressing behavioral challenges</p>
            </div>
          </label>
        </div>
        
        <div className={`p-4 border rounded-md ${selectedPrograms.includes('therapeutic') ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={selectedPrograms.includes('therapeutic')}
              onChange={() => toggleProgram('therapeutic')}
              className="mt-1 mr-2"
            />
            <div>
              <h3 className="font-medium text-gray-800">Therapeutic Services</h3>
              <p className="text-sm text-gray-600">Individual and group counseling for social-emotional issues and situational stressors</p>
            </div>
          </label>
        </div>
        
        <div className={`p-4 border rounded-md ${selectedPrograms.includes('social') ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={selectedPrograms.includes('social')}
              onChange={() => toggleProgram('social')}
              className="mt-1 mr-2"
            />
            <div>
              <h3 className="font-medium text-gray-800">Social Skills Development</h3>
              <p className="text-sm text-gray-600">Support for friendship skills, communication, and social/emotional development</p>
            </div>
          </label>
        </div>
        
        <div className={`p-4 border rounded-md ${selectedPrograms.includes('assistive') ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={selectedPrograms.includes('assistive')}
              onChange={() => toggleProgram('assistive')}
              className="mt-1 mr-2"
            />
            <div>
              <h3 className="font-medium text-gray-800">Assistive Technology</h3>
              <p className="text-sm text-gray-600">Technology tools and support for students with specialized needs</p>
            </div>
          </label>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Classification & Details</h3>
        <div className="mb-4">
          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select classification</option>
            <option value="general">General Education</option>
            <option value="504">504 Plan</option>
            <option value="iep">IEP</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Referral</label>
          <textarea
            value={reasonForReferral}
            onChange={(e) => setReasonForReferral(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            placeholder="Please provide details about why this student is being referred..."
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <input
              type="checkbox"
              checked={urgentReferral}
              onChange={(e) => setUrgentReferral(e.target.checked)}
              className="mr-2"
            />
            Urgent referral: needs for timeline (immediate/elevated)
          </label>
          {urgentReferral && (
            <textarea
              value={urgentReason}
              onChange={(e) => setUrgentReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              rows={2}
              placeholder="Please explain why this referral is urgent..."
            ></textarea>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramSelection;