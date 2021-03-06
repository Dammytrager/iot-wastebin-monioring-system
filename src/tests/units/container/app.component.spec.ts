import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WbComponent } from '../../../components/container/wb.component';

describe('WbComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        WbComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(WbComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'projectTemplate'`, () => {
    const fixture = TestBed.createComponent(WbComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('projectTemplate');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(WbComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to projectTemplate!');
  });
});
