import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { JsonFormData } from '../../core/models/json-form';
import { JsonCallService } from '../../json-call.service';

import { DynaFormComponent } from './dyna-form.component';

describe('DynaFormComponent', () => {
  let component: DynaFormComponent;
  let fixture: ComponentFixture<DynaFormComponent>;
  let debugElement: DebugElement;

  const serviceStub = {
    getFormData: () => {
      return of([
        {
          field: "name",
          label: "Name",
          type: "text",
          hidden: "false",
          mandatory: true
        }, {
          field: "email",
          label: "Email",
          type: "text",
          hidden: "false",
          mandatory: true
        }, {
          field: "confirm",
          label: "Checkbox with confirmation",
          type: "check",
          hidden: "false"
        }, {
          field: "hiddenField",
          label: "",
          type: "text",
          hidden: "true",
          mandatory: false
        }
      ]);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynaFormComponent],
      imports: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatInputModule,
      ],
      providers: [
        FormBuilder,
        { provide: JsonCallService, useValue: serviceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynaFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when mandatory fields are empty on submit', () => {
    component.submitForm();

    component.jsonformData.map((formData: JsonFormData) => {
      let field = component.formGroup.get([formData.field]);
      let fieldElem = debugElement.query(By.css(`.${formData.field}`)).nativeElement;

      if (formData.mandatory) {
        expect(field?.errors?.required).toBeTrue();
        expect(field?.status).toBe('INVALID');
        expect(fieldElem.classList).toContain('ng-invalid');
      } else {
        expect(field?.errors).toBeNull();
        expect(field?.status).toBe('VALID');
        expect(fieldElem.classList).toContain('ng-valid');
      }
    });

    expect(component.formGroup.valid).toBeFalse();
  });

  it('should not display any error when mandatory fields are not empty on submit', () => {
    component.jsonformData.map((formData: JsonFormData) => {
      if (formData.mandatory) {
        component.formGroup.get([formData.field])?.setValue('hello');
      }
    });

    component.submitForm();

    expect(component.formGroup.value.name).toBe('hello');
    expect(component.formGroup.value.email).toBe('hello');
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should hide fields with config hidden set to true', () => {
    let fieldElem = debugElement.query(By.css(`.hiddenField`)).nativeElement;

    expect(fieldElem.hidden).toBeTrue();
  });
});
