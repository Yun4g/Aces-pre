import { useState, useEffect } from 'react';

interface ReferrerInfoProps {
  updateFormData: (data: any) => void;
  formData: any;
}

const ReferrerInfo: React.FC<ReferrerInfoProps> = ({ updateFormData, formData }) => {
  const [referrerName, setReferrerName] = useState(formData.referrerName || '');
  const [districts, setDistricts] = useState(formData.Districts || '');
  const [emailAddress, setEmailAddress] = useState(formData.emailAddress || '');
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || '');
  const [referralType, setReferralType] = useState(formData.referralType || 'new');

  useEffect(() => {
    updateFormData({
      referrerName,
      districts,
      emailAddress,
      phoneNumber,
      referralType
    });
  }, [referrerName, districts, emailAddress, phoneNumber, referralType, updateFormData]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Referrer Information</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              value={referrerName}
              onChange={(e) => setReferrerName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Districts</label>
            <select
              value={districts}
              onChange={(e) => setDistricts(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Districts </option>
              <option value="teacher">Districts 1</option>
              <option value="counselor"> Districts 2</option>
              <option value="administrator">Districts 3</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Referral Details</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="referralType"
                  value="new"
                  checked={referralType === 'new'}
                  onChange={() => setReferralType('new')}
                />
                <span className="ml-2">New Student Referral</span>
              </label>
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="referralType"
                  value="update"
                  checked={referralType === 'update'}
                  onChange={() => setReferralType('update')}
                />
                <span className="ml-2">Update to Existing Referral</span>
              </label>
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="referralType"
                  value="transfer"
                  checked={referralType === 'transfer'}
                  onChange={() => setReferralType('transfer')}
                />
                <span className="ml-2">Transfer from Another Program</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferrerInfo;