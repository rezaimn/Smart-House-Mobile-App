import { async, TestBed } from '@angular/core/testing';

import {LoginComponent} from "./login.component";

import {AppModule} from "../../app/app.module";
describe('Login Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AppModule
        ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof LoginComponent).toBe(true);
  });

  it('should be invalid when form is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
    it('user name Invalidity', () => {
      let userName=component.loginData.username;
        expect(userName.valid).toBeFalsy();
        let userNameErrors={};
        userNameErrors=userName.errors;
        userName.setValue("reeeee");
        expect(userNameErrors["required"]).toBeTruthy();
    });
    it('password Invalidity', () => {
        let password=component.loginData.password;
        expect(password.valid).toBeFalsy();
        let passwordErrors={};
        passwordErrors=password.errors||{};
        expect(passwordErrors["required"]).toBeTruthy();
        password.setValue('1');
        passwordErrors=password.errors||{};
        expect(passwordErrors["minlength"]).toBeTruthy();
    });
    it('should be submit login form', () => {
        let password=component.loginData.password;
        let userName=component.loginData.username;
        expect(component.loginForm.valid).toBeFalsy();
        userName.setValue('admin');
        password.setValue('Aa12345*');
        expect(component.loginForm.valid).toBeTruthy();
        component.signIn();
        expect(component.localData.userIsLoggedIn).toBeTruthy();
    });
});
