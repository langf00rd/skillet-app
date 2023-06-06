import { useAddress } from "@thirdweb-dev/react";
import CollectionAssets from "./components/CollectionAssets";
import { useState } from "react";
import CollectionModal from "./components/CollectionModal";
import Collections from "./components/Collections";
import { useStore } from "./store";
import Header from "./components/Header";

export default function App() {
  const address = useAddress();
  const selectedCollection = useStore((state) => state.selectedCollection);

  return (
    <>
      <Header />
      {!address ? (
        <h1 className="text-center font-[500] text-4xl py-20">
          No Wallet Connected
        </h1>
      ) : (
        <div className="max-w-7xl m-auto px-5">
          <Collections selectedCollection={selectedCollection} />
          {selectedCollection?.address && (
            <CollectionAssets address={selectedCollection.address} />
          )}
        </div>
      )}
    </>
  );
}

export const styles = {
  button:
    "bg-gray-800 p-2 px-4 rounded-md font-medium cursor-pointer selec-none text-gray-300 active:scale-95 transition-all",
};
