import { motion } from "framer-motion";
import { CollectionAsset } from "../../interfaces";
import { useEffect, useState } from "react";
import getTokenOwner from "../../utils/getTokenOwner.util";
import { truncateAddress } from "../../utils/truncateAddress.util";
import copy from "../../utils/copy.util";
import { MdContentCopy } from "react-icons/md";

export default function CollectionAssetCard(props: {
  collectionAsset: CollectionAsset;
  contractAddress: string;
}) {
  const [ownerAddress, setOwnerAddress] = useState("");

  useEffect(() => {
    (async () => {
      const owner = await getTokenOwner(
        props.contractAddress,
        props.collectionAsset.token_id
      );
      setOwnerAddress(owner || "");
    })();
  }, [props.contractAddress]);

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative h-full"
    >
      <img
        src={props.collectionAsset.image_url || ""}
        alt={`${props.collectionAsset.token_id}`}
        className="object-cover w-full rounded-2xl bg-[#16191c]"
        width={300}
        height={300}
      />
      <div className="p-3 grid gap-2 absolute w-full h-full top-0 bottom-0 h-max">
        <p className="bg-[#3e3e3e9e] w-max px-2 rounded-xl">
          token: {props.collectionAsset.token_id}
        </p>
        <p className="bg-[#3e3e3e9e] w-max px-2 rounded-xl flex items-center gap-5">
          owner: {truncateAddress(ownerAddress || "")}
          <MdContentCopy
            size={13}
            className="hover:text-primary transition-app cursor-pointer"
            onClick={() => copy(ownerAddress)}
          />
        </p>
      </div>
    </motion.li>
  );
}
