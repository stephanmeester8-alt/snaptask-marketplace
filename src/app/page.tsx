"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, []);

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">🚀 SnapTask</div>
          <nav>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Sign In with Google
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Get tasks done. Fast.
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Post a task, get it done. Simple as that.
          </p>

          {user ? (
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                📋 Browse Tasks
              </button>
              <button className="px-6 py-3 border border-border rounded-md hover:bg-accent/5">
                ➕ Create Task
              </button>
            </div>
          ) : (
            <div className="text-muted-foreground">
              Sign in to get started
            </div>
          )}
        </div>
      </section>

      {/* Status */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center border-t border-border">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Tasks Posted</div>
          </div>
          <div>
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Tasks Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold">0€</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </div>
        </div>
      </section>
    </main>
  );
}