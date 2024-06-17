import React, {useState} from 'react';
import BuildingsTable from './BuildingsTable';
import BuildingsChart from "./BuildingsChart";
import AggregationControls from "./AggregationControls";

const Controls = () => {
    const [showBuildings, setShowBuildings] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const initialAggregations = ['max']; // Начальное значение aggregations
    const [aggregations, setAggregations] = useState(initialAggregations);

    const handleAggregationChange = (event) => {
        const value = event.target.value;
        setAggregations(prevAggregations =>
            prevAggregations.includes(value)
                ? prevAggregations.filter(item => item !== value)
                : [...prevAggregations, value]
        );
    };

    const handleBuildingsClick = () => {
        setShowBuildings(!showBuildings);
    };

    const handleChartClick = () => {
        if (showChart) {
            setShowChart(false);
            setAggregations(initialAggregations);
        } else {
            setShowChart(true);
        }
    };

    return (
        <div>
            <button onClick={handleChartClick} className={'button'}>
                {showChart ? 'Скрыть график' : 'Показать график'}
            </button>
            {showChart && <AggregationControls onChange={handleAggregationChange}/>}
            {showChart && <BuildingsChart aggregations={aggregations}/>}
            <br/>
            <div style={{marginTop: 3+'px'}}/>
            <button onClick={handleBuildingsClick} className={'button'}>
                {showBuildings ? 'Скрыть таблицу' : 'Показать таблицу'}
            </button>
            {showBuildings && <BuildingsTable/>}
        </div>
    );
};

export default Controls;
