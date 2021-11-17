/* tslint:disable:no-unused-expression */
import { AbstractControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Response, Headers, RequestOptions } from '@angular/http';
import { SignupFormComponent } from './signup-form.component';
import { FieldmatchesDirective } from '../../validators/fieldmatches.directive';
import { SignupDetailsComponent } from '../signup-details/signup-details.component';
import { AppServices } from '../../../services/appservices';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, DebugElement, Output, EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let _appService: AppServices;
  let fixture: ComponentFixture<SignupFormComponent>;
  let debugElement: DebugElement;
  let formElem: DebugElement;
  let formControl: NgForm;
  let router: RouterTestingModule;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        SignupFormComponent,
        { provide: AppServices, useClass: AppServices }
      ],
      declarations: [
        SignupFormComponent,
        FieldmatchesDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    formElem = debugElement.query(By.directive(NgForm));
    formControl = formElem && formElem.injector.get(NgForm);
    _appService = TestBed.get(AppServices);
    router = debugElement.query(By.directive(RouterTestingModule));
  });

  beforeEach((done) => {
    fixture.whenStable().then(done);
  });

  it('should be created', inject([AppServices], (service: [AppServices]) => {
    expect(service).toBeTruthy();
  }));

  it('has a form control', () => {
    expect(formControl).toBeTruthy('form should have NgForm control');
  });

  it('has "username" form control', () => {
    expect(getFormFieldNames()).toContain('username', 'Missing NgModel or FormControl');
  });


  it('should validate username is required', () => {
    // get control
    const control = getFormControl('username');
    // expect invalid
    expect(control && control.valid).toBeFalsy('Username invalid when empty');
    // set value
    control && control.setValue('value');
    // expect valid
    expect(control && control.valid).toBeTruthy('Username valid when not empty');
  });

  it('should validate email is correct', () => {
    // get control
    const control = getFormControl('email');
    control && control.setValue('test');
    // expect invalid
    expect(control && control.valid).toBeFalsy('Email should be invalid');
    // set value
    control && control.setValue('test@test.com');
    // expect valid
    expect(control && control.valid).toBeTruthy('Email should be valid');
  });

  it('should validate password with pattern - at least 8 letters, numbers and uppercase', () => {
    // get control
    const control = getFormControl('password');
    control && control.setValue('abc');
    // expect invalid
    expect(control && control.valid).toBeFalsy('Password should be invalid');
    // set value
    control && control.setValue('Pa55word');
    // expect valid
    expect(control && control.valid).toBeTruthy('Password should be valid');
  });

  it('should validate passwords match', () => {
    // get control
    const control = getFormControl('password');
    const control_match = getFormControl('password_match');

    control && control.setValue('abc1');
    control_match && control_match.setValue('abc2');
    // expect invalid
    expect(control_match && control_match.valid).toBeFalsy('Match should be invalid');
    // set value
    control && control.setValue('Pa55word');
    control_match && control_match.setValue('Pa55word');
    // expect valid
    expect(control_match && control_match.valid).toBeTruthy('Match should be valid');
  });

  it('has .form-username-error when username is invalid', () => {
    const control = getFormControl('username');

    // Make Field Valid
    control && control.setErrors(null);
    fixture.detectChanges();
    expect(getFormError('username')).toBeFalsy('Error message should not be present');

    // Make field invalid
    control && control.setErrors({ fake_error: true });
    fixture.detectChanges();
    expect(getFormError('username')).toBeTruthy('Error message should be present');
  });

  it('has .form-password_match-error when password_match is invalid', () => {
    const control = getFormControl('password_match');

    // Make Field Valid
    control && control.setErrors(null);
    fixture.detectChanges();
    expect(getFormError('password_match')).toBeFalsy('Error message should not be present');

    // Make field invalid
    control && control.setErrors({ fake_error: true });
    fixture.detectChanges();
    expect(getFormError('password_match')).toBeTruthy('Error message should be present');
  });

  /**
   * Gets form control or undefined
   * @param name form control name
   * @returns FormControl
   */
  function getFormControl(name) {
    return formControl && formControl.form.get(name);
  }

  /**
   * Returns form error nativeElement for given field
   * @param fieldName
   */
  function getFormError(fieldName) {
    const elem = fixture.debugElement.query(
      By.css(`.form-${fieldName}-error`)
    );
    return elem && elem.nativeElement;
  }

  /**
   * @returns Array<String> array of form field names
   */
  function getFormFieldNames() {
    return formControl && Object.keys(formControl.form.controls);
  }
});


@Component({
  template: `
    <signup-form (save)="submit($event)"></signup-form>
  `
})
export class ContainerComponent {
  submit() { }
}

describe('SignupFormComponent Inputs Outputs', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  const appRoutes: Routes = [
    { path: '', component: SignupFormComponent },
    { path: 'signup-details', component: SignupDetailsComponent },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        SignupFormComponent,
        FieldmatchesDirective,
        SignupDetailsComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(appRoutes)
      ],
      providers: [
        SignupFormComponent,
        { provide: AppServices, useClass: AppServices },
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach((done) => {
    fixture.whenStable().then(done);
  });

  it('should emit "save" event when form submitted', () => {
    spyOn(component, 'submit');
    const form = fixture.debugElement.query(By.directive(NgForm));
    const ngForm = form.injector.get(NgForm);

    for (const name of Object.keys(ngForm.form.controls)) {
      ngForm.form.controls[name].setErrors(null);
    }
    form.nativeElement.dispatchEvent(new Event('submit'));
    expect(component.submit).toHaveBeenCalled();
  });
});
