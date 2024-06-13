import { ReactElement, SetStateAction, createContext, useContext, useState } from "react"
import styled from "styled-components"
import { color } from "./ui/variables"

const LoadingPanel = styled.div`
    position: fixed;
    background: #0000004f;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
`

const LoadingSpinner = styled.div`
    position: relative;
    top: 40%;
    left: 40%;
    z-index: 9999999;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid ${color.primary};
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`


const LoadingContext = createContext({
    loading: false,
    setLoading: (value: SetStateAction<boolean>) => { }
})

export function LoadingProvider(props: { children: ReactElement | ReactElement[] }) {
    const [loading, setLoading] = useState(false);
    const value = { loading, setLoading };
    return (
        <LoadingContext.Provider value={value}>{props.children}</LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
}


export default function Loading(props: { isLoading?: boolean, children?: ReactElement[] | ReactElement }) {
    return (
        <div>
            <LoadingPanel style={{ display: props.isLoading ? 'block' : 'none' }}>
                <LoadingSpinner></LoadingSpinner>
            </LoadingPanel>
            {props.children}
        </div>
    )
}