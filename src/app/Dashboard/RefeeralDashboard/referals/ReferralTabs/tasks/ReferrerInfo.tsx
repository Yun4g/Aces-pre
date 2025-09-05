"use client";
import { useState, useEffect } from "react";
import { z } from "zod";
import { ReferralFormData } from "../../referralForm/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ReferrerInfoSchema = z.object({
  referrerName: z.string().min(1, "Name is required"),
  districts: z.string().min(1, "District is required"),
  emailAddress: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  referralType: z.enum(["Academic Intervention", "Behavioural Support", "Social  Skills Development", "Executive Function Coaching", "Therapeuntic Services", "Assistive Coaching"]),
  subject: z.number({ invalid_type_error: "Subject is required" }),
  pro_staff: z.number({ invalid_type_error: "Pro Staff is required" }),
  ref_manager: z.number({ invalid_type_error: "Referral Manager is required" }),
  specialEducationLabel: z.enum(["Label 1", "Label 2"]),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["In progress", "Success",]),
});


type ReferrerInfoData = z.infer<typeof ReferrerInfoSchema>;

interface ReferrerInfoProps {
  updateFormData: (data: Partial<ReferralFormData>) => void;
  formData: ReferralFormData;
}

const ReferrerInfo: React.FC<ReferrerInfoProps> = ({ updateFormData, formData }) => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReferrerInfoData, string>>
  >({});
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  const fetchSubjects = async () => {
    const res = await axios.get("https://api.aces-tdx.com/api/subjects/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const fetchUsers = async () => {
    const res = await axios.get("https://api.aces-tdx.com/api/users/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
    enabled: !!token,
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: !!token,
  });



  const specialEducationLabels = ["Label 1", "Label 2"];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({
      [name]:
        name === "subject" ||
          name === "pro_staff" ||
          name === "ref_manager"
          ? Number(value)
          : value,
    });
  };

  const validate = () => {
    const result = ReferrerInfoSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  return (
    <div className="space-y-4">

      <div>
        <label className="block text-sm font-medium">Referrer Name</label>
        <input
          type="text"
          name="referrerName"
          value={formData.referrerName || ""}
          onChange={handleChange}
          onBlur={validate}
          className="w-full border rounded px-3 py-2"
        />
        {errors.referrerName && (
          <p className="text-red-500 text-sm">{errors.referrerName}</p>
        )}
      </div>


      <div>
        <label className="block text-sm font-medium">Subject</label>
        <select
          name="subject"
          value={formData.subject || ""}
          onChange={handleChange}
          onBlur={validate}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select subject</option>
          {subjects.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="text-red-500 text-sm">{errors.subject}</p>
        )}
      </div>


      <div>
        <label className="block text-sm font-medium">Pro Staff</label>
        <select
          name="pro_staff"
          value={formData.pro_staff || ""}
          onChange={handleChange}
          onBlur={validate}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select staff</option>
          {users.map((u: any) => (
            <option key={u.id} value={u.id}>
              {u.username || u.email}
            </option>
          ))}
        </select>
        {errors.pro_staff && (
          <p className="text-red-500 text-sm">{errors.pro_staff}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Referral Type</label>
        <select
          name="referralType"
          value={formData.referralType || ""}
          onChange={handleChange}
          onBlur={validate}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select referral type</option>
          <option value="Academic Intervention">Academic Intervention</option>
          <option value="Behavioural Support">Behavioural Support</option>
          <option value="Social  Skills Development">Social  Skills Development</option>
          <option value="Executive Function Coaching">Executive Function Coaching</option>
          <option value="Therapeuntic Services">Therapeuntic Services</option>
          <option value="Assistive Coaching">Assistive Coaching</option>
          <option value="Therapeuntic Services">Therapeuntic Services</option>
        </select>
        {errors.referralType && (
          <p className="text-red-500 text-sm">{errors.referralType}</p>
        )}
      </div>


      <div>
        <label className="block text-sm font-medium">Referral Manager</label>
        <select
          name="ref_manager"
          value={formData.ref_manager || ""}
          onChange={handleChange}
          onBlur={validate}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select manager</option>
          {users.map((u: any) => (
            <option key={u.id} value={u.id}>
              {u.username || u.email}
            </option>
          ))}
        </select>
        {errors.ref_manager && (
          <p className="text-red-500 text-sm">{errors.ref_manager}</p>
        )}
      </div>


      <div>
        <label className="block text-sm font-medium">
          Special Education Label
        </label>
        <select
          name="specialEducationLabel"
          value={formData.specialEducationLabel || ""}
          onChange={handleChange}
          onBlur={validate}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select label</option>
          {specialEducationLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        {errors.specialEducationLabel && (
          <p className="text-red-500 text-sm">{errors.specialEducationLabel}</p>
        )}
      </div>
    </div>
  );
};

export default ReferrerInfo;
