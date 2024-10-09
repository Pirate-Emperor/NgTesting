import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';

@Injectable()
export class CommentsService {
  constructor(private http: HttpClient) {
  }

  public postTwoComments(firstComment: string, secondComment: string) {
    return forkJoin([
      this.http.post('/comments/new', {comment: firstComment}),
      this.http.post('/comments/new', {comment: secondComment})
    ]);
  }
}
