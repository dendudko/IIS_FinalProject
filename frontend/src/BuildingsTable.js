import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BuildingsTable = () => {
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/buildings');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, []);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↑' : '↓';
        }
        return '\u00A0\u00A0';
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    {data.length > 0 && Object.keys(data[0]).map((key) => (
                        <th key={key} onClick={() => sortData(key)}>
                            {key} {getSortIndicator(key)}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BuildingsTable;
