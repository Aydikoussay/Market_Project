import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockePageComponent } from './stocke-page.component';

describe('StockePageComponent', () => {
  let component: StockePageComponent;
  let fixture: ComponentFixture<StockePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
