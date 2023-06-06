import { motion } from "framer-motion";
import { Collection } from "../../interfaces";
import { useStore } from "../../store";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
import CollectionDescriptionModal from "../CollectionDescriptionModal";

export default function CollectionCard(props: { collection: Collection }) {
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const selectedCollection = useStore((state) => state.selectedCollection);
  const setSelectedCollection = useStore(
    (state) => state.setSelectedCollection
  );

  const handleShowCollectionModal = () => {
    setShowCollectionModal(!showCollectionModal);
  };

  return (
    <>
      <CollectionDescriptionModal
        collection={selectedCollection}
        show={showCollectionModal}
        onHide={handleShowCollectionModal}
      />
      <motion.li
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setSelectedCollection(props.collection)}
        className={`border-2 border-gray-800 select-none bg-gray-800 p-2 rounded-2xl flex items-center justify-between cursor-pointer gap-5 md:min-w-max min-w-[280px] hover:bg-gray-900 transition-all ${
          props.collection.address === selectedCollection?.address &&
          "border-primary"
        }`}
      >
        <div className="flex items-center gap-2">
          <img
            src={props.collection.image_url || ""}
            alt={`${props.collection.name} image`}
            className="rounded-xl"
            width={50}
            height={50}
          />
          <p className="whitespace-nowrap">{props.collection.name}</p>
        </div>
        <FiMoreHorizontal
          className="transition-all hover:bg-gray-600 p-1 rounded-full"
          onClick={handleShowCollectionModal}
          size={25}
        />
      </motion.li>
    </>
  );
}
