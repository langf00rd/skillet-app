import { useQuery } from "react-query";
import fetchCollections from "../../services/fetchCollections.service";
import { Collection } from "../../interfaces";
import CollectionCard from "../CollectionCard";

export default function Collections(props: {
  selectedCollection: Collection | undefined;
}) {
  const { data } = useQuery("collections", fetchCollections);
  return (
    <>
      <ul className="flex justify-between overflow-x-scroll gap-5">
        {data &&
          data.map((collection: Collection, index: number) => (
            <CollectionCard key={index} collection={collection} />
          ))}
      </ul>
    </>
  );
}
