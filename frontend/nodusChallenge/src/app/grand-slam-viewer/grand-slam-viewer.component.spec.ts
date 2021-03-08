import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandSlamViewerComponent } from './grand-slam-viewer.component';

describe('GrandSlamViewerComponent', () => {
  let component: GrandSlamViewerComponent;
  let fixture: ComponentFixture<GrandSlamViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrandSlamViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandSlamViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
