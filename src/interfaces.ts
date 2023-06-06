export interface Collection {
  address: string;
  description: string;
  discord_url: string;
  external_url: string;
  image_url: string;
  name: string;
  slug: string;
  twitter_username: string;
  schema_name: string;
  symbol: string;
}

export interface CollectionAsset {
  token_id: string;
  image_url: string;
}

export interface StoreState extends StoreAction {
  selectedCollection: Collection | undefined;
}

export interface StoreAction {
  setSelectedCollection: (content: StoreState["selectedCollection"]) => void;
}
