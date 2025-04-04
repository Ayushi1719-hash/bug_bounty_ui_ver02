import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSolutionComponent } from './dev-solution.component';

describe('DevSolutionComponent', () => {
  let component: DevSolutionComponent;
  let fixture: ComponentFixture<DevSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevSolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
