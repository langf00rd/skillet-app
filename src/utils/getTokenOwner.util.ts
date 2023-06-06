import { ethers } from "ethers";
/**
 * Gets owner of a token from contract
 * @param contractAddress
 * @param tokenID
 * @returns token owner `address`
 */
export default async function getTokenOwner(
  contractAddress: string,
  tokenID: string
): Promise<string | undefined> {
  const provider = new ethers.providers.Web3Provider(window.ethereum!);
  const contractABI = ["function ownerOf(uint256) view returns (address)"]; // ABI with `ownerOf` function so we can call the `ownerOf` from contract
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  try {
    const tokenOwner = (await contract.functions.ownerOf(tokenID)) as string[];
    return tokenOwner[0];
  } catch (error) {
    console.log(error);
    return;
  }
}
