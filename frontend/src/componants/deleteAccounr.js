import React, { useState } from 'react';
import axios from 'axios';

function DeleteButton({ itemId }) {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        // Récupération du token depuis le local storage
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token non trouvé. Veuillez vous reconnecter.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            // Requête DELETE pour supprimer l'élément
            const response = await axios.delete(`http://127.0.0.1:8000/api/account/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setSuccessMessage('L\'élément a été supprimé avec succès!');
            console.log('Réponse de suppression', response.data);
        } catch (err) {
            setError('Erreur lors de la suppression. Vérifiez vos informations.');
            console.error('Erreur lors de la suppression', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" mx-auto bg-white shadow-lg rounded-lg text-center">
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
                onClick={handleDelete}
                className=" bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
                {loading ? 'Suppression en cours...' : 'Supprimer'}
            </button>
        </div>
    );
}

export default DeleteButton;
