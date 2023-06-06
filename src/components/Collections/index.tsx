import { useQuery } from "react-query";
import fetchCollections from "../../services/fetchCollections.service";
import { Collection } from "../../interfaces";
import CollectionCard from "../CollectionCard";

export default function Collections(props: {
  selectedCollection: Collection | undefined;
}) {
  const { data, isLoading } = useQuery("collections", fetchCollections);

  if (isLoading)
    return (
      <div className="w-full flex justify-center py-32">
        <span className="loader"></span>
      </div>
    );

  return (
    <>
      <h2 className="text-xl font-[600] mb-5">Collections</h2>
      <ul className="flex justify-between overflow-x-scroll gap-5">
        {data &&
          data.map((collection: Collection, index: number) => (
            <CollectionCard key={index} collection={collection} />
          ))}
      </ul>
    </>
  );
}
