"use client";
import NftCard from "../components/nftCard/NftCard";
import { useAccount, useReadContract } from "wagmi";
import { abi, contAddress } from "../utills/contract";
import { config } from "../wallet/WalletAndClientProvider";
import "./page.css";
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

  let nfts = [];
  if (!isNaN(numNFTs) && numNFTs > 0) {
    for (let i = 0; i < numNFTs; i++) {
      nfts.push(<NftCard title={`nft${i + 1}`} key={i} id={i + 1} />);
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
        ) : nfts.length > 0 ? (
          nfts
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
