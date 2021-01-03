import React, { createContext } from "react";
import useAuthContext from "../features/auth/AuthContext"
import useFlowerContext from '../features/flower/FlowerContext'

export const RootStoreContext = createContext(null);

const RootStore = ({ children }) => {
    const authContext = useAuthContext();
    const flowerContext =  useFlowerContext()

    return (
        <RootStoreContext.Provider
            value={{ authStore: authContext, flowerStore: flowerContext }}
        >
            {children}
        </RootStoreContext.Provider>
    );
};

export default RootStore;
