"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Group from "../components/group/Group";
import { useAccount, useReadContract } from "wagmi";
import { abi, contAddress } from "../utills/contract";
import { config } from "../wallet/WalletAndClientProvider";
import { Spinner } from "@chakra-ui/react";
import "./page.css";
import { logoSrc } from "../assets/index";
import LoadingSkeleton from "../components/loadingSkeleton/LoadingSkeleton";
import EmptyNft from "../components/emptyNft/EmptyNft";
import ConnectWallet from "../components/connectWallet/ConnectWallet";
import MintNft from "@/components/mintNft/MintNft";

function Page() {
  const { isConnected, address } = useAccount();

  const { data, isPending, isError } = useReadContract({
    config,
    abi,
    address: contAddress,
    functionName: "balanceOf",
    args: [address],
  });

  const numNFTs = Number(data);

  let groups = [];
  if (!isNaN(numNFTs) && numNFTs > 0) {
    for (let i = 0; i < numNFTs; i++) {
      groups.push(<Group title={`nft${i + 1}`} key={i} id={i + 1} />);
    }
  }
if(!isConnected){
  return <ConnectWallet/>
}
  return (
    <>
      <div className="content">
        {isPending ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : groups.length > 0 ? (
          groups
        ) : (
        isConnected ?  <EmptyNft />:''
        )}
        {!isConnected && !isPending ? <ConnectWallet /> : ""}
        <MintNft />
      </div>
    </>
  );
}

export default Page;
