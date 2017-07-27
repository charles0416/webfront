import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormControl, ReactiveFormsModule, NgForm, NgModel } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterLinkStubDirective } from '../../testing/router-stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { SigninComponent } from './signin.component';
import { UserService } from '../_services/index';
import { User } from '../_models/index';

describe('SigninComponent', () => {
    let comp: SigninComponent;
    let fixture: ComponentFixture<SigninComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterModule,
                RouterTestingModule.withRoutes([
                    { path: 'register', component: RegisterComponentStud },
                    { path: 'home', component: HomeComponentStud }
                ])],
            declarations: [
                SigninComponent,
                NgForm,
                NgModel,
                RouterLinkStubDirective,
            ],
            providers: [
                { provide: UserService, useClass: UserServiceStud }
            ]
        }).compileComponents();
    }
    ));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninComponent);
        comp = fixture.componentInstance;
        el = fixture.nativeElement;
        de = fixture.debugElement;
    });

    it('Should create', async(
        () => {
            expect(comp).toBeTruthy();
        }
    ));

    it('Should link to register', async(() => {
        let deLinks = de.queryAll(By.css('a'));
        expect(deLinks.some(e => e.nativeElement.text == "Register")).toBe(true, 'Should have a link to register page.');
        fixture.detectChanges();

        let linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
        let links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
        expect(links[0].linkParams[0]).toBe("/register", "The register link should go to the register page");
    }));

    it('Should login', async(() => {
        let user1 = new User();
        user1.email = "abc@abc.com";
        user1.givenName = "abc";
        user1.password = "abcd1234";
        let userService = de.injector.get(UserService);
        let spy = spyOn(userService, "signIn").and.returnValue(Observable.of(user1));
        // comp.onSubmit();
        fixture.detectChanges();

        // let router = de.injector.get(Router) as Router;
        // expect(router).toBeTruthy();
    }));

    it('Should show error message', async(() => {
        let user1 = new User();
        user1.email = "abc@abc.com";
        user1.givenName = "abc";
        user1.password = "abcd1234";
        let userService = de.injector.get(UserService);
        let spy = spyOn(userService, "signIn").and.returnValue(Observable.throw("Wrong Password"));
        comp.onSubmit();
        fixture.detectChanges();
        expect(comp.alertMessage).toBeDefined();
    }));

    it('Should disable the signin button if username or password is empty.', async(() => {
        comp.user = new User();
        comp.user.email = "abc@g.com";

        fixture.detectChanges();
        let submitBtn = de.query(By.css('[type=submit]')).nativeElement;
        expect(submitBtn['disabled']).toBeDefined('The submit button should be disabled if the passowrd is empty');

        comp.user.email = null;
        comp.user.password = "abcd";
        fixture.detectChanges();
        submitBtn = de.query(By.css('[type=submit]')).nativeElement;
        expect(submitBtn['disabled']).toBeDefined('The submit button should be disabled if the email is empty');

        comp.user.email = "abc@g.com";
        comp.user.password = "abcd";
        fixture.detectChanges();
        submitBtn = de.query(By.css('[type=submit]')).nativeElement;
        expect(!submitBtn['disabled']).toBeTruthy('The submit button should be enabled.');
    }));
});

class UserServiceStud {
    signIn(email: string, password: string) { };
}

class RegisterComponentStud {

}
class RouterStud {

}

class HomeComponentStud {

}
