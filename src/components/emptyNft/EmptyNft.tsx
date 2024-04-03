import React from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import "./emptyNft.css"

const EmptyNft = () => {
  return (
    <div className={"container"}>
      <h2 className={"title"}>You don't have any minted NFT</h2>
      <p className={"message"}>Kindly mint it.</p>
      <Button colorScheme="blue" mt={4} className={"button"}>
        <Link href="/mint">Go to Mint Page</Link>
      </Button>
    </div>
  );
};


export default EmptyNft;
