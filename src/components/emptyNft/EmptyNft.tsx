import React from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const EmptyNft = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>You don't have any minted NFT</h2>
      <p style={styles.message}>Kindly mint it.</p>
      <Button colorScheme="blue" mt={4} style={styles.button}>
        <Link href="/mint">Go to Mint Page</Link>
      </Button>
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
  button: {
    fontSize: "1rem",
  },
};

export default EmptyNft;
