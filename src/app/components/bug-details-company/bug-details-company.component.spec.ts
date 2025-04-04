import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugDetailsCompanyComponent } from './bug-details-company.component';

describe('BugDetailsCompanyComponent', () => {
  let component: BugDetailsCompanyComponent;
  let fixture: ComponentFixture<BugDetailsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugDetailsCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugDetailsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
