import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteAccount from './deleteAccount';
import { useNavigate } from 'react-router-dom';
import DoughnutChart from './DoughnutChart';

function Account() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/account', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
                setError('Impossible de récupérer les données.');
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleDelete = (deletedId) => {
        setData(data.filter((transaction) => transaction.id !== deletedId));
    };

    const handleUpdate = (id) => {
        navigate(`/account/update/${id}`);
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }
    const total = () => {
        const totalEntree = data
            .filter(transaction => transaction.type === 'entree')
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const totalSortie = data
            .filter(transaction => transaction.type === 'sortie')
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const calculTotal = totalEntree - totalSortie;

        const textColor = calculTotal >= 0 ? 'text-green-400' : 'text-red-500';

        return (

            <div> Votre Solde : <span className={textColor}>{calculTotal}</span>€</div>

        );
    };


    return (
        <div className="p-6">
            <h1 className='text-6xl pb-3'>{total()}</h1>

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Transactions récentes :</h3>
                {data.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <p className="flex-1">
                                <strong>Montant : </strong>
                                <span className={transaction.type === 'sortie' ? 'text-red-500' : 'text-green-500'}>
                                    {transaction.amount}€
                                </span>
                            </p>
                            <p className="flex-1">
                                <strong>Source :</strong> {transaction.source}
                            </p>
                            <p className="flex-1">
                                <strong>Type :</strong> {transaction.type}
                            </p>
                            <p className="flex-1">
                                <strong>Date :</strong> {transaction.date}
                            </p>
                            <DeleteAccount itemId={transaction.id} onDelete={handleDelete} />
                            <button
                                className="text-blue-500 hover:underline ml-4"
                                onClick={() => handleUpdate(transaction.id)}
                            >
                                Modifier
                            </button>

                        </div>
                    </div>
                ))}
            </div>
            <div className="my-8">
                <DoughnutChart />
            </div>
        </div>
    );
}

export default Account;
