import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [_, setLocation] = useLocation();
    const { toast } = useToast();
    const [resetSent, setResetSent] = useState(false);

    const loginForm = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const resetForm = useForm({
        defaultValues: {
            email: "",
        },
    });

    const loginMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Invalid credentials");
            return res.json();
        },
        onSuccess: () => {
            toast({
                title: "Welcome back",
                description: "Logged in successfully",
            });
            setLocation("/admin");
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Login failed",
                description: "Please check your credentials",
            });
        },
    });

    const resetPasswordMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message || "Failed to send reset link");
            }
            return res.json();
        },
        onSuccess: () => {
            setResetSent(true);
            toast({
                title: "Reset link sent",
                description: "Check your email for instructions",
            });
        },
        onError: (error: Error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-[400px]">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="admin@example.com"
                                {...loginForm.register("username")}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                {...loginForm.register("password")}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t">
                        <h4 className="text-sm font-medium text-center mb-4">Forgot Password?</h4>
                        {resetSent ? (
                            <div className="text-sm text-center text-green-600">
                                Reset link sent! Check your email (including spam folder).
                            </div>
                        ) : (
                            <form
                                onSubmit={resetForm.handleSubmit((data) => resetPasswordMutation.mutate(data))}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your admin email"
                                        {...resetForm.register("email")}
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    type="submit"
                                    className="w-full"
                                    disabled={resetPasswordMutation.isPending}
                                >
                                    {resetPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </form>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
