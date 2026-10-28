import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function MyAssets(){
      const navigate = useNavigate();
  return(
    <div className="h-full w-full flex items-center justify-center flex-col gap-3">
    <h1>My Assets page is now under development</h1>
    <Button className="rounded-md" onClick={() => navigate("/dashboard")}> Return to Dashboard </Button>
    </div>
  )
}