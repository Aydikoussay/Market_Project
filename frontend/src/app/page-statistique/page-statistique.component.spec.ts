import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStatistiqueComponent } from './page-statistique.component';

describe('PageStatistiqueComponent', () => {
  let component: PageStatistiqueComponent;
  let fixture: ComponentFixture<PageStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageStatistiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
