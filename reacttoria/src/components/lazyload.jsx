import React from 'react';

function LazyLoadSpinner() {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
                <div className="loading-spinner mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading...</p>
            </div>
        </div>
    );
}

export default LazyLoadSpinner;