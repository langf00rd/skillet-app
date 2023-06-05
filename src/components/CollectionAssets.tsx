import { useQuery } from "react-query"
import fetchCollectionAssets from "../services/fetchCollectionAssets.service"
import { CollectionAsset } from "../interfaces"
import { useEffect } from "react"
import { motion } from "framer-motion"

export default function CollectionAssets(props: {
    address: string
}) {
    const { isLoading, error, data, refetch } = useQuery('collections-assets', () => fetchCollectionAssets(props.address))

    useEffect(() => {
        refetch(); // Call `refetch` when `props.address` changes
    }, [props.address]);

    if (isLoading) return <p>loading...</p>
    if (error) return <p>{error.toString()}</p>
    return (
        <div className="mt-10 grid gap-3">
            <h2 className="text-xl font-[500]">Collection assets</h2>
            <ul className="grid grid-cols-5 gap-5">
                {data && data.map((collectionAsset: CollectionAsset, index: number) => <motion.li initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={index}>
                    <img src={collectionAsset.image_url || ''} alt={`${collectionAsset.token_id}`} className="object-cover w-full rounded-xl bg-[#16191c]" width={300} height={300} />
                </motion.li>)}
            </ul>
        </div>
    )
}