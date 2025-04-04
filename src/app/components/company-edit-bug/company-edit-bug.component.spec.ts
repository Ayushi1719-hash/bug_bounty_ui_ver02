import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditBugComponent } from './company-edit-bug.component';

describe('CompanyEditBugComponent', () => {
  let component: CompanyEditBugComponent;
  let fixture: ComponentFixture<CompanyEditBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyEditBugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyEditBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
