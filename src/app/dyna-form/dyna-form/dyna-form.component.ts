import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JsonFormData } from '../../core/models/json-form';
import { JsonCallService } from '../../json-call.service';

@Component({
  selector: 'app-dyna-form',
  templateUrl: './dyna-form.component.html',
  styleUrls: ['./dyna-form.component.scss']
})
export class DynaFormComponent implements OnInit {

  jsonformData: JsonFormData[] = [];
  formGroup: FormGroup = this.fb.group({});

  constructor(
    private readonly jsonService: JsonCallService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.jsonService.getFormData()
      .subscribe((formData: JsonFormData[]) => {
        this.jsonformData = formData;
        this.generateForm();
      });
  }

  submitForm(): void {
    console.log('Form Valid:', this.formGroup.valid);
    console.log('Form Value:', this.formGroup.value);
  }

  private generateForm(): void {
    this.jsonformData.map(control => {
      const validators = [];

      if (control.mandatory) {
        validators.push(Validators.required);
      }

      this.formGroup.addControl(
        control.field,
        this.fb.control(null, validators)
      );
    });
  }

}
