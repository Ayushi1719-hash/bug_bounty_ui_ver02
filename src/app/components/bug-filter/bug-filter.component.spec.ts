import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugFilterComponent } from './bug-filter.component';

describe('BugFilterComponent', () => {
  let component: BugFilterComponent;
  let fixture: ComponentFixture<BugFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
