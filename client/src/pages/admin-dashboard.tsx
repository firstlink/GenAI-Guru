import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { LogOut, Loader2, Users, MessageSquare } from "lucide-react";
import type { Lead, Contact, User } from "@shared/schema";

export default function AdminDashboard() {
    const [_, setLocation] = useLocation();

    const { data: user, isLoading: isLoadingUser, error: userError } = useQuery<{ user: User }>({
        queryKey: ["/api/user"],
        retry: false,
    });

    const { data: leads, isLoading: isLoadingLeads } = useQuery<{ leads: Lead[] }>({
        queryKey: ["/api/leads"],
        enabled: !!user,
    });

    const { data: contacts, isLoading: isLoadingContacts } = useQuery<{ contacts: Contact[] }>({
        queryKey: ["/api/contacts"],
        enabled: !!user,
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await fetch("/api/logout", { method: "POST" });
        },
        onSuccess: () => {
            setLocation("/admin/login");
        },
    });

    // Redirect if not logged in
    if (!isLoadingUser && (userError || !user)) {
        setLocation("/admin/login");
        return null;
    }

    if (isLoadingUser) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Logged in as {user?.user?.username}</span>
                        <Button variant="outline" size="sm" onClick={() => logoutMutation.mutate()}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Tabs defaultValue="contacts" className="w-full">
                    <TabsList className="grid w-[400px] grid-cols-2 mb-8">
                        <TabsTrigger value="contacts" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Contacts ({contacts?.contacts?.length || 0})
                        </TabsTrigger>
                        <TabsTrigger value="leads" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Leads ({leads?.leads?.length || 0})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="contacts">
                        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead className="w-[40%]">Message</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoadingContacts ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8">
                                                <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                            </TableCell>
                                        </TableRow>
                                    ) : contacts?.contacts?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                                No contact submissions yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        contacts?.contacts?.map((contact) => (
                                            <TableRow key={contact.id}>
                                                <TableCell className="whitespace-nowrap text-gray-500">
                                                    {contact.createdAt ? format(new Date(contact.createdAt), "MMM d, yyyy h:mm a") : "-"}
                                                </TableCell>
                                                <TableCell className="font-medium">{contact.name}</TableCell>
                                                <TableCell>{contact.email}</TableCell>
                                                <TableCell>{contact.subject}</TableCell>
                                                <TableCell className="text-gray-600 leading-relaxed">
                                                    {contact.message}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="leads">
                        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Source</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoadingLeads ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                            </TableCell>
                                        </TableRow>
                                    ) : leads?.leads?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                                No leads yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        leads?.leads?.map((lead) => (
                                            <TableRow key={lead.id}>
                                                <TableCell className="whitespace-nowrap text-gray-500">
                                                    {lead.createdAt ? format(new Date(lead.createdAt), "MMM d, yyyy h:mm a") : "-"}
                                                </TableCell>
                                                <TableCell className="font-medium">{lead.fullName}</TableCell>
                                                <TableCell>{lead.email}</TableCell>
                                                <TableCell>{lead.phone || "-"}</TableCell>
                                                <TableCell>{lead.currentRole || "-"}</TableCell>
                                                <TableCell className="text-gray-500 text-sm">{lead.source}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
