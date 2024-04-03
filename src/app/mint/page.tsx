"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import Web3 from "web3";
import { abi, contAddress } from "@/utills/contract";

import {
  type BaseError,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import Modal from "../../components/modal/Modal";
const MintPage = () => {
  const {
    data: hash,
    error: errMsg,
    isPending,
    writeContract,
  } = useWriteContract();
    console.log("🚀 ~ MintPage ~ errMsg:", errMsg)
  const [recipientEnabled, setRecipientEnabled] = useState(false);
  const [batchMint, setBatchMint] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [nftCount, setNftCount] = useState(1);
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected, address } = useAccount();
  const { data: owner, isError } = useReadContract({
    abi,
    address: contAddress,
    functionName: "owner",
  });
  const handleMint = async () => {
    try {
      if (recipientEnabled && !validateRecipientAddress()) {
        setError("Invalid recipient address");
        return;
      }
      if (batchMint && nftCount < 1) {
        setError("NFT count should be greter then 0!");
        return;
      }

      if (recipientEnabled && !recipientAddress.trim()) {
        setError("Recipient address is required");
        return;
      }
      writeContract({
        abi,
        address: contAddress,
        functionName: batchMint ? "batchMint" : "mint",
        args: batchMint
          ? [recipientAddress, nftCount]
          : recipientEnabled
          ? [recipientAddress]
          : [],
      });
    } catch (error) {
      setError("Failed to mint NFT");
    }
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleRecipientAddressChange = (event: any) => {
    setRecipientAddress(event.target.value);
  };
  const handleNftCount = (event: any) => {
    setNftCount(event.target.value);
  };

  const validateRecipientAddress = () => {
    if (!recipientEnabled) return;
    const web3 = new Web3();
    if (!web3.utils.isAddress(recipientAddress)) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (errMsg || isConfirmed || error) {
      onOpen();
    }
  }, [errMsg, onOpen, isConfirmed || error]);

  return (
    <FormControl isInvalid={!!error}>
      <Box
        p={4}
        border="1px solid #ccc"
        borderRadius="8px"
        maxWidth="1000px"
        height={600}
        margin="50px auto"
        backgroundColor="white"
        position="relative"
      >
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "400px",
            height: "auto",
          }}
        >
          <img
            src="https://assets-v2.lottiefiles.com/a/26d7b8e2-1188-11ee-b97e-47663effbb98/7TneXvpXDi.gif"
            alt="Background"
            style={{ width: "100%", height: "auto", zIndex: "-1" }}
          />
        </div>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Mint NFT
        </h1>

        <Checkbox
          onChange={() => {
            if (address != owner) {
              setRecipientEnabled(false);
              onOpen();
              setError("Only owner can add recipient!");
            } else if (batchMint) {
              setRecipientEnabled(true);
            } else {
              setRecipientEnabled(!recipientEnabled);
            }
          }}
          isChecked={recipientEnabled || batchMint}
          mt={4}
          marginRight="auto"
          marginLeft="auto"
        >
          Add Recipient Address
        </Checkbox>
        <Checkbox
          onChange={() => {
            if (address != owner) {
              setBatchMint(false);
              onOpen();
              setError("Only owner can perform batch mint!");
            } else {
              setBatchMint(!batchMint);
            }
          }}
          isChecked={batchMint}
          mt={4}
          marginRight="auto"
          marginLeft="auto"
        >
          Batch Mint
        </Checkbox>
        {recipientEnabled || batchMint ? (
          <>
            <FormLabel mt={4}>Recipient Address</FormLabel>
            <Input
              type="text"
              value={recipientAddress}
              onChange={handleRecipientAddressChange}
            />
          </>
        ) : (
          ""
        )}
        {batchMint && (
          <>
            <FormLabel mt={4}>NFT's count</FormLabel>
            <Input type="number" value={nftCount} onChange={handleNftCount} />
          </>
        )}

        <div>
          <Button
            colorScheme="blue"
            mt={4}
            onClick={handleMint}
            marginLeft="auto"
            marginRight="auto"
            isDisabled={
              isPending ||
              (recipientEnabled && !recipientAddress) ||
              (batchMint && nftCount < 1)
            }
          >
            {isConfirming ? (
              <Spinner
                size="md"
                color="white.500"
                mt={4}
                marginLeft="auto"
                marginRight="auto"
              />
            ) : (
              "MINT"
            )}
          </Button>
        </div>
        {isConfirmed && (
          <Modal
            type="success"
            message="Successfully minted NFT!"
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
        {errMsg && (
          <Modal
            type="error"
            message={(errMsg as BaseError).shortMessage || errMsg.message}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}

        {error && (
          <Modal
            type="error"
            message={error}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </Box>
    </FormControl>
  );
};

export default MintPage;
