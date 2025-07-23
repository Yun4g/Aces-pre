"use client";

import { useState, useEffect } from "react";
import { z } from "zod";


const programFormSchema = z.object({
  selectedPrograms: z.array(z.string()).default([]),
  classification: z.string().optional(),
  reasonForReferral: z.string().optional(),
  urgentReferral: z.boolean().optional(),
  urgentReason: z.string().optional(),
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
  // Use fallback values for optional fields
  const parsedFormData = programFormSchema.parse({
    selectedPrograms: formData.selectedPrograms,
    classification: formData.classification,
    reasonForReferral: formData.reasonForReferral,
    urgentReferral: formData.urgentReferral,
    urgentReason: formData.urgentReason,
  });

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

  // Auto-sync to parent component
  useEffect(() => {
    updateFormData({
      selectedPrograms,
      classification,
      reasonForReferral,
      urgentReferral,
      urgentReason,
    });
  }, [
    selectedPrograms,
    classification,
    reasonForReferral,
    urgentReferral,
    urgentReason,
    updateFormData,
  ]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Program Selection</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[
          {
            key: "academic",
            title: "Academic Intervention",
            description:
              "Targeted support for students struggling with core academics: math, reading, writing, and homework",
          },
          {
            key: "executive",
            title: "Executive Function Coaching",
            description:
              "Support for planning, time management, organization, and focus",
          },
          {
            key: "behavioral",
            title: "Behavioral Support",
            description:
              "Support for behavior management and addressing behavioral challenges",
          },
          {
            key: "therapeutic",
            title: "Therapeutic Services",
            description:
              "Individual and group counseling for social-emotional issues and situational stressors",
          },
          {
            key: "social",
            title: "Social Skills Development",
            description:
              "Support for friendship skills, communication, and social/emotional development",
          },
          {
            key: "assistive",
            title: "Assistive Technology",
            description:
              "Technology tools and support for students with specialized needs",
          },
        ].map(({ key, title, description }) => (
          <div
            key={key}
            className={`p-4 border rounded-md ${
              selectedPrograms.includes(key)
                ? "border-blue-500 bg-blue-50 dark:border-blue-950 dark:bg-blue-900"
                : "border-gray-300"
            }`}
          >
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedPrograms.includes(key)}
                onChange={() => toggleProgram(key)}
                className="mt-1 mr-2"
              />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white">
                  {description}
                </p>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Classification & Details</h3>

        <div className="mb-4">
          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-white dark:bg-black dark:text-white rounded-md"
          >
            <option value="">Select classification</option>
            <option value="general">General Education</option>
            <option value="504">504 Plan</option>
            <option value="iep">IEP</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Reason for Referral
          </label>
          <textarea
            value={reasonForReferral}
            onChange={(e) => setReasonForReferral(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-white dark:bg-black dark:text-white rounded-md"
            rows={4}
            placeholder="Please provide details about why this student is being referred..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
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
              className="w-full p-2 border border-gray-300 bg-white mt-2 dark:bg-black dark:text-white rounded-md"
              rows={2}
              placeholder="Please explain why this referral is urgent..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramSelection;
