import Login from "../componants/login";
import Register from "../componants/register";

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">HOME</h1>

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <Login />
            </div>

            <h3 className="mt-6 text-lg text-gray-600">Pas de compte?</h3>
            <a
                href="/register"
                className="mt-2 text-blue-500 hover:text-blue-700 underline"
            >
                Inscrivez-vous
            </a>
        </div>
    );
}

export default Home;
