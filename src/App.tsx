import { useAddress } from "@thirdweb-dev/react";
import { useQuery } from "react-query";
import { Collection } from "./interfaces";
import CollectionAssets from "./components/CollectionAssets";
import { useState } from "react";
import fetchCollections from "./services/fetchCollections.service";
import { motion } from "framer-motion";
import Header from "./components/Header";
import { TfiMoreAlt } from 'react-icons/tfi'
import CollectionModal from "./components/CollectionModal";

export default function App() {
  const address = useAddress()
  const [selectedCollection, setselectedCollection] = useState<Collection>()
  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const { isLoading, data } = useQuery('collections', fetchCollections)

  const handleShowCollectionModal = () => {
    setShowCollectionModal(!showCollectionModal)
  }

  return (
    <>
      <Header />
      <CollectionModal collection={selectedCollection} show={showCollectionModal} onHide={handleShowCollectionModal} />
      {!address ? <h1 className="text-center font-[500] text-4xl py-20">No Wallet Connected</h1>
        : <main className="max-w-7xl m-auto px-5">
          {isLoading && <p>loading...</p>}
          <ul className="grid grid-cols-5 gap-5">
            {data && data.map((collection: Collection, index: number) => <motion.li initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={() => setselectedCollection(collection)} className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all collection ${selectedCollection?.address === collection.address ? 'border-primary' : 'border-gray-800'}`} key={index}>
              <img src={collection.image_url || ''} alt={`${collection.name} image`} className="object-cover w-full transition-all bg-[#16191c]" width={300} height={300} />
              <div className="overlay-gradient w-full h-full absolute bottom-0 left-0 p-5 flex flex-col justify-between">
                <TfiMoreAlt onClick={handleShowCollectionModal} className="hover:text-primary cursor-pointer p-1" size={25} />
                <b className="text-left">{collection.name}</b>
              </div>
            </motion.li>)}
          </ul>
          {selectedCollection?.address && <CollectionAssets address={selectedCollection.address} />}
        </main>}
    </>
  )
}

export const styles = {
  button: 'bg-gray-800 p-2 px-4 rounded-md font-medium cursor-pointer selec-none text-gray-300 active:scale-95 transition-all'
}