import React from 'react';

export const ErrorView: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className="error-view">
            <p>{message}</p>
        </div>
    );
};