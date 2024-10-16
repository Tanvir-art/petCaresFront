import AdminNavbar from "@/components/AdminNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Manage users, posts, and payment history.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen">
            {/* Sidebar (Responsive handled in AdminNavbar component) */}
            <AdminNavbar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <main className="p-4 bg-gray-100 flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
