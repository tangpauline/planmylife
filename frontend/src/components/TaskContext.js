import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [change, setChange] = useState(false);

    return (
        <TaskContext.Provider value={{ change, setChange }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useChange = () => useContext(TaskContext);