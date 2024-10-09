import {TranslateService, Translations} from '../services/translate.service';
import {Component, EventEmitter} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {TranslatePipe} from './translate.pipe';
import {expectContent} from '../spec-helpers';

const key1 = 'key1';
const key2 = 'key2';

@Component({
  standalone: true,
  imports: [
    TranslatePipe
  ],
  template: '{{ key | translate }}'
})
class HostComponent {
  public key = key1;
}

describe('TranslatePipe', () => {
  let fixture: ComponentFixture<HostComponent>;
  let translateService: Pick<TranslateService, 'onTranslationChange' | 'get'>;

  beforeEach(async () => {
    translateService = {
      onTranslationChange: new EventEmitter<Translations>(),
      get(key: string): Observable<string> {
        return of(`Translation for ${key}`);
      }
    };

    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        {provide: TranslateService, useValue: translateService}
      ]
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HostComponent);
  });

  it('translates the key, sync service response', () => {
    fixture.detectChanges();
    expectContent(fixture, 'Translation for key1');
  });

  it('translates the key, async service response', fakeAsync(() => {
    translateService.get = (key) =>
      of(`Async translation for ${key}`).pipe(delay(100));

    fixture.detectChanges();

    expectContent(fixture, '');

    tick(100);

    fixture.detectChanges();

    expectContent(fixture, 'Async translation for key1');
  }));

  it('translates a changed key', () => {
    fixture.detectChanges();
    fixture.componentInstance.key = key2;
    fixture.detectChanges();
    expectContent(fixture, 'Translation for key2');
  });

  it('updates on translation change', () => {
    fixture.detectChanges();
    translateService.get = (key) =>
      of(`New translation for ${key}`);
    translateService.onTranslationChange.emit({});
    fixture.detectChanges();
    expectContent(fixture, 'New translation for key1');
  });
});
