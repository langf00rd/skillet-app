/**
 * Truncates wallet address with ellipses only showing first and last 4 characters
 * @param address
 * @returns Truncated address. eg `0x12...345`
 */
export function truncateAddress(address: string) {
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4,
    address.length
  )}`;
}
