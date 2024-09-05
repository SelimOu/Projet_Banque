import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');


        try {
            const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            navigate('/');

            alert('Déconnexion réussie');
        } catch (error) {
            console.error('Erreur lors de la déconnexion', error);
        }
    };

    return (
        <div>
            <button className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-800 transition duration-300" onClick={handleLogout}>
                Se déconnecter
            </button>
        </div >
    );
}

export default Logout;
