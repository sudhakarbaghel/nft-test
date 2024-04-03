import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWallet = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Connect Your Wallet</h2>
      <p style={styles.message}>To proceed, please connect your wallet.</p>
      <div style={{display:'flex',justifyContent:'center'}}>
      <ConnectButton />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  message: {
    fontSize: "1.1rem",
    color: "#666",
    marginBottom: "20px",
  },
};

export default ConnectWallet;
