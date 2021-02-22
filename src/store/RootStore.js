import React, { createContext } from "react";
import useAuthContext from "../features/auth/AuthContext"
import useFlowerContext from '../features/flower/FlowerContext'
import useDetailContext from '../features/detail/DetailContext'

export const RootStoreContext = createContext(null);

const RootStore = ({ children }) => {

    // 存储状态
    const authContext = useAuthContext()
    const flowerContext =  useFlowerContext()
    const detailContext = useDetailContext()

    return (
        <RootStoreContext.Provider
            value={{ authStore: authContext, flowerStore: flowerContext, detailStore: detailContext }}
        >
            {children}
        </RootStoreContext.Provider>
    );
};

export default RootStore;
