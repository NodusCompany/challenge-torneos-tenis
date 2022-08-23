import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandSlamComponent } from './grand-slam.component';

describe('GrandSlamComponent', () => {
  let component: GrandSlamComponent;
  let fixture: ComponentFixture<GrandSlamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrandSlamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandSlamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
