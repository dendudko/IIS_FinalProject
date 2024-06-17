import React, {useState} from 'react';
import BuildingsTable from './BuildingsTable';

const Controls = () => {
    const [showBuildings, setShowBuildings] = useState(false);

    const handleBuildingsClick = () => {
        setShowBuildings(!showBuildings);
    };

    return (
        <div>
            <button onClick={handleBuildingsClick} className={'button'}>
                {showBuildings ? 'Скрыть таблицу' : 'Показать таблицу'}
            </button>
            {showBuildings && <BuildingsTable/>}
        </div>
    );
};

export default Controls;