import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { KeyRound } from "lucide-react";

export default function AdminResetPassword() {
    const [location, setLocation] = useLocation();
    const { toast } = useToast();

    // Extract token from URL query params
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    const form = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const resetMutation = useMutation({
        mutationFn: async (data: any) => {
            if (data.newPassword !== data.confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword: data.newPassword }),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message || "Failed to reset password");
            }
            return res.json();
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Password reset successfully. Please login.",
            });
            setLocation("/admin/login");
        },
        onError: (error: Error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <Card className="w-[400px] border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-600">Invalid Link</CardTitle>
                        <CardDescription>
                            This password reset link is invalid or missing a token.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Link href="/admin/login">
                            <Button variant="outline" className="w-full">
                                Back to Login
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-[400px]">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <KeyRound className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Set New Password</CardTitle>
                    <CardDescription>
                        Choose a strong password for your admin account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={form.handleSubmit((data) => resetMutation.mutate(data))}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                {...form.register("newPassword", { required: true, minLength: 6 })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...form.register("confirmPassword", { required: true })}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={resetMutation.isPending}
                        >
                            {resetMutation.isPending ? "Updating..." : "Reset Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
