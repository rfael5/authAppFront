import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomenteAdminComponent } from './somente-admin.component';

describe('SomenteAdminComponent', () => {
  let component: SomenteAdminComponent;
  let fixture: ComponentFixture<SomenteAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SomenteAdminComponent]
    });
    fixture = TestBed.createComponent(SomenteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
