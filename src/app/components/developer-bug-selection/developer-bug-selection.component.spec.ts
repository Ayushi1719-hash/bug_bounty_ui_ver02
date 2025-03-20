import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperBugSelectionComponent } from './developer-bug-selection.component';

describe('DeveloperBugSelectionComponent', () => {
  let component: DeveloperBugSelectionComponent;
  let fixture: ComponentFixture<DeveloperBugSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperBugSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperBugSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
