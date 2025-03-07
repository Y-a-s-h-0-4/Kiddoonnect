
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { RecordFormFields } from "./RecordFormFields";
import { FileUploader } from "./FileUploader";
import { RecordFormValues, recordFormSchema, RecordUploaderProps } from "./schema";

export function RecordUploader({ children, onSuccess, userType }: RecordUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<RecordFormValues>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: {
      title: "Annual Checkup Report",
      childId: children[0]?.id || "",
      category: "doctor-visit",
      date: new Date().toISOString().split("T")[0],
      notes: "Regular annual checkup with height, weight, and vaccination records.",
      file: undefined,
    },
  });

  const onSubmit = async (data: RecordFormValues) => {
    setIsUploading(true);
    
    try {
      // In a real app, we would upload to a backend service here
      console.log("Uploading record:", data);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Record uploaded successfully");
      
      // Reset form
      form.reset();
      
      // Callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to upload record. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <RecordFormFields form={form} children={children} />
        <FileUploader form={form} />
        
        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <UploadCloud size={16} className="mr-2" />
              Upload Record
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
