import axios from "axios"
import { BASE_URL } from "../constants"
import { API_ROUTES } from "../constants/routes.const";
/**
 * Fetches collections from API endpoint
 * @returns Array of `collections` or throws an error when one occurs in call
 */
export default async function fetchCollections() {
    try {
        let response = await axios.get(BASE_URL + API_ROUTES.getCollections)
        return response.data
    } catch (error) {
        throw new Error('Error occured fetching collections');
    }
}