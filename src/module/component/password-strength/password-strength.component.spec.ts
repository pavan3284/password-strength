import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Colors, PasswordStrengthComponent} from './password-strength.component';
import {MatProgressBarModule} from '@angular/material';
import {SimpleChange} from '@angular/core';

describe('PasswordStrengthComponent', () => {
  let component: PasswordStrengthComponent;
  let fixture: ComponentFixture<PasswordStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressBarModule],
      declarations: [PasswordStrengthComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a password input', () => {
    expect(component.password).toBeUndefined();
  });

  it('should have a primary color and strength equal to 0 when no password is provided', () => {
    expect(component.color).toBe(Colors.primary);
    expect(component.strength).toBe(0);
  });

  it('should not calculate the strength of the password', () => {
    const calculatePasswordStrengthSpy = jest.spyOn(component, 'calculatePasswordStrength');
    component.password = 'testPass';
    component.externalError = true;
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
      externalError: new SimpleChange(null, component.externalError, true)
    });
    fixture.detectChanges();
    expect(calculatePasswordStrengthSpy).not.toHaveBeenCalled();
  });

  it('should calculate the strength of the password', () => {
    const calculatePasswordStrengthSpy = jest.spyOn(component, 'calculatePasswordStrength');
    component.password = 'testPass2';
    component.externalError = true;
    component.ngOnChanges({
      password: new SimpleChange('testPass', component.password, false),
    });
    fixture.detectChanges();
    expect(calculatePasswordStrengthSpy).toHaveBeenCalled();
  });

  it('should strength = 20 and color = warn when the password only contain one char ', () => {
    const testChars = ['A', '1', 'a', '.'];
    testChars.forEach(char => {
      component.password = char;
      console.log('char = ', char);
      component.calculatePasswordStrength();
      expect(component.strength).toBe(20);
      expect(component.color).toBe(Colors.warn);
    });
  });

  it('should strength = 40 and color = warn when the password fulfills 2 criteria ', () => {
    const combinations = ['Aa', 'aA', '1a', 'A!'];
    // const combinations = generator(chars, 2, 3);
    console.log('combinations = ', combinations);
    combinations.forEach(combination => {
      component.password = combination;
      console.log('combination = ', combination);
      component.calculatePasswordStrength();
      expect(component.strength).toBe(40);
      expect(component.color).toBe(Colors.accent);
    });
  });
});
