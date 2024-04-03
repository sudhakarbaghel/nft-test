import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./connectWallet.css"
const ConnectWallet = () => {
  return (
    <div className="container">
      <h2 className="title">Connect Your Wallet</h2>
      <p className="message">To proceed, please connect your wallet.</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ConnectButton />
      </div>
    </div>
  );
};

export default ConnectWallet;

 
