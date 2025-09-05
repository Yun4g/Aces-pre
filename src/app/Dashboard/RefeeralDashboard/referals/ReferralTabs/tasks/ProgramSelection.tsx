"use client";
import { useState, useEffect } from "react";
import { z } from "zod";

const programFormSchema = z.object({
  selectedPrograms: z.array(z.string()).default([]),
  classification: z.string().optional(),
  reasonForReferral: z.string().optional(),
  urgentReferral: z.boolean().optional(),
  urgentReason: z.string().optional(),
  additional_notes: z.string().optional(),
 priority: z.enum(["Low", "Medium", "High"]), 
});

type ProgramFormData = z.infer<typeof programFormSchema>;

interface ProgramSelectionProps {
  updateFormData: (data: ProgramFormData) => void;
  formData: Partial<ProgramFormData>;

}

const ProgramSelection: React.FC<ProgramSelectionProps> = ({
  updateFormData,
  formData,

}) => {
  const parsedFormData = programFormSchema.parse({
    selectedPrograms: formData.selectedPrograms,
    classification: formData.classification,
    reasonForReferral: formData.reasonForReferral,
    urgentReferral: formData.urgentReferral,
    urgentReason: formData.urgentReason,
    additional_notes: formData.additional_notes ?? "",
     priority: formData.priority ?? "Low",
    

  });
  const [additionalNotes, setAdditionalNotes] = useState<string>(
   (formData.additional_notes as string) ?? ""
  );
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">(
    parsedFormData.priority as "Low" | "Medium" | "High"
  );

  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(
    parsedFormData.selectedPrograms
  );
  const [classification, setClassification] = useState<string>(
    parsedFormData.classification ?? ""
  );
  const [reasonForReferral, setReasonForReferral] = useState<string>(
    parsedFormData.reasonForReferral ?? ""
  );
  const [urgentReferral, setUrgentReferral] = useState<boolean>(
    parsedFormData.urgentReferral ?? false
  );
  const [urgentReason, setUrgentReason] = useState<string>(
    parsedFormData.urgentReason ?? ""
  );

  const toggleProgram = (program: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(program)
        ? prev.filter((p) => p !== program)
        : [...prev, program]
    );
  };
  
    const priorityOptions = ["Low", "Medium", "High"];
  
    const specialEducationLabels = ["Label 1", "Label 2"];

useEffect(() => {
  updateFormData({
    selectedPrograms,
    classification,
    reasonForReferral,
    urgentReferral,
    urgentReason,
    additional_notes: additionalNotes, 
    priority,
  });
}, [selectedPrograms, classification, reasonForReferral, urgentReferral, urgentReason, additionalNotes, priority, updateFormData]);


  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-6 ">Program Selection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {[
          {
            key: "academic",
            title: "Academic Intervention",
            description: "Targeted support for students struggling with core academic subjects including reading, writing, and mathematics.",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C4.23478 2 3.98043 2.10536 3.79289 2.29289C3.60536 2.48043 3.5 2.73478 3.5 3V13C3.5 13.2652 3.60536 13.5196 3.79289 13.7071C3.98043 13.8946 4.23478 14 4.5 14H11.5C11.7652 14 12.0196 13.8946 12.2071 13.7071C12.3946 13.5196 12.5 13.2652 12.5 13V6.91414C12.5 6.91411 12.5 6.91409 12.5 6.91406C12.5 6.78155 12.4473 6.65447 12.3536 6.56074C12.3536 6.56073 12.3536 6.56071 12.3536 6.5607L7.9393 2.14641C7.84557 2.0527 7.71847 2.00004 7.58594 2C7.58591 2 7.58589 2 7.58586 2H4.5ZM3.08579 1.58579C3.46086 1.21071 3.96957 1 4.5 1H7.58601C7.9837 1.00006 8.36509 1.15804 8.64633 1.43922L8.64637 1.43926L13.0608 5.85367C13.342 6.13491 13.4999 6.5163 13.5 6.91399V13C13.5 13.5304 13.2893 14.0391 12.9142 14.4142C12.5391 14.7893 12.0304 15 11.5 15H4.5C3.96957 15 3.46086 14.7893 3.08579 14.4142C2.71071 14.0391 2.5 13.5304 2.5 13V3C2.5 2.46957 2.71071 1.96086 3.08579 1.58579Z" fill="#005A9C" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.25C8.27614 1.25 8.5 1.47386 8.5 1.75V5.5C8.5 5.63261 8.55268 5.75978 8.64645 5.85355C8.74022 5.94732 8.86739 6 9 6H12.75C13.0261 6 13.25 6.22386 13.25 6.5C13.25 6.77614 13.0261 7 12.75 7H9C8.60217 7 8.22064 6.84196 7.93934 6.56066C7.65804 6.27936 7.5 5.89783 7.5 5.5V1.75C7.5 1.47386 7.72386 1.25 8 1.25Z" fill="#005A9C" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9C5 8.72386 5.22386 8.5 5.5 8.5H10.5C10.7761 8.5 11 8.72386 11 9C11 9.27614 10.7761 9.5 10.5 9.5H5.5C5.22386 9.5 5 9.27614 5 9Z" fill="#005A9C" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 11.5C5 11.2239 5.22386 11 5.5 11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z" fill="#005A9C" />
              </svg>
            ),
            bg: "bg-blue-100",
            color: "text-blue-500",
          },
          {
            key: "executive",
            title: "Executive Function Coaching",
            description:
              "Support for organization, time management, planning, and other executive function skills.",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C4.23478 2 3.98043 2.10536 3.79289 2.29289C3.60536 2.48043 3.5 2.73478 3.5 3V13C3.5 13.2652 3.60536 13.5196 3.79289 13.7071C3.98043 13.8946 4.23478 14 4.5 14H11.5C11.7652 14 12.0196 13.8946 12.2071 13.7071C12.3946 13.5196 12.5 13.2652 12.5 13V6.91414C12.5 6.91411 12.5 6.91409 12.5 6.91406C12.5 6.78155 12.4473 6.65447 12.3536 6.56074C12.3536 6.56073 12.3536 6.56071 12.3536 6.5607L7.9393 2.14641C7.84557 2.0527 7.71847 2.00004 7.58594 2C7.58591 2 7.58589 2 7.58586 2H4.5ZM3.08579 1.58579C3.46086 1.21071 3.96957 1 4.5 1H7.58601C7.9837 1.00006 8.36509 1.15804 8.64633 1.43922L8.64637 1.43926L13.0608 5.85367C13.342 6.13491 13.4999 6.5163 13.5 6.91399V13C13.5 13.5304 13.2893 14.0391 12.9142 14.4142C12.5391 14.7893 12.0304 15 11.5 15H4.5C3.96957 15 3.46086 14.7893 3.08579 14.4142C2.71071 14.0391 2.5 13.5304 2.5 13V3C2.5 2.46957 2.71071 1.96086 3.08579 1.58579Z" fill="#D97C12" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.25C8.27614 1.25 8.5 1.47386 8.5 1.75V5.5C8.5 5.63261 8.55268 5.75978 8.64645 5.85355C8.74022 5.94732 8.86739 6 9 6H12.75C13.0261 6 13.25 6.22386 13.25 6.5C13.25 6.77614 13.0261 7 12.75 7H9C8.60217 7 8.22064 6.84196 7.93934 6.56066C7.65804 6.27936 7.5 5.89783 7.5 5.5V1.75C7.5 1.47386 7.72386 1.25 8 1.25Z" fill="#D97C12" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9C5 8.72386 5.22386 8.5 5.5 8.5H10.5C10.7761 8.5 11 8.72386 11 9C11 9.27614 10.7761 9.5 10.5 9.5H5.5C5.22386 9.5 5 9.27614 5 9Z" fill="#D97C12" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 11.5C5 11.2239 5.22386 11 5.5 11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z" fill="#D97C12" />
              </svg>

            ),
            bg: "bg-orange-100",
            color: "text-orange-500",
          },
          {
            key: "behavioral",
            title: "Behavioral Support",
            description:
              "Comprehensive behavioral interventions and support for students with emotional or behavioral challenges.",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C4.23478 2 3.98043 2.10536 3.79289 2.29289C3.60536 2.48043 3.5 2.73478 3.5 3V13C3.5 13.2652 3.60536 13.5196 3.79289 13.7071C3.98043 13.8946 4.23478 14 4.5 14H11.5C11.7652 14 12.0196 13.8946 12.2071 13.7071C12.3946 13.5196 12.5 13.2652 12.5 13V6.91414C12.5 6.91411 12.5 6.91409 12.5 6.91406C12.5 6.78155 12.4473 6.65447 12.3536 6.56074C12.3536 6.56073 12.3536 6.56071 12.3536 6.5607L7.9393 2.14641C7.84557 2.0527 7.71847 2.00004 7.58594 2C7.58591 2 7.58589 2 7.58586 2H4.5ZM3.08579 1.58579C3.46086 1.21071 3.96957 1 4.5 1H7.58601C7.9837 1.00006 8.36509 1.15804 8.64633 1.43922L8.64637 1.43926L13.0608 5.85367C13.342 6.13491 13.4999 6.5163 13.5 6.91399V13C13.5 13.5304 13.2893 14.0391 12.9142 14.4142C12.5391 14.7893 12.0304 15 11.5 15H4.5C3.96957 15 3.46086 14.7893 3.08579 14.4142C2.71071 14.0391 2.5 13.5304 2.5 13V3C2.5 2.46957 2.71071 1.96086 3.08579 1.58579Z" fill="#1FC16B" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.25C8.27614 1.25 8.5 1.47386 8.5 1.75V5.5C8.5 5.63261 8.55268 5.75978 8.64645 5.85355C8.74022 5.94732 8.86739 6 9 6H12.75C13.0261 6 13.25 6.22386 13.25 6.5C13.25 6.77614 13.0261 7 12.75 7H9C8.60217 7 8.22064 6.84196 7.93934 6.56066C7.65804 6.27936 7.5 5.89783 7.5 5.5V1.75C7.5 1.47386 7.72386 1.25 8 1.25Z" fill="#1FC16B" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9C5 8.72386 5.22386 8.5 5.5 8.5H10.5C10.7761 8.5 11 8.72386 11 9C11 9.27614 10.7761 9.5 10.5 9.5H5.5C5.22386 9.5 5 9.27614 5 9Z" fill="#1FC16B" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 11.5C5 11.2239 5.22386 11 5.5 11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z" fill="#1FC16B" />
              </svg>

            ),
            bg: "bg-green-100",
            color: "text-green-500",
          },
          {
            key: "therapeutic",
            title: "Therapeutic Services",
            description:
              "Individual and group therapy services including counseling, speech therapy, and occupational therapy.",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C4.23478 2 3.98043 2.10536 3.79289 2.29289C3.60536 2.48043 3.5 2.73478 3.5 3V13C3.5 13.2652 3.60536 13.5196 3.79289 13.7071C3.98043 13.8946 4.23478 14 4.5 14H11.5C11.7652 14 12.0196 13.8946 12.2071 13.7071C12.3946 13.5196 12.5 13.2652 12.5 13V6.91414C12.5 6.91411 12.5 6.91409 12.5 6.91406C12.5 6.78155 12.4473 6.65447 12.3536 6.56074C12.3536 6.56073 12.3536 6.56071 12.3536 6.5607L7.9393 2.14641C7.84557 2.0527 7.71847 2.00004 7.58594 2C7.58591 2 7.58589 2 7.58586 2H4.5ZM3.08579 1.58579C3.46086 1.21071 3.96957 1 4.5 1H7.58601C7.9837 1.00006 8.36509 1.15804 8.64633 1.43922L8.64637 1.43926L13.0608 5.85367C13.342 6.13491 13.4999 6.5163 13.5 6.91399V13C13.5 13.5304 13.2893 14.0391 12.9142 14.4142C12.5391 14.7893 12.0304 15 11.5 15H4.5C3.96957 15 3.46086 14.7893 3.08579 14.4142C2.71071 14.0391 2.5 13.5304 2.5 13V3C2.5 2.46957 2.71071 1.96086 3.08579 1.58579Z" fill="#D52736" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.25C8.27614 1.25 8.5 1.47386 8.5 1.75V5.5C8.5 5.63261 8.55268 5.75978 8.64645 5.85355C8.74022 5.94732 8.86739 6 9 6H12.75C13.0261 6 13.25 6.22386 13.25 6.5C13.25 6.77614 13.0261 7 12.75 7H9C8.60217 7 8.22064 6.84196 7.93934 6.56066C7.65804 6.27936 7.5 5.89783 7.5 5.5V1.75C7.5 1.47386 7.72386 1.25 8 1.25Z" fill="#D52736" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9C5 8.72386 5.22386 8.5 5.5 8.5H10.5C10.7761 8.5 11 8.72386 11 9C11 9.27614 10.7761 9.5 10.5 9.5H5.5C5.22386 9.5 5 9.27614 5 9Z" fill="#D52736" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 11.5C5 11.2239 5.22386 11 5.5 11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z" fill="#D52736" />
              </svg>

            ),
            bg: "bg-pink-100",
            color: "text-pink-500",
          },
          {
            key: "social",
            title: "Social Skills Development",
            description:
              "Programs designed to enhance social interaction, communication, and relationship-building skills.",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C4.23478 2 3.98043 2.10536 3.79289 2.29289C3.60536 2.48043 3.5 2.73478 3.5 3V13C3.5 13.2652 3.60536 13.5196 3.79289 13.7071C3.98043 13.8946 4.23478 14 4.5 14H11.5C11.7652 14 12.0196 13.8946 12.2071 13.7071C12.3946 13.5196 12.5 13.2652 12.5 13V6.91414C12.5 6.91411 12.5 6.91409 12.5 6.91406C12.5 6.78155 12.4473 6.65447 12.3536 6.56074C12.3536 6.56073 12.3536 6.56071 12.3536 6.5607L7.9393 2.14641C7.84557 2.0527 7.71847 2.00004 7.58594 2C7.58591 2 7.58589 2 7.58586 2H4.5ZM3.08579 1.58579C3.46086 1.21071 3.96957 1 4.5 1H7.58601C7.9837 1.00006 8.36509 1.15804 8.64633 1.43922L8.64637 1.43926L13.0608 5.85367C13.342 6.13491 13.4999 6.5163 13.5 6.91399V13C13.5 13.5304 13.2893 14.0391 12.9142 14.4142C12.5391 14.7893 12.0304 15 11.5 15H4.5C3.96957 15 3.46086 14.7893 3.08579 14.4142C2.71071 14.0391 2.5 13.5304 2.5 13V3C2.5 2.46957 2.71071 1.96086 3.08579 1.58579Z" fill="#8E05CE" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.25C8.27614 1.25 8.5 1.47386 8.5 1.75V5.5C8.5 5.63261 8.55268 5.75978 8.64645 5.85355C8.74022 5.94732 8.86739 6 9 6H12.75C13.0261 6 13.25 6.22386 13.25 6.5C13.25 6.77614 13.0261 7 12.75 7H9C8.60217 7 8.22064 6.84196 7.93934 6.56066C7.65804 6.27936 7.5 5.89783 7.5 5.5V1.75C7.5 1.47386 7.72386 1.25 8 1.25Z" fill="#8E05CE" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9C5 8.72386 5.22386 8.5 5.5 8.5H10.5C10.7761 8.5 11 8.72386 11 9C11 9.27614 10.7761 9.5 10.5 9.5H5.5C5.22386 9.5 5 9.27614 5 9Z" fill="#8E05CE" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 11.5C5 11.2239 5.22386 11 5.5 11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z" fill="#8E05CE" />
              </svg>

            ),
            bg: "bg-purple-100",
            color: "text-purple-500",
          },
          {
            key: "assistive",
            title: "Assistive Technology",
            description:
              "Technology tools and resources to support learning and accessibility needs.",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C4.23478 2 3.98043 2.10536 3.79289 2.29289C3.60536 2.48043 3.5 2.73478 3.5 3V13C3.5 13.2652 3.60536 13.5196 3.79289 13.7071C3.98043 13.8946 4.23478 14 4.5 14H11.5C11.7652 14 12.0196 13.8946 12.2071 13.7071C12.3946 13.5196 12.5 13.2652 12.5 13V6.91414C12.5 6.91411 12.5 6.91409 12.5 6.91406C12.5 6.78155 12.4473 6.65447 12.3536 6.56074C12.3536 6.56073 12.3536 6.56071 12.3536 6.5607L7.9393 2.14641C7.84557 2.0527 7.71847 2.00004 7.58594 2C7.58591 2 7.58589 2 7.58586 2H4.5ZM3.08579 1.58579C3.46086 1.21071 3.96957 1 4.5 1H7.58601C7.9837 1.00006 8.36509 1.15804 8.64633 1.43922L8.64637 1.43926L13.0608 5.85367C13.342 6.13491 13.4999 6.5163 13.5 6.91399V13C13.5 13.5304 13.2893 14.0391 12.9142 14.4142C12.5391 14.7893 12.0304 15 11.5 15H4.5C3.96957 15 3.46086 14.7893 3.08579 14.4142C2.71071 14.0391 2.5 13.5304 2.5 13V3C2.5 2.46957 2.71071 1.96086 3.08579 1.58579Z" fill="#1FC16B" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.25C8.27614 1.25 8.5 1.47386 8.5 1.75V5.5C8.5 5.63261 8.55268 5.75978 8.64645 5.85355C8.74022 5.94732 8.86739 6 9 6H12.75C13.0261 6 13.25 6.22386 13.25 6.5C13.25 6.77614 13.0261 7 12.75 7H9C8.60217 7 8.22064 6.84196 7.93934 6.56066C7.65804 6.27936 7.5 5.89783 7.5 5.5V1.75C7.5 1.47386 7.72386 1.25 8 1.25Z" fill="#1FC16B" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9C5 8.72386 5.22386 8.5 5.5 8.5H10.5C10.7761 8.5 11 8.72386 11 9C11 9.27614 10.7761 9.5 10.5 9.5H5.5C5.22386 9.5 5 9.27614 5 9Z" fill="#1FC16B" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 11.5C5 11.2239 5.22386 11 5.5 11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z" fill="#1FC16B" />
              </svg>
            )
            ,
            bg: "bg-emerald-100",
            color: "text-emerald-500",
          },
        ].map(({ key, title, description, icon, bg, color }) => (
          <div
            key={key}
            className={`relative flex items-start gap-4 p-5 rounded-xl border transition-all duration-150 cursor-pointer ${selectedPrograms.includes(key)
              ? "border-blue-600 bg-blue-50 shadow-sm"
              : "border-gray-200 bg-white hover:border-blue-400"
              }`}
            onClick={() => toggleProgram(key)}
          >

            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${bg} ${color} text-lg flex-shrink-0`}
            >
              {icon}
            </div>


            <div className="flex-1 pr-6">
              <h3
                className={`font-semibold text-[16px] mb-1 ${selectedPrograms.includes(key)
                  ? "text-blue-700"
                  : "text-gray-900"
                  }`}
              >
                {title}
              </h3>
              <p className="text-sm text-gray-500 leading-snug">{description}</p>
            </div>

            <input
              type="radio"
              checked={selectedPrograms.includes(key)}
              onChange={() => toggleProgram(key)}
              className="absolute top-5 right-2 w-4 h-4 border-2 border-gray-300 rounded-full checked:border-blue-600 checked:bg-blue-600 appearance-none cursor-pointer"
            />
          </div>
        ))}
      </div>


      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4">Classification & Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Education Label
              </label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="w-full  p-[10px] border-2 border-[#D0D0D0] rounded-[12px]  text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Classification</option>
                {specialEducationLabels.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div> 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Referral
              </label>
              <textarea
                value={reasonForReferral}
                onChange={(e) => setReasonForReferral(e.target.value)}
                rows={4}
                placeholder="Please description the specify concerns"
                className="w-full  p-[10px] border-2 border-[#D0D0D0] rounded-[12px] text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

        
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={4}
                placeholder="Any Additional information that may be helpful"
                className="w-full  p-[10px] border-2 border-[#D0D0D0] rounded-[12px] text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
                className="w-full  p-[10px] border-2 border-[#D0D0D0] rounded-[12px] text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Priority</option>
                {priorityOptions.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

        
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Urgent referral need for (requires immediate Attentions)
              </label>
             
            </div>
          </div>
        </div>
      </div>

    </div >
  );
};

export default ProgramSelection;
