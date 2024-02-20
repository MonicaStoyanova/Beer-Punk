import { ethers } from "ethers"; // this import is needed in order for the component to work properly
import { useState } from "react";
import styles from "./Login.module.css"
declare global {
    interface Window {
        ethereum: any;
    }
}

type LoginProps = {
    onLogin: () => void;
};

const Login = ({ onLogin }: LoginProps) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [defaultAccount, setDefaultAccount] = useState<string>("None")

    const connectWallet = () => {

        if (window.ethereum) {
            window.ethereum.request({ method: "eth_requestAccounts" })
                .then((result: string[]) => {
                    accountChanged(result[0])
                    onLogin();
                })
                .catch((error: Error) => {
                    setErrorMessage(error.message);
                });
        } else {
            setErrorMessage('Install Metamask please')
        }
    }

    const accountChanged = (accountName: string) => {
        setDefaultAccount(accountName);
        localStorage.setItem('defaultAccount', accountName);
    }
    return (
        <div className={styles.metaMaskContainer}>
            <h1 className={styles.title}>Metamask Wallet Connection</h1>
            <button className={styles.connectBtn} onClick={connectWallet}>Connect wallet</button>
            <h3 className={styles.user}>Address connected:   {defaultAccount}</h3>
            <h3 className={styles.errorMessage}>{errorMessage}</h3>
        </div>
    )
}

export default Login