"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-snack-primary">
            Snack Reviews Admin
          </h1>
        </div>
        <nav className="mt-8">
          <Link
            href="/dashboard"
            className={`block px-4 py-2 text-gray-700 hover:bg-snack-primary hover:text-white ${
              router.pathname === "/dashboard"
                ? "bg-snack-primary text-white"
                : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/create-customer"
            className={`block px-4 py-2 text-gray-700 hover:bg-snack-primary hover:text-white ${
              router.pathname === "/create-customer"
                ? "bg-snack-primary text-white"
                : ""
            }`}
          >
            Create Customer Review
          </Link>
          <Link
            href="/view-customers"
            className={`block px-4 py-2 text-gray-700 hover:bg-snack-primary hover:text-white ${
              router.pathname === "/view-customers"
                ? "bg-snack-primary text-white"
                : ""
            }`}
          >
            View Customers
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </nav>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">{children}</div>
    </div>
  );
}
