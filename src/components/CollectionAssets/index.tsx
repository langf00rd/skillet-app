import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { CollectionAsset } from "../../interfaces";
import fetchCollectionAssets from "../../services/fetchCollectionAssets.service";
import { useStore } from "../../store";
import { truncateAddress } from "../../utils/truncateAddress.util";
import { MdContentCopy } from "react-icons/md";
import copy from "../../utils/copy.util";

export default function xCollectionAssets(props: { address: string }) {
  const selectedCollection = useStore((state) => state.selectedCollection);
  const { isLoading, error, data, refetch } = useQuery(
    "collections-assets",
    () => fetchCollectionAssets(props.address)
  );

  useEffect(() => {
    refetch(); // Call `refetch` when `props.address` changes
  }, [props.address]);

  if (isLoading)
    return (
      <div className="w-full flex justify-center py-32">
        <span className="loader"></span>
      </div>
    );

  if (error) return <p>{error.toString()}</p>;

  return (
    <div className="mt-10 grid gap-3 pb-32">
      <h2 className="text-xl font-[600]">
        Collection assets for {selectedCollection?.name}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data &&
          data.map((collectionAsset: CollectionAsset, index: number) => (
            <motion.li
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={index}
              className="relative"
            >
              <img
                src={collectionAsset.image_url || ""}
                alt={`${collectionAsset.token_id}`}
                className="object-cover w-full rounded-2xl bg-[#16191c]"
                width={300}
                height={300}
              />
              <div className="p-3 grid gap-2 absolute w-full h-full top-0 bottom-0 h-max">
                <p className="bg-[#3e3e3e9e] w-max px-2 rounded-xl">
                  token: {collectionAsset.token_id}
                </p>
                <p className="bg-[#3e3e3e9e] w-max px-2 rounded-xl flex items-center gap-5">
                  owner: {truncateAddress(props.address)}
                  <MdContentCopy
                    size={13}
                    className="hover:text-primary transition-app cursor-pointer"
                    onClick={() => copy(props.address)}
                  />
                </p>
              </div>
            </motion.li>
          ))}
      </ul>
    </div>
  );
}
