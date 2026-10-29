"use client";

import React from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/google-icon";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
    const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const formData = new FormData(e.currentTarget);
  
      const email = String(formData.get("email") ?? "");
      const password = String(formData.get("password") ?? "");
  
  
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
  
      if (error) {
        console.error("Signup error:", error);
        return;
      }
  
      if (data) {
        redirect('/')
      }
    };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Welcome Back
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Resume your adventure with Wanderlust
      </p>

      <Card className="mt-8 w-full max-w-md gap-5 bg-card px-6 py-8 shadow-sm">
        <CardContent className="flex flex-col gap-4 px-0">
          <form className="flex flex-col gap-4" onSubmit={handleEmailLogin}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="h-10 border-input/60 bg-muted/40 pl-9"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-10 border-input/60 bg-muted/40 pl-9"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium select-none">
                <Checkbox id="remember-me" name="rememberMe" />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#199cb6] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-1 h-11 w-full bg-[#199cb6] text-base hover:bg-[#158aa2]"
            >
              Sign In
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">
              Or continue with
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11 w-full border-border bg-card text-base hover:bg-muted"
          >
            <GoogleIcon className="size-4.5" />
            Sign Up With Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center border-t-0 bg-transparent px-0 pt-1 pb-0">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#199cb6] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignInPage;
