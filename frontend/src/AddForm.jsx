import React, { useState } from 'react';

function AddForm({ onAdd }) {
    const [formData, setFormData] = useState({
        ID: '',
        ingredient: '',
        used: '',
        weight: '',
        unit_price: '',
        nominal_price: '',
        actual_price: '',
        avg_density: '',
        density: '',
        price_grams: '',
        ppm: '',
        gst_tax: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8081/sys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            onAdd(data); // Notify parent component of new data
            setFormData({
                ID: '',
                ingredient: '',
                used: '',
                weight: '',
                unit_price: '',
                nominal_price: '',
                actual_price: '',
                avg_density: '',
                density: '',
                price_grams: '',
                ppm: '',
                gst_tax: '',
                description: ''
            }); // Reset form
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="ID" placeholder="ID" value={formData.ID} onChange={handleChange} required />
            <input type="text" name="ingredient" placeholder="Ingredient" value={formData.ingredient} onChange={handleChange} required />
            <input type="number" name="used" placeholder="Used" value={formData.used} onChange={handleChange} required />
            <input type="number" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} required />
            <input type="number" name="unit_price" placeholder="Unit Price" value={formData.unit_price} onChange={handleChange} required />
            <input type="number" name="nominal_price" placeholder="Nominal Price" value={formData.nominal_price} onChange={handleChange} required />
            <input type="number" name="actual_price" placeholder="Actual Price" value={formData.actual_price} onChange={handleChange} required />
            <input type="number" name="avg_density" placeholder="Avg Density" value={formData.avg_density} onChange={handleChange} required />
            <input type="number" name="density" placeholder="Density" value={formData.density} onChange={handleChange} required />
            <input type="number" name="price_grams" placeholder="Price Grams" value={formData.price_grams} onChange={handleChange} required />
            <input type="number" name="ppm" placeholder="PPM" value={formData.ppm} onChange={handleChange} required />
            <input type="number" name="gst_tax" placeholder="GST Tax" value={formData.gst_tax} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <button type="submit">Add Data</button>
        </form>
    );
}

export default AddForm;