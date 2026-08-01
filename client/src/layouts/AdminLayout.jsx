import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {

    return (

        <div className="flex">

            <Sidebar />

            <main className="ml-72 flex-1 bg-slate-900 min-h-screen p-8">

                {children}

            </main>

        </div>

    );

}