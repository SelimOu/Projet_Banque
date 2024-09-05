import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteAccount from './deleteAccounr';

function Account() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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



    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }



    return (
        <div className="p-6">
            <div>
                {console.log(data)}
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
                            <DeleteAccount itemId={transaction.id} />
                        </div>


                    </div>
                ))}
            </div>
        </div>
    )

}

export default Account;
