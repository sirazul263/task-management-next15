"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
const ErrorPage = () => {
  return (
    <div className="h-screen flex gap-y-4 flex-col items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong!</p>
      <Button variant="secondary" size="sm" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
};
export default ErrorPage;
