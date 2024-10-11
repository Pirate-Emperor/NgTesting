import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {FlickrService} from './flicker.service';
import {photos} from '../spec-helpers';
import {Photo} from '../models';
import {HttpErrorResponse, provideHttpClient} from '@angular/common/http';

const searchTerm = 'dragonfly';
const expectedUrl = `https://www.flickr.com/services/rest/?tags=${searchTerm}&method=flickr.photos.search&format=json&nojsoncallback=1&tag_mode=all&media=photos&per_page=15&extras=tags,date_taken,owner_name,url_q,url_m&api_key=XYZ`;

describe('FlickerService', () => {
  let flickrService: FlickrService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FlickrService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    flickrService = TestBed.inject(FlickrService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('searches for public photos', () => {
    let actualPhotos: Photo[] | undefined;

    flickrService.searchPublicPhotos(searchTerm)
      .subscribe(res => actualPhotos = res);

    const request = controller.expectOne(expectedUrl);
    // Answer the request so the Observable emits a value.
    request.flush({photos: {photo: photos}});

    // Now verify that all requests have been handled.
    controller.verify();

    // Now verify emitted valued.
    expect(actualPhotos).toEqual(photos);
  });

  it('passes through search errors', () => {
    const status = 500;
    const statusText = 'Server error';
    const progressEvent = new ProgressEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    flickrService.searchPublicPhotos(searchTerm)
      .subscribe({
        next: () => {
          fail('next handler must not be called');
        },
        error: (error) => {
          actualError = error;
        },
        complete: () => {
          fail('complete handler must not be called');
        }
      });

    const request = controller.expectOne(expectedUrl);
    // Answer the request with an error.
    request.error(progressEvent, {status, statusText});

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.error).toBe(progressEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
