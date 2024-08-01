import React from 'react';

function MultiplyButton({ onMultiply }) {
    return (
        <div>
            <button onClick={() => onMultiply(0.03)} className='multiply-button'>
                300 ppm
            </button>
            <button onClick={() => onMultiply(0.15)} className='multiply-button'>
                1,500 ppm
            </button>
            <button onClick={() => onMultiply(0.3)} className='multiply-button'>
                3,000 ppm
            </button>
            <button onClick={() => onMultiply(0.5)} className='multiply-button'>
                5,000 ppm
            </button>
            <button onClick={() => onMultiply(5)} className='multiply-button'>
                50,000 ppm
            </button>
        </div>
    );
}

export default MultiplyButton;