import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            const response = await axios.post('https://projet-banque-1.onrender.com/api/register', {
                name: name,
                email: email,
                password: password,
            });

            setSuccessMessage('Inscription réussie!');
            console.log('Inscription réussie', response.data);

            navigate('/');

        } catch (error) {
            console.error('Erreur lors de l\'inscription', error);
            setError('Erreur lors de l\'inscription. Vérifiez vos informations.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Register</h2>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md space-y-6"
            >
                <div>
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {loading ? 'Inscription en cours...' : 'Register'}
                </button>

            </form>
            <br></br>
            <a href='/'><button className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-800 transition duration-300">Annuler</button></a>
        </div>
    )
}

export default Register;
