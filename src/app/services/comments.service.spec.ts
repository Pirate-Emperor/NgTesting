import {CommentsService} from './comments.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    commentsService = TestBed.inject(CommentsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(commentsService).toBeTruthy();
  });

  it('create comments', () => {
    const firstComment = 'First comment!';
    const secondComment = 'Second comment!';
    commentsService
      .postTwoComments(firstComment, secondComment)
      .subscribe();

    const requests = controller.match({
      method: 'POST',
      url: '/comments/new'
    });
    expect(requests.length).toBe(2);
    expect(requests[0].request.body).toEqual({comment: firstComment});
    expect(requests[1].request.body).toEqual({comment: secondComment});
    requests[0].flush({success: true});
    requests[1].flush({success: true});
  });
});
