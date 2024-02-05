import { useState } from "react";
import styles from "./Logout.module.css";

type LogoutProps = {
  onLogout: () => void,
};

const Logout = ({ onLogout }: LogoutProps) => {
  const [message, setMessage] = (useState < string) | (null > null);

  const disconnectWallet = () => {
    // Clear the account information
    localStorage.removeItem("defaultAccount");
    setMessage("Wallet disconnected successfully.");

    onLogout();
  };

  return (
    <div className={styles.metaMaskContainer}>
      <h1 className={styles.title}>Metamask Wallet Disconnection</h1>
      <button className={styles.disconnectBtn} onClick={disconnectWallet}>
        Disconnect wallet
      </button>
      <h3 className={styles.message}>{message}</h3>
    </div>
  );
};

export default Logout;
