// COURTESY OF CHATGPT 3.5

import React from 'react';

const StarRating = ({ percentage }) => {
    // Ensure the percentage is within the valid range (0 to 100)
    const normalizedPercentage = Math.min(100, Math.max(0, percentage));

    // Calculate the number of filled stars
    const filledStars = Math.round((normalizedPercentage / 100) * 5);

    return (
        <div className="flex items-center">
            {/* Filled Stars */}
            {[...Array(filledStars)].map((_, index) => (
                <svg
                    key={index}
                    className="w-6 h-6 text-yellow-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                </svg>
            ))}

            {/* Empty Stars */}
            {[...Array(5 - filledStars)].map((_, index) => (
                <svg
                    key={index}
                    className="w-6 h-6 text-gray-300 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;
