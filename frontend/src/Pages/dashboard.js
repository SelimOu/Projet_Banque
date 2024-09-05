import Account from "../componants/account";
import Logout from "../componants/logout.js";

function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <Logout />

            <div className="my-6">
                <a href="/createaccount">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                        Ajouter une transaction
                    </button>
                </a>
            </div>

            {/* Account Component */}
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <Account />
            </div>
        </div>
    );
}

export default Dashboard;
