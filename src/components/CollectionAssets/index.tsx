import { useEffect } from "react";
import { useQuery } from "react-query";
import { CollectionAsset } from "../../interfaces";
import fetchCollectionAssets from "../../services/fetchCollectionAssets.service";
import { useStore } from "../../store";
import CollectionAssetCard from "../CollectionAsset";

export default function CollectionAssets(props: { address: string }) {
  const selectedCollection = useStore((state) => state.selectedCollection);
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    "collections-assets",
    () => fetchCollectionAssets(props.address)
  );

  useEffect(() => {
    refetch(); // Call `refetch` when `props.address` changes
  }, [props.address]);

  if (isLoading || isRefetching)
    return (
      <div className="w-full flex justify-center py-32">
        <span className="loader"></span>
      </div>
    );

  if (error) return <p>{error.toString()}</p>;

  return (
    <div className="mt-10 grid pb-32">
      <h2 className="text-xl font-[600] mb-5">
        Collection assets for {selectedCollection?.name}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data &&
          data.map((collectionAsset: CollectionAsset, index: number) => {
            return (
              <CollectionAssetCard
                key={index}
                contractAddress={props.address}
                collectionAsset={collectionAsset}
              />
            );
          })}
      </ul>
    </div>
  );
}
