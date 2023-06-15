import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAltaAdminComponent } from './form-alta-admin.component';

describe('FormAltaAdminComponent', () => {
  let component: FormAltaAdminComponent;
  let fixture: ComponentFixture<FormAltaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAltaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAltaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
