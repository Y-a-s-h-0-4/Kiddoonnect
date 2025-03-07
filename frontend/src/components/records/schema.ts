
import { z } from "zod";

export const recordFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  childId: z.string({ required_error: "Please select a child" }),
  category: z.string({ required_error: "Please select a category" }),
  date: z.string({ required_error: "Please select a date" }),
  notes: z.string().optional(),
  file: z.any()
    .refine((file) => file?.length > 0, "File is required")
    .refine(
      (file) => {
        if (!file || file.length === 0) return false;
        const fileType = file[0].type;
        return fileType === "application/pdf" || fileType.startsWith("image/");
      },
      "File must be a PDF or an image (JPEG, PNG)"
    )
    .refine(
      (file) => {
        if (!file || file.length === 0) return false;
        return file[0].size <= 10 * 1024 * 1024; // 10MB
      },
      "File size must be less than 10MB"
    ),
});

export type RecordFormValues = z.infer<typeof recordFormSchema>;

export interface ChildOption {
  id: string;
  name: string;
}

export interface RecordUploaderProps {
  children: ChildOption[];
  onSuccess?: () => void;
  userType: "parent" | "hospital";
}

// Sample medical report PDF for preview
export const sampleReportURL = "https://www.scripps.org/sparkle-assets/documents/sample_after_visit_summary.pdf";
