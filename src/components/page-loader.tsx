"use client";

import { Loader } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Loader className="size-6 animate-spin  text-muted-foreground" />
    </div>
  );
};
export default PageLoader;
