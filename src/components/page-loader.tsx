"use client";

import { Loader } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex  justify-center items-center h-screen">
      <Loader className="size-6 animate-spin  text-muted-foreground" />
    </div>
  );
};
export default PageLoader;
