import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-end items-center">
      <Loader className="size-6 animate-spin  text-muted-foreground" />
    </div>
  );
};
export default Loading;
