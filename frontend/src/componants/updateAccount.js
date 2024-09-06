import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateAccount() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [type, setType] = useState('');
    const [source, setSource] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/account/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const transaction = response.data.data;
                setType(transaction.type);
                setSource(transaction.source);
                setAmount(transaction.amount);
                setDate(transaction.date);
            } catch (error) {
                setError('Erreur lors de la récupération des données.');
                console.error(error);
            }
        };

        fetchTransaction();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/account/${id}`,
                {
                    type: type,
                    source: source,
                    amount: amount,
                    date: date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setMessage('Transaction mise à jour avec succès !');
            setLoading(false);

            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            console.error('Erreur lors de la mise à jour', error);
            setError('Impossible de mettre à jour la transaction.');
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Mettre à jour une transaction</h2>

            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Type :</label>
                    <div className="flex space-x-4">
                        <div>
                            <input
                                type="radio"
                                id="entree"
                                name="type"
                                value="entree"
                                checked={type === 'entree'}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <label htmlFor="entree">Entrée</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="sortie"
                                name="type"
                                value="sortie"
                                checked={type === 'sortie'}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <label htmlFor="sortie">Sortie</label>
                        </div>
                    </div>
                </div>

                <div>
                    <label>Source :</label>
                    <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                <div>
                    <label>Montant :</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                <div>
                    <label>Date :</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {loading ? 'Mise à jour en cours...' : 'Mettre à jour'}
                </button>
            </form>
        </div>
    );
}

export default UpdateAccount;
