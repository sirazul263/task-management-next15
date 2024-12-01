import { Loader } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="h-full min-h-screen flex justify-end items-center">
      <Loader className="size-6 animate-spin  text-muted-foreground" />
    </div>
  );
};
export default DashboardLoading;
