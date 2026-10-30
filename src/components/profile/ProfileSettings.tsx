"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2Icon,
  ImageIcon,
  InfoIcon,
  LockIcon,
  MailIcon,
  SaveIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type ProfileUser = {
  name: string;
  email: string;
  image: string | null;
};

type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;

interface ProfileSettingsProps {
  user: ProfileUser;
}

function StatusMessage({ status }: { status: FormStatus }) {
  if (!status) return null;

  return (
    <p
      role="status"
      className={cn(
        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
        status.type === "success"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-600"
      )}
    >
      {status.type === "success" ? (
        <CheckCircle2Icon className="size-4 shrink-0" />
      ) : (
        <InfoIcon className="size-4 shrink-0" />
      )}
      {status.message}
    </p>
  );
}

const inputClassName = "h-10 border-input/60 bg-muted/40 pl-9";

const submitButtonClassName =
  "h-11 rounded-xl bg-[#199cb6] px-6 text-base hover:bg-[#158aa2] disabled:opacity-60";

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const router = useRouter();

  // Personal information form
  const [name, setName] = React.useState(user.name);
  const [imageUrl, setImageUrl] = React.useState(user.image ?? "");
  const [profileStatus, setProfileStatus] = React.useState<FormStatus>(null);
  const [savingProfile, setSavingProfile] = React.useState(false);

  // Change password form
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordStatus, setPasswordStatus] = React.useState<FormStatus>(null);
  const [savingPassword, setSavingPassword] = React.useState(false);

  const handleProfileSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSavingProfile(true);
    setProfileStatus(null);

    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: imageUrl.trim(),
    });

    if (error) {
      setProfileStatus({
        type: "error",
        message:
          error.message || "Could not update your profile. Please try again.",
      });
      setSavingProfile(false);
      return;
    }

    try {
      // Force a session re-read from the database so the better-auth
      // cookie cache (7 days in this app) picks up the fresh user data.
      await authClient.getSession({ query: { disableCookieCache: true } });
    } catch {
      // Non-fatal: the refresh below still re-renders the page.
    }

    setProfileStatus({
      type: "success",
      message: "Your profile has been updated successfully.",
    });
    setSavingProfile(false);
    router.refresh();
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        message: "New passwords do not match.",
      });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordStatus({
        type: "error",
        message: "Password must be at least 8 characters long.",
      });
      return;
    }

    setSavingPassword(true);

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });

    if (error) {
      setPasswordStatus({
        type: "error",
        message:
          error.message ||
          "Could not change your password. Please try again.",
      });
      setSavingPassword(false);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordStatus({
      type: "success",
      message: "Your password has been changed successfully.",
    });
    setSavingPassword(false);
  };

  return (
    <>
      {/* Personal information */}
      <Card className="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm ring-0">
        <CardHeader className="px-0">
          <CardTitle className="text-lg font-bold text-slate-900">
            Personal information
          </CardTitle>
          <CardDescription>
            Update your name and profile picture. Your email address cannot be
            changed here.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <form
            onSubmit={handleProfileSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-name">Full name</Label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="profile-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-image">Profile picture URL</Label>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="profile-image"
                  name="image"
                  type="url"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-email">Email address</Label>
              <div className="relative">
                <MailIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="profile-email"
                  value={user.email}
                  disabled
                  className={inputClassName}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Contact support to change the email address on your account.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="submit"
                disabled={savingProfile}
                className={submitButtonClassName}
              >
                <SaveIcon className="size-4" />
                {savingProfile ? "Saving..." : "Save changes"}
              </Button>
              <StatusMessage status={profileStatus} />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card className="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm ring-0">
        <CardHeader className="px-0">
          <CardTitle className="text-lg font-bold text-slate-900">
            Change password
          </CardTitle>
          <CardDescription>
            Choose a strong password you don&apos;t use anywhere else. You&apos;ll
            stay signed in on this device.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <form
            onSubmit={handlePasswordSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="current-password">Current password</Label>
              <div className="relative">
                <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="current-password"
                  name="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(event.target.value)
                  }
                  placeholder="Enter your current password"
                  autoComplete="current-password"
                  required
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="new-password">New password</Label>
                <div className="relative">
                  <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirm-password">Confirm new password</Label>
                <div className="relative">
                  <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Repeat the new password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="submit"
                disabled={savingPassword}
                className={submitButtonClassName}
              >
                <ShieldCheckIcon className="size-4" />
                {savingPassword ? "Updating..." : "Update password"}
              </Button>
              <StatusMessage status={passwordStatus} />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
