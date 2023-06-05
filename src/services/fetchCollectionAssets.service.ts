import axios from "axios"
import { BASE_URL } from "../constants"
import { API_ROUTES } from "../constants/routes.const";
/**
 * Fetches collection assets for a given collection
 * @param collectionAddress
 * @returns 
 */
export default async function fetchCollectionAssets(collectionAddress: string) {
    if (!collectionAddress) return
    try {
        let response = await axios.get(BASE_URL + API_ROUTES.getCollectionAssets + '?collectionAddress=' + collectionAddress)
        return response.data
    } catch (error) {
        throw new Error('Error occured fetching collection assets');
    }
}