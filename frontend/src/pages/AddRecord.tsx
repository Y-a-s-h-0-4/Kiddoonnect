
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppLayout } from "@/components/layout/AppLayout";
import { RecordUploader } from "@/components/records/RecordUploader";
import { useNavigate, useLocation } from "react-router-dom";
import { ChildSearch } from "@/components/hospital/ChildSearch";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft } from "lucide-react";

const AddRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedChild, setSelectedChild] = useState<{ id: string; name: string } | null>(null);
  
  useEffect(() => {
    // Check if there are query parameters for childId and childName
    const params = new URLSearchParams(location.search);
    const childId = params.get("childId");
    const childName = params.get("childName");
    
    if (childId && childName) {
      setSelectedChild({ id: childId, name: childName });
    }
  }, [location.search]);
  
  const handleSuccess = () => {
    navigate("/hospital-dashboard");
  };
  
  const handleSelectChild = (childId: string, childName: string) => {
    setSelectedChild({ id: childId, name: childName });
  };
  
  return (
    <PageTransition>
      <AppLayout userType="hospital">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigate(-1)}
                aria-label="Go back"
              >
                <ArrowLeft size={16} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Add Medical Record</h1>
                <p className="text-muted-foreground">
                  Upload a new medical record for a child
                </p>
              </div>
            </div>
            
            {!selectedChild ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-lg font-medium">Search for a Child</h2>
                    <p className="text-muted-foreground">
                      Please search and select a child to add a medical record
                    </p>
                    <div className="max-w-md mx-auto">
                      <ChildSearch onSelectChild={handleSelectChild} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium">{selectedChild.name}</h2>
                      <p className="text-sm text-muted-foreground">ID: {selectedChild.id}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="ml-auto"
                      onClick={() => setSelectedChild(null)}
                    >
                      Change
                    </Button>
                  </CardContent>
                </Card>
                
                <div className="bg-card border rounded-lg p-6">
                  <RecordUploader 
                    children={[{ id: selectedChild.id, name: selectedChild.name }]} 
                    onSuccess={handleSuccess}
                    userType="hospital"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </PageTransition>
  );
};

export default AddRecord;
