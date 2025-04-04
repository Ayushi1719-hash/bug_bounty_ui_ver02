import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDevComponent } from './navbar-dev.component';

describe('NavbarDevComponent', () => {
  let component: NavbarDevComponent;
  let fixture: ComponentFixture<NavbarDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarDevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
