import React, { useEffect, useState } from 'react';
import AddForm from './AddForm';
import MultiplyButton from './MultiplyButton';
import './Data.css';

function Data() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/sys");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
                setFilteredData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter(item =>
            item.ID.toString().includes(searchId) || searchId === ''
        );
        setFilteredData(filtered);
    }, [searchId, data]);

    const handleAddData = (newData) => {
        fetch("http://localhost:8081/sys", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        })
            .then(response => response.json())
            .then(data => {
                setData(prevData => [...prevData, data]);
                setFilteredData(prevData => [...prevData, data]);
            })
            .catch(error => {
                setError('Failed to add data: ' + error.message);
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8081/sys/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                setData(prevData => prevData.filter(item => item.ID !== id));
                setFilteredData(prevData => prevData.filter(item => item.ID !== id));
            })
            .catch(error => {
                setError('Failed to delete data: ' + error.message);
            });
    };

    const handleMultiply = (multiplier) => {
        const updatedData = data.map(item => ({
            ...item,
            weight: item.weight * multiplier,
            unit_price: item.unit_price * multiplier,
            nominal_price: item.nominal_price * multiplier,
            actual_price: item.actual_price * multiplier,
            avg_density: item.avg_density * multiplier,
            density: item.density * multiplier,
            price_grams: item.price_grams * multiplier,
            gst_tax: item.gst_tax * multiplier,
        }));

        setData(updatedData);
        setFilteredData(updatedData);
    };

    if (loading) return <p className="loading">Loading data, please wait...</p>;
    if (error) return <p className="error">Oops! Something went wrong: {error}</p>;

    return (
        <div>
            <h5>*All prices are in Rupees</h5>
            <h5>*Based on 10,000 ppm of Azadirachtin</h5>
            <h5>*Reload page to display original data </h5>
            <h1 id = 'title'>Nivaar Data</h1>
            <input
                type="text"
                placeholder="Search by ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="search-input"
            />
            <AddForm onAdd={handleAddData} />
            <MultiplyButton onMultiply={handleMultiply} /> 
            <table className="table">
                <thead className="head">
                    <tr>
                        <th>ID</th>
                        <th>Ingredient</th>
                        <th>Used</th>
                        <th>Weight</th>
                        <th>Unit Price</th>
                        <th>Nominal Price</th>
                        <th>Actual Price</th>
                        <th>Avg Density</th>
                        <th>Density</th>
                        <th>Price Grams</th>
                        <th>PPM</th>
                        <th>GST Tax</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((d) => (
                            <tr key={d.ID}>
                                <td>{d.ID}</td>
                                <td>{d.ingredient}</td>
                                <td>{d.used}</td>
                                <td>{d.weight}</td>
                                <td>{d.unit_price}</td>
                                <td>{d.nominal_price}</td>
                                <td>{d.actual_price}</td>
                                <td>{d.avg_density}</td>
                                <td>{d.density}</td>
                                <td>{d.price_grams}</td>
                                <td>{d.ppm}</td>
                                <td>{d.gst_tax}</td>
                                <td>{d.description}</td>
                                <td>
                                    <button onClick={() => handleDelete(d.ID)} id = "delete">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Data;