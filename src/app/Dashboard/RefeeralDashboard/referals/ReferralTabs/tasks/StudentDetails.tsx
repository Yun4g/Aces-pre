import { useState, useEffect } from 'react';

interface StudentDetailsProps {
  updateFormData: (data: object) => void;
  formData: string;

}

const StudentDetails: React.FC<StudentDetailsProps> = ({ updateFormData, formData }) => {
  const [studentName, setStudentName] = useState(formData.studentName || '');
  const [dateOfBirth, setDateOfBirth] = useState(formData.dateOfBirth || '');
  const [gradeLevel, setGradeLevel] = useState(formData.gradeLevel || '');
  const [classroom, setClassroom] = useState(formData.classroom || '');
  const [city, setCity] = useState(formData.city || '');
  const [status, setStatus] = useState(formData.status || '');
  const [address, setAddress] = useState(formData.address || '');
  const [zipCode, setZipCode] = useState(formData.zipCode || '');
  const [parentName, setParentName] = useState(formData.parentName || '');
  const [relationship, setRelationship] = useState(formData.relationship || '');
  const [parentPhone, setParentPhone] = useState(formData.parentPhone || '');
  const [parentEmail, setParentEmail] = useState(formData.parentEmail || '');
  const [sameAddress, setSameAddress] = useState(formData.sameAddress || false);

  useEffect(() => {
    updateFormData({
      studentName,
      dateOfBirth,
      gradeLevel,
      classroom,
      city,
      status,
      address,
      zipCode,
      parentName,
      relationship,
      parentPhone,
      parentEmail,
      sameAddress
    });
  }, [
    studentName, dateOfBirth, gradeLevel, classroom, city, status, address, zipCode,
    parentName, relationship, parentPhone, parentEmail, sameAddress, updateFormData
  ]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Students Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Students Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Grade Level</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select grade</option>
              <option value="k">Kindergarten</option>
              <option value="1">1st Grade</option>
              <option value="2">2nd Grade</option>
              <option value="3">3rd Grade</option>
              <option value="4">4th Grade</option>
              <option value="5">5th Grade</option>
              <option value="6">6th Grade</option>
              <option value="7">7th Grade</option>
              <option value="8">8th Grade</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700  dark:text-white mb-1">Classroom</label>
            <input
              type="text"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700  dark:text-white mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="waitlist">Waitlist</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Street Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Parents/Guardians Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Parent Name</label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Relationship to student</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select relationship</option>
              <option value="mother">Mother</option>
              <option value="father">Father</option>
              <option value="guardian">Guardian</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Phone Number</label>
            <input
              type="tel"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Email Address</label>
            <input
              type="email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={sameAddress}
              onChange={(e) => setSameAddress(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Same Address As Student</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;