import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth";
import LogoutButton from "../../components/LogoutButton"
export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-2">
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>
            <p className="text-gray-700 ">
                Welcome, {session.user?.email}
            </p>
            <LogoutButton />
        </div>
    )
}