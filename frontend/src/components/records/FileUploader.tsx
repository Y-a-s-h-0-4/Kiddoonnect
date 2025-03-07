
import { useState, useRef, useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadCloud, Eye, X, FileText, File } from "lucide-react";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { RecordFormValues, sampleReportURL } from "./schema";

interface FileUploaderProps {
  form: UseFormReturn<RecordFormValues>;
}

export function FileUploader({ form }: FileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"pdf" | "image" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sampleFile, setSampleFile] = useState(true); // Start with sample file

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSampleFile(false);
    form.setValue("file", e.target.files, { shouldValidate: true });

    // Create preview
    if (file.type === "application/pdf") {
      setPreviewType("pdf");
      setPreview(URL.createObjectURL(file));
    } else if (file.type.startsWith("image/")) {
      setPreviewType("image");
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setPreview(null);
    setPreviewType(null);
    form.setValue("file", undefined);
    setSampleFile(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Load sample file
  useEffect(() => {
    if (sampleFile) {
      setPreviewType("pdf");
      setPreview(sampleReportURL);
    }
  }, [sampleFile]);

  return (
    <FormField
      control={form.control}
      name="file"
      render={({ field: { onChange, ...rest } }) => (
        <FormItem>
          <FormLabel>Upload File (PDF or Image)</FormLabel>
          <FormControl>
            <div className="space-y-4">
              {!preview && !previewType ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors"
                >
                  <UploadCloud size={32} className="text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, JPEG, PNG (max 10MB)
                  </p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {previewType === "pdf" ? (
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                          <FileText size={24} />
                        </div>
                      ) : previewType === "image" && preview ? (
                        <div className="w-12 h-12 bg-blue-100 rounded-lg overflow-hidden">
                          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">
                          <File size={24} />
                        </div>
                      )}
                      
                      <div>
                        <p className="font-medium text-sm truncate max-w-[200px]">
                          {sampleFile ? "Sample Medical Report.pdf" : fileInputRef.current?.files?.[0]?.name || "File"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {fileInputRef.current?.files?.[0]?.size
                            ? (fileInputRef.current.files[0].size / 1024 / 1024).toFixed(2) + " MB"
                            : sampleFile ? "1.2 MB" : ""}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye size={14} className="mr-1" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>Document Preview</DialogTitle>
                          </DialogHeader>
                          <div className="h-full mt-4 overflow-auto">
                            {previewType === "pdf" ? (
                              <iframe 
                                src={preview || ""} 
                                className="w-full h-full min-h-[60vh]" 
                                title="PDF Preview"
                              />
                            ) : preview ? (
                              <img 
                                src={preview} 
                                alt="Preview" 
                                className="max-w-full mx-auto"
                              />
                            ) : null}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={clearFile}
                      >
                        <X size={18} className="text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  
                  {previewType === "image" && preview && (
                    <div className="mt-2 border rounded-lg overflow-hidden h-40 flex items-center justify-center bg-muted">
                      <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </motion.div>
              )}
              
              <input
                type="file"
                accept=".pdf,image/jpeg,image/png"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                {...rest}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
