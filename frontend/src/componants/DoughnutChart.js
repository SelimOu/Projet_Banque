import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://projet-banque-1.onrender.com/api/account', {
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

    const chartData = () => {
        let entree = 0;
        let sortie = 0;

        data.forEach((transaction) => {
            if (transaction.type === 'entree') {
                entree += transaction.amount;
            } else if (transaction.type === 'sortie') {
                sortie += Math.abs(transaction.amount);
            }
        });

        return {
            labels: ['Entrées', 'Sorties'],
            datasets: [
                {
                    label: 'Transactions',
                    data: [entree, sortie],
                    backgroundColor: ['#4caf50', '#f44336'],
                    hoverBackgroundColor: ['#66bb6a', '#e57373'],
                },
            ],
        };
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;

                        if (label === 'Entrées') {
                            return `Entrées: ${value}€ (Total: ${data.filter(t => t.type === 'entree').reduce((acc, t) => acc + t.amount, 0)}€)`;
                        } else if (label === 'Sorties') {
                            return `Sorties: ${value}€ (Total: ${data.filter(t => t.type === 'sortie').reduce((acc, t) => acc + Math.abs(t.amount), 0)}€)`;
                        }
                        return label + ': ' + value + '€';
                    },
                },
            },
        },
    };

    if (loading) {
        return <p>Chargement des données...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Transactions: Entrées vs Sorties</h2>
            <Doughnut data={chartData()} options={options} />
        </div>
    );
}

export default DoughnutChart;
