import Login from "../componants/login";
import { NavLink, useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">HOME</h1>

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <Login />
            </div>

            <h3 className="mt-6 text-lg text-gray-600">Pas de compte?</h3>
            <NavLink to={'/register'}>
                <button

                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Inscription
                </button></NavLink>
        </div>
    );
}

export default Home;
