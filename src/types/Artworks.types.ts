export type Artwork = {
  id: number;
  title: string;
  artist_title: string;
  date_display: string;
  image_id: string;
  image?: string;
};

export type ArtworkDetail = {
  artwork_type_title: string;
  date_display: string;
  image_id: string;
  medium_display: string;
  style_title: string;
  image?: string;
  artist_title: string;
};
