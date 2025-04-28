//lazy.load.jsz

import React from 'react';

function LazyLoadSpinner() {

    return React.lazy(() => {
       <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    });
}

export default LazyLoadSpinner;