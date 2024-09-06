import React from 'react';
import axios from 'axios';

function DeleteAccount({ itemId, onDelete }) {
    const token = localStorage.getItem('token');

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/account/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            onDelete(itemId);
        } catch (error) {
            console.error('Erreur lors de la suppression de la transaction', error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        >
            Supprimer
        </button>
    );
}

export default DeleteAccount;
