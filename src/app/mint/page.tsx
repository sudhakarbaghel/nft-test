"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import Web3 from "web3";

const MintPage = () => {
  const [recipientEnabled, setRecipientEnabled] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [minted, setMinted] = useState(false);

  const handleMint = async () => {
    try {
      if (recipientEnabled && !validateRecipientAddress()) {
        setError("Invalid recipient address");
        return;
      }

      if (recipientEnabled && !recipientAddress.trim()) {
        setError("Recipient address is required");
        return;
      }

      setLoading(true);
      // Simulating minting process, replace with actual minting logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMinted(true);
    } catch (error) {
      setError("Failed to mint NFT");
    } finally {
      setLoading(false);
    }
  };

  const handleRecipientAddressChange = (event: any) => {
    setRecipientAddress(event.target.value);
  };

  const validateRecipientAddress = () => {
    if (!recipientEnabled) return;
    const web3 = new Web3();
    if (!web3.utils.isAddress(recipientAddress)) {
      return false;
    }
    return true;
  };

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
            style={{ width: "100%", height: "auto" }}
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
          onChange={() => setRecipientEnabled(!recipientEnabled)}
          isChecked={recipientEnabled}
          mt={4}
          marginRight="auto"
          marginLeft="auto"
        >
          Add Recipient Address
        </Checkbox>
        {recipientEnabled && (
          <>
            <FormLabel mt={4}>Recipient Address</FormLabel>
            <Input
              type="text"
              value={recipientAddress}
              onChange={handleRecipientAddressChange}
            />
          </>
        )}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}

        <div>
          <Button
            colorScheme="blue"
            mt={4}
            onClick={handleMint}
            marginLeft="auto"
            marginRight="auto"
            isDisabled={
              loading || (recipientEnabled && !recipientAddress.trim())
            }
          >
            {loading ? (
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
        {minted && (
          <Box color="green" mt={4} textAlign="center">
            NFT Minted Successfully!
          </Box>
        )}
      </Box>
    </FormControl>
  );
};

export default MintPage;
