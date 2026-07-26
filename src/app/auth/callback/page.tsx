"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      // Wait for Supabase to process the OAuth callback
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/");
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-lg text-muted-foreground mb-4">
          Signing you in...
        </div>
        <div className="inline-block animate-spin">⏳</div>
      </div>
    </div>
  );
}