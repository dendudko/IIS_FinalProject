import React from 'react';

const AggregationControls = ({ onChange }) => {
    return (
        <div className={'aggregations'}>
            <label style={{ color: 'green' }}>
                <input type="checkbox" value="min" onChange={onChange} />
                Min
            </label>
            <label style={{ color: 'blue' }}>
                <input type="checkbox" value="avg" onChange={onChange} />
                Avg
            </label>
            <label style={{ color: 'red' }}>
                <input type="checkbox" value="max" defaultChecked onChange={onChange} />
                Max
            </label>
        </div>
    );
};

export default AggregationControls;
