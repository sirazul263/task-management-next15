"use client";

import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Loader className="size-6 animate-spin  text-muted-foreground" />
    </div>
  );
};
export default Loading;
