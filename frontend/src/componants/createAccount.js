import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('');
    const [source, setSource] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        console.log(token);


        try {
            const response = await axios.post('http://127.0.0.1:8000/api/account', {
                type: type,
                source: source,
                amount: amount,
                date: date,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });

            setMessage('Transaction créée avec succès!');

            setUserId('');
            setType('');
            setSource('');
            setAmount('');
            setDate('');

            navigate('/dashboard');

        } catch (error) {
            console.log(token);

            console.error('Erreur lors de la création de la transaction:', error);
            setMessage('Erreur lors de la création de la transaction.');
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Créer une nouvelle transaction</h2>
            {message && <p className="text-red-500 mb-4">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Type:</label>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="entree"
                            name="type"
                            value="entree"
                            checked={type === 'entree'}
                            onChange={(e) => setType(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="entree" className="text-gray-800">Entrée</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="sortie"
                            name="type"
                            value="sortie"
                            checked={type === 'sortie'}
                            onChange={(e) => setType(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="sortie" className="text-gray-800">Sortie</label>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Source:</label>
                    <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Montant:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Date:</label>
                    <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Envoyer
                </button>
            </form>
        </div>

    );
}

export default CreateAccount;
