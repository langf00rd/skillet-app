import { useMetamask, useBalance, useAddress } from "@thirdweb-dev/react";
import { styles } from "../../App";
import { truncateAddress } from "../../utils/truncateAddress.util";
import getWETHBalance from "../../utils/getWETHBalance.util";
import { useEffect, useState } from "react";

export default function Header() {
  const connectMetamask = useMetamask();
  const walletBalance = useBalance();
  const address = useAddress();
  const [wethBalance, setWETHBalance] = useState("0.0");

  useEffect(() => {
    (async () => {
      setWETHBalance((await getWETHBalance(address || "")) || "0.0");
    })();
  }, []);

  return (
    <header className="h-[100px]">
      <div className="max-w-7xl m-auto h-full w-full flex items-center justify-between px-5">
        <img src="/logo.png" className="w-[120px]" />
        {!address ? (
          <button onClick={() => connectMetamask()} className={styles.button}>
            Connect metamask
          </button>
        ) : (
          <div className="flex items-center gap-5">
            <p>{walletBalance.data?.displayValue || "0.0"} ETH</p>
            <p>{wethBalance} WETH</p>
            <p className={styles.button}>{truncateAddress(address)}</p>
          </div>
        )}
      </div>
    </header>
  );
}
