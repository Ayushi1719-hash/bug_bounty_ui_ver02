import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCompComponent } from './navbar-comp.component';

describe('NavbarCompComponent', () => {
  let component: NavbarCompComponent;
  let fixture: ComponentFixture<NavbarCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
