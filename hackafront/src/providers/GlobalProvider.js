'use client'

import { createContext, useState } from 'react';

export const globalContext = createContext();

export default function GlobalProvider({ children }) {
  const [courses, setCourses] = useState([]);

  return (
    <globalContext.Provider value={{ courses, setCourses }}>
      {children}
    </globalContext.Provider>
  );
};
