'use client'

import { createContext, useState } from 'react';

export const globalContext = createContext();

export default function GlobalProvider({ children }) {
  const [courses, setCourses] = useState([
    { course: 'course', tag: 'tag do curso', url: 'vai pra ca man', price: 'RS 500,00' },
    { course: 'course', tag: 'tag do curso', url: 'vai pra ca man', price: 'RS 500,00' },
    { course: 'course', tag: 'tag do curso', url: 'vai pra ca man', price: 'RS 500,00' },
    { course: 'course', tag: 'tag do curso', url: 'vai pra ca man', price: 'RS 500,00' },
    { course: 'course', tag: 'tag do curso', url: 'vai pra ca man', price: 'RS 500,00' },
    { course: 'course', tag: 'tag do curso', url: 'vai pra ca man', price: 'RS 500,00' },
    { course: 'course', tag: 'tag do curso', url: 'vai pra ca man', price: 'RS 500,00' },
    { course: 'course', tag: 'tag do curso', url: 'vai pra ca man', price: 'RS 500,00' },
    { course: 'course', tag: 'tag do curso', url: 'vai pra ca man', price: 'RS 500,00' },
  ]);

  return (
    <globalContext.Provider value={{ courses, setCourses }}>
      {children}
    </globalContext.Provider>
  );
};
