import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [AppComponent]
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'ng-testing' title`, () => {
    expect(component.title).toEqual('ng-testing');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello ng-testing');
  });
});
