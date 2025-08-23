import { createContext, useContext } from "react";

const ResumeDataContext = createContext();

export const useResumeData = () =>{
    const context = useContext(ResumeDataContext);
    if(!context) {
        throw new Error('useResumeData must be used within ResumeDataProvider');
    }
    return context;
}

export default ResumeDataContext;