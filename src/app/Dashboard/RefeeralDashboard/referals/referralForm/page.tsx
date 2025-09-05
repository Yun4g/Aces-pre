'use client';
import { useState, useEffect } from 'react';
import ReferrerInfo from '../ReferralTabs/tasks/ReferrerInfo';
import StudentDetails from '../ReferralTabs/tasks/StudentDetails';
import ProgramSelection from '../ReferralTabs/tasks/ProgramSelection';

import IStudentReferral from '../ReferralTabs/tasks/UploadAndReview';
import { useRouter } from 'next/navigation';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';




export interface ReferralFormData {
  created_by?: number;
  districts?: string;
  additional_notes?: string;
  reasonForReferral?: string;
  subject: number;
  priority?: "Low" | "Medium" | "High";
  referralType?: "Academic Intervention" | "Behavioural Support" | "Social  Skills Development" | "Executive Function Coaching" | "Therapeuntic Services" | "Assistive Coaching" ;
  specialEducationLabel?: "Label 1" | "Label 2"  ;
  status?: "In progress" | "Success" ;
  ref_manager?: number;
  pro_staff?: number;
  classification?: string;
  referrerName: string;
  studentName?: string;
  emailAddress?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  phoneNumber?: string;
  classroom?: string;
  zipCode?: string;
  city?: string;
  address?: string;
  urgentReferral?: boolean;
  urgentReason?: string;
  relationship?: string;
  sameAddress?: boolean;
  gradeLevel?: string;
  dateOfBirth?: string;
  selectedPrograms?: string[];
  0?: { file?: File };
  1?: { file?: File };
  2?: { file?: File };
}



const ReferralForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ReferralFormData>({} as ReferralFormData);
  const [token, setToken] = useState<string | null>(null);
  const created_by = 15;
  const [isLoading, setIsLoading] = useState<boolean>(false)





  console.log(token, 'token in header ttt')
  const router = useRouter();
  console.log('formData', formData)

  const goToNextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, 4));
  };

  const goToPrevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);

  };

  const mapFormDataToPayload = (data: any) => {
    const iep = data[0]?.file ? data[0].file.name : null;
    const consent = data[1]?.file ? data[1].file.name : null;
    const cognitive = data[2]?.file ? data[2].file.name : null;

    return {
      referral_info: data.referralType || "",
      district: data.districts || "",
      additional_notes: data.additional_notes || data.additionalNotes || null,
      reason: data.reasonForReferral || null,
      draft: false,
      iep_document: iep,
      consent_form: consent,
      cognitive_assesments: cognitive,
      avatar: null,
      priority: data.priority || "Low",
      referral_type: data.referralType || "Academic Intervention",
      status: data.status || "In progress",
      special_education_label: data.specialEducationLabel || "Label 1",

   
      ref_manager: data.ref_manager,
      pro_staff: data.pro_staff,

      created_by: 15,
      studentName: data.studentName,
      emailAddress: data.emailAddress,
      parentName: data.parentName,
      parentEmail: data.parentEmail,
      parentPhone: data.parentPhone,
      phoneNumber: data.phoneNumber,
      classroom: data.classroom,
      zipCode: data.zipCode,
      city: data.city,
      address: data.address,
      urgentReferral: data.urgentReferral,
      urgentReason: data.urgentReason,
      relationship: data.relationship,
      selectedPrograms: data.selectedPrograms,
      sameAddress: data.sameAddress,
      gradeLevel: data.gradeLevel,
      dateOfBirth: data.dateOfBirth,

    };
  };


  // "priority": "Low",
  // "referral_info": "Completed",
  // "referral_type": "Academic Intervention",
  // "district": "Physics Laboratory",
  // "status": "In progress",
  // "additional_notes": null,
  // "reason": null,
  // "special_education_label": null,
  // "created_at": "2025-08-15T10:17:45.641083Z",
  // "updated_at": "2025-08-15T10:17:45.641097Z",
  // "draft": false,
  // "iep_document": null,
  // "consent_form": null,
  // "cognitive_assesments": null,
  // "avatar": null,
  // "subject": 1,
  // "ref_manager": 1,
  // "pro_staff": 1,
  // "created_by": 1



  mapFormDataToPayload(formData)


  const payload = mapFormDataToPayload(formData);
  console.log('payload', payload)
  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, []);

  const handleSubmitReferral = async () => {
    try {
      setIsLoading(true)
      const formDataToSend = new FormData();
      formDataToSend.append("priority", formData.priority || "Low");
      formDataToSend.append("created_by", String(created_by));
      formDataToSend.append("referral_type", formData.referralType || "");
      formDataToSend.append("district", formData.districts || "");
      formDataToSend.append("status", formData.status || "in progress");
      formDataToSend.append("subject", String(formData.subject || 1));
      formDataToSend.append("pro_staff", String(formData.pro_staff || ""));
      formDataToSend.append("ref_manager", String(formData.ref_manager || ""));
      formDataToSend.append("additional_notes", formData.additional_notes || "");
      formDataToSend.append("reason", formData.reasonForReferral || "");
      formDataToSend.append("special_education_label", formData.classification || "");
      formDataToSend.append("studentName", formData.studentName || "");
      formDataToSend.append("emailAddress", formData.emailAddress || "");
      formDataToSend.append("parentName", formData.parentName || "");
      formDataToSend.append("parentEmail", formData.parentEmail || "");
      formDataToSend.append("parentPhone", formData.parentPhone || "");
      formDataToSend.append("phoneNumber", formData.phoneNumber || "");
      formDataToSend.append("classroom", formData.classroom || "");
      formDataToSend.append("zipCode", formData.zipCode || "");
      formDataToSend.append("city", formData.city || "");
      formDataToSend.append("address", formData.address || "");
      formDataToSend.append("urgentReferral", String(formData.urgentReferral || false));
      formDataToSend.append("urgentReason", formData.urgentReason || "");
      formDataToSend.append("relationship", formData.relationship || "");
      formDataToSend.append("sameAddress", String(formData.sameAddress || false));
      formDataToSend.append("gradeLevel", formData.gradeLevel || "");
      formDataToSend.append("dateOfBirth", formData.dateOfBirth || "");


      if (Array.isArray(formData.selectedPrograms)) {
        formData.selectedPrograms.forEach((program: string) =>
          formDataToSend.append("selectedPrograms[]", program)
        );
      }

      if (formData[0]?.file) {
        formDataToSend.append("iep_document", formData[0].file);
      }
      if (formData[1]?.file) {
        formDataToSend.append("consent_form", formData[1].file);
      }
      if (formData[2]?.file) {
        formDataToSend.append("cognitive_assessments", formData[2].file);
      }

      const response = await fetch("https://api.aces-tdx.com/api/referrals/", {
        method: "POST",
        body: formDataToSend,
        headers: { Authorization: `Bearer ${token}` }
      });

       if (response.ok) {
         alert('referral created succefully')
         router.push('/Dashboard/RefeeralDashboard/referals')
       } else {
         alert('creating referral failed')
       }

      const data = await response.json();
      console.log("Submission success:", data);
      localStorage.setItem("formData", JSON.stringify(formData));

    } catch (error) {
      console.error("Request error:", error);
      setIsLoading(false)
      alert("An error occurred during submission.");
    } finally {
      setIsLoading(false)
    }
  };



  const updateFormData = (newData: object) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };


  return (
    <div className=' flex justify-center items-center min-h-screen md:py-[70px] bg-[#D9D9D99E] '>
      <div className=" p-4 bg-white h-fit w-[900px] border-2  dark:bg-gray-900 dark:text-white transition-colors duration-300  rounded-md">
        <div className="flex justify-between  w-full items-center mb-4">
          <h1 className="text-xl font-bold"> New ACES Student Referral </h1>
          <div className="flex space-x-1">
            <button className="p-1" onClick={() => router.back()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>


        <div className="mb-8">
          <div className="flex justify-between items-center w-full px-4 py-2">

            <div className="flex-1 h-1 mx-2  relative bg-gray-200">
              <div className={`absolute left-0 top-0 h-full rounded transition-all duration-300 ${currentStep >= 1 ? 'bg-[#005A9C] w-full' : 'bg-gray-200 w-full'}`}></div>
            </div>
            <div className="flex flex-col  items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-base transition-colors duration-200 ${currentStep >= 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className={`text-xs mt-1 ${currentStep >= 1 ? 'text-gray-800' : 'text-gray-400'}`}>Referrer Info</span>
            </div>


            <div className="flex-1 h-1 mx-2 relative bg-gray-200">
              <div className={`absolute left-0 top-0 h-full rounded transition-all duration-300 ${currentStep >= 2 ? 'bg-[#005A9C] w-full' : 'bg-gray-200 w-full'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-base transition-colors duration-200 ${currentStep >= 2 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className={`text-xs mt-1 ${currentStep >= 2 ? 'text-gray-800' : 'text-gray-400'}`}>Student Details</span>
            </div>
            <div className="flex-1 h-1 mx-2 relative bg-gray-200">
              <div className={`absolute left-0 top-0 h-full rounded transition-all duration-300 ${currentStep >= 3 ? 'bg-[#005A9C] w-full' : 'bg-gray-200 w-full'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-base transition-colors duration-200 ${currentStep >= 3 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className={`text-xs mt-1 ${currentStep >= 3 ? 'text-gray-800' : 'text-gray-400'}`}>Program Selection</span>
            </div>

            <div className="flex-1 h-1 mx-2 relative bg-gray-200">
              <div className={`absolute left-0 top-0 h-full rounded transition-all duration-300 ${currentStep >= 4 ? 'bg-[#005A9C] w-full' : 'bg-gray-200 w-full'}`}></div>
            </div>

            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-base transition-colors duration-200 ${currentStep >= 4 ? 'bg-[#005A9C] text-white' : 'bg-gray-200 text-gray-500'}`}>
                4
              </div>
              <span className={`text-xs mt-1 ${currentStep >= 4 ? 'text-gray-800' : 'text-gray-400'}`}>Upload and Review</span>
            </div>
          </div>

        </div>

        <div className="mb-[190px] ">
          {currentStep === 1 && <ReferrerInfo updateFormData={updateFormData} formData={formData} />}
          {currentStep === 2 && <StudentDetails updateFormData={updateFormData} formData={formData} />}
          {currentStep === 3 && <ProgramSelection updateFormData={updateFormData} formData={formData} />}
          {currentStep === 4 && <IStudentReferral updateFormData={updateFormData} formData={formData} />}
        </div>

        <div className="flex flex-wrap gap-2 justify-between  ">
          <div className="flex ">
            {currentStep > 1 ? (
              <button onClick={goToPrevStep} className="px-4 py-2 flex justify-center item-center gap-1 rounded-[9px] border-2 border-[#D0D0D0] text-gray-600 hover:bg-gray-50">
                <span className=' flex justify-center items-center'>
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6942 3.71209C11.0603 4.0782 11.0603 4.6718 10.6942 5.03791L5.73208 10L10.6942 14.9621C11.0603 15.3282 11.0603 15.9218 10.6942 16.2879C10.328 16.654 9.73445 16.654 9.36834 16.2879L3.74334 10.6629C3.37722 10.2968 3.37722 9.7032 3.74334 9.33709L9.36834 3.71209C9.73445 3.34597 10.328 3.34597 10.6942 3.71209Z" fill="#AEADAD" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 10C4.25 9.48223 4.66973 9.0625 5.1875 9.0625H16.5938C17.1115 9.0625 17.5312 9.48223 17.5312 10C17.5312 10.5178 17.1115 10.9375 16.5938 10.9375H5.1875C4.66973 10.9375 4.25 10.5178 4.25 10Z" fill="#AEADAD" />
                  </svg>

                </span>
                Previous
              </button>
            ) : (
              <button onClick={handleSaveDraft} className="px-4 py-2 flex justify-center item-center gap-1 rounded-[10px] border-2 border-[#D0D0D0] text-gray-600 hover:bg-gray-50">
                <span className=' flex justify-center items-center'>
                  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.17969 17.75C1.83984 17.75 0.75 16.6602 0.75 15.3203V2.67969C0.75 1.33984 1.83984 0.25 3.17969 0.25H13.4961C13.9961 0.25 14.4688 0.445312 14.8203 0.800781L17.6992 3.67969C18.0547 4.03516 18.25 4.50391 18.25 5.00391V15.3203C18.2461 16.6562 17.1562 17.7461 15.8203 17.75H3.17969ZM3.17969 1.5C2.86328 1.5 2.56641 1.62109 2.34375 1.84375C2.12109 2.06641 2 2.36328 2 2.67969V15.3203C2 15.9727 2.52734 16.5 3.17969 16.5H15.8203C16.4688 16.5 17 15.9688 17 15.3164V5.00391C17 4.83594 16.9336 4.67969 16.8164 4.5625L13.9375 1.68359C13.8203 1.56641 13.6641 1.5 13.4961 1.5H3.17969ZM9.50781 15.875H9.5C7.77734 15.875 6.375 14.4727 6.375 12.75C6.375 11.0273 7.77734 9.625 9.5 9.625C11.2227 9.625 12.625 11.0273 12.625 12.75C12.625 13.582 12.3008 14.3672 11.7148 14.957C11.125 15.5469 10.3398 15.875 9.50781 15.875ZM9.5 10.875C8.46484 10.875 7.625 11.7148 7.625 12.75C7.625 13.7852 8.46484 14.625 9.5 14.625H9.50781C10.0078 14.625 10.4766 14.4297 10.8281 14.0742C11.1797 13.7188 11.375 13.25 11.375 12.75C11.375 11.7148 10.5352 10.875 9.5 10.875ZM11.375 7.125H3.875C3.1875 7.125 2.625 6.5625 2.625 5.875V3.375C2.625 2.6875 3.1875 2.125 3.875 2.125H11.375C12.0625 2.125 12.625 2.6875 12.625 3.375V5.875C12.625 6.5625 12.0625 7.125 11.375 7.125ZM3.875 3.375V5.875H11.375V3.375H3.875Z" fill="#898A8C" />
                  </svg>
                </span>
                Save Draft
              </button>
            )

            }

          </div>
          <div>
            <div className=' flex items-center justify-center gap-5'>

              {
                currentStep > 1 && (
                  <button onClick={handleSaveDraft} className="px-4 py-2 flex justify-center item-center gap-1 rounded-[9px] border-2 border-[#D0D0D0] text-gray-600 hover:bg-gray-50">
                    <span >
                      <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.17969 17.75C1.83984 17.75 0.75 16.6602 0.75 15.3203V2.67969C0.75 1.33984 1.83984 0.25 3.17969 0.25H13.4961C13.9961 0.25 14.4688 0.445312 14.8203 0.800781L17.6992 3.67969C18.0547 4.03516 18.25 4.50391 18.25 5.00391V15.3203C18.2461 16.6562 17.1562 17.7461 15.8203 17.75H3.17969ZM3.17969 1.5C2.86328 1.5 2.56641 1.62109 2.34375 1.84375C2.12109 2.06641 2 2.36328 2 2.67969V15.3203C2 15.9727 2.52734 16.5 3.17969 16.5H15.8203C16.4688 16.5 17 15.9688 17 15.3164V5.00391C17 4.83594 16.9336 4.67969 16.8164 4.5625L13.9375 1.68359C13.8203 1.56641 13.6641 1.5 13.4961 1.5H3.17969ZM9.50781 15.875H9.5C7.77734 15.875 6.375 14.4727 6.375 12.75C6.375 11.0273 7.77734 9.625 9.5 9.625C11.2227 9.625 12.625 11.0273 12.625 12.75C12.625 13.582 12.3008 14.3672 11.7148 14.957C11.125 15.5469 10.3398 15.875 9.50781 15.875ZM9.5 10.875C8.46484 10.875 7.625 11.7148 7.625 12.75C7.625 13.7852 8.46484 14.625 9.5 14.625H9.50781C10.0078 14.625 10.4766 14.4297 10.8281 14.0742C11.1797 13.7188 11.375 13.25 11.375 12.75C11.375 11.7148 10.5352 10.875 9.5 10.875ZM11.375 7.125H3.875C3.1875 7.125 2.625 6.5625 2.625 5.875V3.375C2.625 2.6875 3.1875 2.125 3.875 2.125H11.375C12.0625 2.125 12.625 2.6875 12.625 3.375V5.875C12.625 6.5625 12.0625 7.125 11.375 7.125ZM3.875 3.375V5.875H11.375V3.375H3.875Z" fill="#898A8C" />
                      </svg>
                    </span>
                    Save Draft
                  </button>
                )
              }

              {currentStep < 4 ? (
                <button onClick={goToNextStep} className="px-4 py-2 flex justify-center items-center gap-2 bg-[#005A9C] text-white rounded-[9px] ">
                  Next step
                  <span>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.3058 3.71209C10.672 3.34597 11.2655 3.34597 11.6317 3.71209L17.2567 9.33709C17.6228 9.7032 17.6228 10.2968 17.2567 10.6629L11.6317 16.2879C11.2655 16.654 10.672 16.654 10.3058 16.2879C9.93972 15.9218 9.93972 15.3282 10.3058 14.9621L15.2679 10L10.3058 5.03791C9.93972 4.6718 9.93972 4.0782 10.3058 3.71209Z" fill="white" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.46875 10C3.46875 9.48223 3.88848 9.0625 4.40625 9.0625H15.8125C16.3303 9.0625 16.75 9.48223 16.75 10C16.75 10.5178 16.3303 10.9375 15.8125 10.9375H4.40625C3.88848 10.9375 3.46875 10.5178 3.46875 10Z" fill="white" />
                    </svg>

                  </span>
                </button>
              ) : (
                <button
                  onClick={handleSubmitReferral}
                  className="px-2 py-2 md:px-4 md:py-2 bg-[#005A9C] text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Submit Referral"
                  )}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default ReferralForm;