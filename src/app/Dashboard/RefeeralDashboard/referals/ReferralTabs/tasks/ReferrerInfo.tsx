import { useState, useEffect } from "react";
import { z } from "zod";


const ReferrerInfoSchema = z.object({
  referrerName: z.string().min(1, "Name is required"),
  districts: z.string().min(1, "District is required"),
  emailAddress: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  referralType: z.enum(["Academics", "Special Features", "Behavioural", "Socials"]),
});

type ReferrerInfoData = z.infer<typeof ReferrerInfoSchema>;

interface ReferrerInfoProps {
  updateFormData: (data: ReferrerInfoData) => void;
  formData: Partial<ReferrerInfoData>;
}

const ReferrerInfo: React.FC<ReferrerInfoProps> = ({updateFormData,formData}) => {
  const [referrerName, setReferrerName] = useState(formData.referrerName || "");
  const [districts, setDistricts] = useState(formData.districts || "");
  const [emailAddress, setEmailAddress] = useState(formData.emailAddress || "");
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || "");
  const [referralType, setReferralType] = useState< ReferrerInfoData["referralType"]>(formData.referralType || "Academics");


  useEffect(() => {
    const data: ReferrerInfoData = {
      referrerName,
      districts,
      emailAddress,
      phoneNumber,
      referralType,
    };

    const result = ReferrerInfoSchema.safeParse(data);
    console.log(result);
    if (result.success) {
      updateFormData(result.data);
    } else {
      console.error("Validation error", result.error);
    }
  }, [
    referrerName,
    districts,
    emailAddress,
    phoneNumber,
    referralType,
    updateFormData,
  ]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Referrer Information</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Student Name
            </label>
            <input
              type="text"
              value={referrerName}
              onChange={(e) => setReferrerName(e.target.value)}
              className="w-full p-[10px] border-2 border-[#D0D0D0] outline-none bg-white dark:bg-black dark:text-white rounded-[9px]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Districts
            </label>
            <select
              value={districts}
              onChange={(e) => setDistricts(e.target.value)}
              className="w-full p-[10px] border-2 border-[#D0D0D0] outline-none bg-white dark:bg-black dark:text-white rounded-[9px]"
            >
              <option value="">Select Districts</option>
              <option value="Districts 1">Districts 1</option>
              <option value="Districts 2">Districts 2</option>
              <option value="Districts 3">Districts 3</option>
              <option value="Districts 4">Districts 4</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full p-[10px] border-2 border-[#D0D0D0] bg-white outline-none dark:bg-black dark:text-white rounded-[9px]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-[10px] border-2 border-[#D0D0D0] outline-none bg-white dark:bg-black dark:text-white rounded-[9px]"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Referral Details</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full p-[10px] outline-none border-2 border-[#D0D0D0] bg-white dark:bg-black dark:text-white rounded-[10px]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Type
            </label>
            {["Academics", "Special Features", "Behavioural", "Socials"].map((type) => (
              <div className="mt-2" key={type}>
                <label className="inline-flex items-center ">
                  <input
                    type="radio"
                    className="form-radio"
                    name="referralType"
                    value={type}
                    checked={referralType === type}
                    onChange={() =>
                      setReferralType(type as ReferrerInfoData["referralType"])
                    }
                  />
                  <span className="ml-2 capitalize">
                    {type === "Academics"  ? "Academics"  : type === "Special Features"
                      ? "Special Features"
                      : type === "Behavioural"
                      ? "Behavioural"
                      : "Socials"}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferrerInfo;
