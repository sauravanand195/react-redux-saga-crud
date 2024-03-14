import React, { useState } from 'react';
import { useEffect } from 'react';

const Demo = () => {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    // const [weekSets, setWeekSets] = useState([{ id: 1, days: [] }]);
    const [weekSets, setWeekSets] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedData = sessionStorage.getItem('selectedDataPerWeek')
            return storedData ? JSON.parse(storedData) : [{ id: 1, days: [] }]
        } else {
            return [{ id: 1, days: [] }]
        }
    });

    const handleChange = (e, setId) => {
        const { name, checked } = e.target;
        setWeekSets(prevWeekSets => {
            return prevWeekSets.map(weekSet => {
                if (weekSet.id === setId) {
                    if (checked) {
                        weekSet.days = [...weekSet.days, name];
                    } else {
                        weekSet.days = weekSet.days.filter(day => day !== name);
                    }
                }
                return weekSet;
            });
        });
    };

    const handleAddSet = () => {
        const newSetId = weekSets.length + 1;
        setWeekSets(prevWeekSets => [...prevWeekSets, { id: newSetId, days: [] }]);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('selectedDataPerWeek', JSON.stringify(weekSets))
        }
    }, [weekSets]);

    return (
        <div>
            {weekSets?.map(weekSet => {
                console.log('weekSet', weekSet)
                return (
                    <div key={weekSet.id}>
                        Week {weekSet.id}:
                        {days.map((day, index) => (
                            <span key={index}>
                                <input
                                    type="checkbox"
                                    name={day}
                                    checked={weekSet.days.includes(day)}
                                    value={day}
                                    onChange={(e) => handleChange(e, weekSet.id)}
                                />
                                <label htmlFor={day}>{day}</label>
                            </span>
                        ))}
                    </div>
                )
            })}
            <div>
                <button onClick={handleAddSet}>Add new set</button>
            </div>
            <div>
                <h2>Selected Data Per Week:</h2>
                <pre>{JSON.stringify(weekSets, null, 2)}</pre>
            </div>
        </div>
    );
};
export default Demo;
