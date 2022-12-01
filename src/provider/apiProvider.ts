import { Artwork } from '../types/Artworks.types';
import { URLS } from '../util';
import { BaseApiProvider } from './BaseApiProvider';

//https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display
//https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number

class ApiProviderRaw extends BaseApiProvider {
  getArtworks = async ({ page }: { page: number }) => {
    const { data, error, status } = await this.get<{ data: Artwork[] }>(
      `/artworks?page=${page}&fields=id,title,artist_display,date_display,image_id`,
    );

    return { data: data?.data, error, status };
  };

  getArtwork = async ({ id }: { id: number }) => {
    const { data, error, status } = await this.get<any>(`/artworks/${id}`);
    return { data, error, status };
  };
}

export const apiProvider = new ApiProviderRaw({ apiUrl: URLS.API_URL });
