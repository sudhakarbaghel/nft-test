"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Group from "../components/group/Group";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi, contAddress } from "../utills/contract";
import { config } from "../wallet/WalletAndClientProvider";
import { Spinner } from "@chakra-ui/react";
import "./page.css";
import { logoSrc } from "../assets/index";
import LoadingSkeleton from "../components/loadingSkeleton/LoadingSkeleton";
import EmptyNft from "../components/emptyNft/EmptyNft";
import ConnectWallet from "../components/connectWallet/ConnectWallet";

function Page() {
  const { isConnected, address } = useAccount();

  const { data, isPending, isError } = useReadContract({
    config,
    abi,
    address: contAddress,
    functionName: "getGroupsForMember",
    account: address,
  });

  return (
    <>
     
      <div className="content">
        {isPending ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((title, i) => <Group title={title} key={i} id={1} />)
        ) : (
          <div>No data available</div>
        )}
        <EmptyNft />
        {/* <div style={{display:'flex',justifyContent:'center'}}> */}

        {/* <ConnectWallet/> */}
        <LoadingSkeleton />

         
      </div>
    </>
  );
}

export default Page;
