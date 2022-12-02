export enum URLS {
  API_URL = 'https://api.artic.edu/api/v1',
  IMAGE_API_URL = 'https://www.artic.edu/iiif/2',
}

export const PLACEHOLDER =
  'https://cdn.dribbble.com/users/844846/screenshots/2855815/media/b9ebecfa74ba38d612c2286545893dde.jpg';

export enum IMAGE_SIZE {
  XS = 400,
  M = 800,
}

export const getImageURL = ({ id, size }: { id: string; size: IMAGE_SIZE }) => {
  return id
    ? `${URLS.IMAGE_API_URL}/${id}/full/${size},/0/default.jpg`
    : PLACEHOLDER;
};
