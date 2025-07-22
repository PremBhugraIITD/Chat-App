import { createContext, useContext, useState } from "react";


const FetchContext = createContext();

const FetchProvider = ({ children }) => {
    const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <FetchContext.Provider value={{ fetchAgain, setFetchAgain }}>
      {children}
    </FetchContext.Provider>
  );
};

export const FetchState = () => {
  return useContext(FetchContext);
};

export default FetchProvider;
