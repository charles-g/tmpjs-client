import React, { useState } from 'react';
import type { SearchResults } from 'algoliasearch-helper';
import type { Connector } from 'instantsearch.js';

export type DatepickerConnectorParams = {
    attribute: string,
};

const CustomDateRange = ({ currentRefinement, refine }) => {

    const [startDate, setStartDate] = useState(currentRefinement.min || '');
    const [endDate, setEndDate] = useState(currentRefinement.max || '');

    const handleApply = () => {
        if (startDate && endDate) {
            refine({
                min: new Date(startDate).getTime(),
                max: new Date(endDate).getTime(),
            });
        } else {
            refine({});
        }
    };

    return (
        <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <label htmlFor="endDate">End Date:</label>
            <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

            <button onClick={handleApply}>Apply</button>
        </div>
    );
};

const CustomDateRangeWidget = connectRange(CustomDateRange);

export default CustomDateRangeWidget;
