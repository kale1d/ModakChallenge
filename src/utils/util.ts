import { Colors, ColorsArr } from './colors';

export enum URLS {
  API_URL = 'https://api.artic.edu/api/v1',
  IMAGE_API_URL = 'https://www.artic.edu/iiif/2',
}

export enum IMAGE_SIZE {
  XS = 400,
  M = 800,
}

export const getImageURL = ({ id, size }: { id: string; size: IMAGE_SIZE }) => {
  return `${URLS.IMAGE_API_URL}/${id}/full/${size},/0/default.jpg`;
};

export const randomColor = () => {
  const pos = Math.floor(Math.random() * ColorsArr.length);
  return ColorsArr[pos];
};
