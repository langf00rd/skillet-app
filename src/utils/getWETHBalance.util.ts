import { ethers } from "ethers";
/**
 * Gets WETH balance of an address
 * @param address
 * @returns WETH balance as `string`
 */
export default async function getWETHBalance(
  address: string
): Promise<string | undefined> {
  if (!address) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum!);
  const wethContractAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; //Address of the WETH ERC20 contract
  const wethContractAbi = [
    "function balanceOf(address) view returns (uint256)",
  ];
  // A contract instance
  const wethContract = new ethers.Contract(
    wethContractAddress,
    wethContractAbi,
    provider
  );
  const balance = await wethContract.balanceOf(address);
  const balanceInEther = ethers.utils.formatEther(balance);
  return balanceInEther;
}
