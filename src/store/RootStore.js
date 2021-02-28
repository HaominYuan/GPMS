import React, { createContext } from "react";
import useAuthContext from "../features/auth/AuthContext"
import useDisplayContext from '../features/display/DisplayContext'
import useTypeContext from '../features/type/TypeContext'
import useFlowerContext from '../features/flower/FlowerContext'

export const RootStoreContext = createContext(null);

const RootStore = ({ children }) => {

    // 存储状态
    const authContext = useAuthContext()
    const displayContext =  useDisplayContext()
    const typeContext = useTypeContext()
    const flowerContext = useFlowerContext()

    return (
        <RootStoreContext.Provider
            value={{ 
                authStore: authContext, 
                displayStore: displayContext,
                typeStore: typeContext,
                flowerStore: flowerContext
            }}
        >
            {children}
        </RootStoreContext.Provider>
    );
};

export default RootStore;
