"use client";

import { bangladeshDistricts } from "@/components/data/District";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import bkash from "@/images/tools/bkash.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import Preview from "./ApplicationPreview";

const currentYear = new Date().getFullYear();
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const formSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(1, "Student name is required")
    .max(40, "Must be 40 characters or less"),

  fatherName: z
    .string()
    .trim()
    .min(1, "Father's name is required")
    .max(40, "Must be 40 characters or less"),

  motherName: z
    .string()
    .trim()
    .min(1, "Mother's name is required")
    .max(40, "Must be 40 characters or less"),

  fatherOccupation: z
    .string()
    .trim()
    .min(1, "Father's occupation is required")
    .max(40, "Must be 40 characters or less"),

  birthDate: z
    .string()
    .trim()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Date must be in the format dd/mm/yyyy",
    ),

  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "Mobile number must be between 10-15 digits"),

  guardianNumber: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "Guardian number must be between 10-15 digits"),

  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender is required and must be valid" }),
  }),

  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"], {
    errorMap: () => ({ message: "Marital status is required" }),
  }),

  bloodGroup: z
    .string()
    .trim()
    .regex(/^(A|B|AB|O)[+-]$/, "Blood group must be valid (e.g., A+, B-, O+)"),

  religion: z.string().trim().min(1, "Religion is required"),

  nationality: z.string().trim().min(1, "Nationality is required"),

  nidBirthReg: z.string().trim().min(1, "NID/Birth registration is required"),

  email: z.string().trim().email("Invalid email address").optional(),

  fullAddress: z.string().trim().min(5, "Full address is required"),

  district: z.string().trim().min(1, "District is required"),

  education: z.string().trim().min(1, "Education is required"),

  trxId: z.string().trim().min(1, "Transaction ID is required"),

  educationBoard: z.string().trim().min(1, "Education board is required"),

  rollNumber: z.string().trim().min(1, "Roll number is required"),

  regNumber: z.string().trim().min(1, "Registration number is required"),

  passingYear: z
    .number({
      required_error: "Passing year is required",
      invalid_type_error: "Passing year must be a number",
    })
    .min(1990, "Passing year must be 1990 or later")
    .max(currentYear, `Passing year cannot be later than ${currentYear}`),

  gpaCgpa: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "GPA/CGPA must be a valid number (e.g., 4.00)")
    .min(1, "GPA/CGPA is required"),

  course: z.string().trim().min(1, "Course is required"),

  session: z.string().trim().min(1, "Session is required"),

  duration: z.string().trim().min(1, "Duration is required"),

  pc: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Specify if you have a computer (Yes/No)" }),
  }),

  image: z
    .any()
    .refine((file) => file?.length == 1, "Image is required.")
    .refine(
      (file) => file?.[0]?.size <= MAX_FILE_SIZE,
      `Image size must be less than 5MB`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png, and .webp files are allowed",
    ),
});

const generateSessionOptions = () => {
  const currentYear = new Date().getFullYear();
  const options = [];

  // Include next year sessions first
  options.push(`${currentYear + 1} July-Dec`, `${currentYear + 1} Jan-June`);

  // Include current year sessions
  options.push(`${currentYear} July-Dec`, `${currentYear} Jan-June`);

  // Include previous year sessions
  for (let year = currentYear - 1; year >= 2010; year--) {
    options.push(`${year} July-Dec`, `${year} Jan-June`);
  }

  return options;
};

export function StudentApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      fatherName: "",
      motherName: "",
      fatherOccupation: "",
      birthDate: "",
      mobileNumber: "",
      guardianNumber: "",
      gender: undefined,
      maritalStatus: undefined,
      bloodGroup: "",
      trxId: "",
      religion: "",
      nationality: "Bangladeshi",
      nidBirthReg: "",
      email: "",
      fullAddress: "",
      district: "",
      education: "",
      educationBoard: "",
      rollNumber: "",
      regNumber: "",
      passingYear: currentYear,
      gpaCgpa: "",
      course: "",
      session: "",
      duration: "",
      pc: undefined,
    },
  });

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    },
    [],
  );

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    toast.loading("Please wait...");

    try {
      // Convert values to FormData
      const formData = new FormData();

      // Use a type guard to ensure key is a valid key
      (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
        if (key === "image" && values[key]) {
          // Handle image upload separately if present
          formData.append("image", values[key][0]); // Assuming `image` is a FileList
        } else {
          const value = values[key];
          if (value !== undefined && value !== null) {
            formData.append(key, value as string);
          }
        }
      });

      const response = await axios.post(
        "/api/best-computer/application",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Application was successfully submitted");
        setPreviewImage(null);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred");
    } finally {
      toast.dismiss();
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-3xl font-bold">
            Student Application Form
          </CardTitle>
          <CardDescription>
            Please fill out all the required information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Personal Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="studentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Md Mohon" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="md:row-span-3">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                              <>
                                <Label>
                                  <div
                                    className="h-32 w-32 cursor-pointer overflow-hidden rounded-lg border-2 border-dashed"
                                    onClick={handleImageClick}
                                  >
                                    {previewImage ? (
                                      <Image
                                        src={previewImage}
                                        alt="Preview"
                                        width={128}
                                        height={128}
                                        objectFit="cover"
                                      />
                                    ) : (
                                      <div className="flex h-full items-center justify-center text-gray-400">
                                        Click to upload
                                      </div>
                                    )}
                                  </div>

                                  <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      onChange(e.target.files);
                                      onImageChange(e);
                                    }}
                                    {...rest}
                                  />
                                </Label>
                              </>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father&#39;s Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Father name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="motherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother&#39;s Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Mother name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fatherOccupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father&#39;s Occupation</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Father's Occupation"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birth Date</FormLabel>
                          <FormControl>
                            <Input placeholder="13/01/2000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marital Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Marital Status</SelectLabel>

                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
                                <SelectItem value="Divorced">
                                  Divorced
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Group</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Blood Group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="religion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Religion</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Religion" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="islam">Islam</SelectItem>
                              <SelectItem value="hinduism">Hinduism</SelectItem>
                              <SelectItem value="christianity">
                                Christianity
                              </SelectItem>
                              <SelectItem value="buddhism">Buddhism</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input placeholder="Bangladeshi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nidBirthReg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NID/Birth Reg.</FormLabel>
                          <FormControl>
                            <Input placeholder="NID/Birth Reg." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Contact Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Mobile Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guardianNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guardian Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Guardian Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fullAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your District" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bangladeshDistricts.map((District) => (
                                <SelectItem key={District} value={District}>
                                  {District}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Educational Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Education" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="jsc">JSC</SelectItem>
                              <SelectItem value="ssc">SSC</SelectItem>
                              <SelectItem value="hsc">HSC</SelectItem>
                              <SelectItem value="bachelor">Bachelor</SelectItem>
                              <SelectItem value="masters">Masters</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="educationBoard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education Board</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Education Board" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dhaka">Dhaka</SelectItem>
                              <SelectItem value="chittagong">
                                Chittagong
                              </SelectItem>
                              <SelectItem value="rajshahi">Rajshahi</SelectItem>
                              <SelectItem value="jessore">Jessore</SelectItem>
                              <SelectItem value="comilla">Comilla</SelectItem>
                              <SelectItem value="sylhet">Sylhet</SelectItem>
                              <SelectItem value="dinajpur">Dinajpur</SelectItem>
                              <SelectItem value="barishal">Barishal</SelectItem>
                              <SelectItem value="madrasah">Madrasah</SelectItem>
                              <SelectItem value="technical">
                                Technical
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rollNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roll Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Roll Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="regNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reg. Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Registration Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="passingYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passing Year</FormLabel>
                          <FormControl>
                            <Input placeholder="Passing Year" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gpaCgpa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GPA/CGPA</FormLabel>
                          <FormControl>
                            <Input placeholder="GPA/CGPA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Course Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Your Course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Course</SelectLabel>
                                <SelectItem value="office application">
                                  Office Application
                                </SelectItem>
                                <SelectItem value="database programming">
                                  Database Programming
                                </SelectItem>
                                <SelectItem value="digital marketing">
                                  Digital Marketing
                                </SelectItem>
                                <SelectItem value="graphics design">
                                  Graphics Design
                                </SelectItem>
                                <SelectItem value="web development">
                                  Web Design & Development
                                </SelectItem>
                                <SelectItem value="video editing">
                                  Video Editing
                                </SelectItem>
                                <SelectItem value="ethical hacking">
                                  Ethical Hacking
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="session"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Session</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your session" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Session</SelectLabel>
                                {generateSessionOptions().map(
                                  (option, index) => (
                                    <SelectItem key={index} value={option}>
                                      {option}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Course Duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Course Duration</SelectLabel>

                                <SelectItem value="free">
                                  Free (conditions apply)
                                </SelectItem>
                                <SelectItem value="1 month">1 Month</SelectItem>
                                <SelectItem value="3 month">3 Month</SelectItem>
                                <SelectItem value="6 month">6 Month</SelectItem>
                                <SelectItem value="1 year">1 Year</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do you have computer?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Payment Information
                  </h2>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://shop.bkash.com/mia-store01779120023/pay/bdt100/ZHHBE3"
                      className="relative mt-2 flex w-fit items-center gap-2 rounded-lg border bg-secondary px-2 shadow-lg"
                    >
                      <Image src={bkash} alt="bkash" className="w-20" />
                      <span>Pay with bkash</span>
                      <div className="absolute -right-6 top-0 h-3 w-3 animate-ping rounded-full bg-pink-600"></div>
                    </Link>
                    <FormField
                      control={form.control}
                      name="trxId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TransactionID</FormLabel>
                          <FormControl>
                            <Input placeholder="TransactionID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-sm border border-primary p-2">
                <p>
                  ১০০/= টাকা আবেদন ফি সহ- কোর্স ফি বিকাশ পেমেন্ট করে,
                  Transaction ID লিখুন। তারপর Submit করুন। অবশ্যই পেমেন্ট রিসিট
                  মূল ফরম এর সাথে সংযুক্ত করতে হবে
                </p>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:gap-10">
                <Preview />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
