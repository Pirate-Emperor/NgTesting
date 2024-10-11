import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Photo} from '../models';
import {Injectable} from '@angular/core';

// Flickr API Response (relevant parts)
export interface FlickrAPIResponse {
  photos: {
    photo: Photo[];
  };
}

@Injectable()
export class FlickrService {
  constructor(private http: HttpClient) {
  }

  searchPublicPhotos(searchTerm: string): Observable<Photo[]> {
    return this.http
      .get<FlickrAPIResponse>(
        'https://www.flickr.com/services/rest/',
        {
          params: {
            tags: searchTerm,
            method: 'flickr.photos.search',
            format: 'json',
            nojsoncallback: '1',
            tag_mode: 'all',
            media: 'photos',
            per_page: '15',
            extras: 'tags,date_taken,owner_name,url_q,url_m',
            api_key: 'XYZ'
          }
        }
      )
      .pipe(map((response) => response.photos.photo));
  }
}
