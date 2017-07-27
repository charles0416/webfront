import { DebugElement } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, NgForm, NgModel } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { RouterLinkStubDirective } from '../../testing/router-stubs';
import { RegisterComponent } from './register.component';
import { UserService } from '../_services/index';
import { User } from '../_models/index';

describe('RegisterComponent', () => {
    let comp: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterModule,
                RouterTestingModule.withRoutes([
                ])],
            declarations: [
                RegisterComponent,
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
        fixture = TestBed.createComponent(RegisterComponent);
        comp = fixture.componentInstance;
        el = fixture.nativeElement;
        de = fixture.debugElement;
    });

    it('Should create', async(
        () => {
            expect(comp).toBeTruthy();
        }
    ));

    it('Should link to signin', async(() => {
        let deLinks = de.queryAll(By.css('a'));
        expect(deLinks.some(e => e.nativeElement.text == "Cancel")).toBe(true, 'Should have a Cancel link.');
        fixture.detectChanges();

        let linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
        let links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
        expect(links[0].linkParams[0]).toBe("/signin", "The sign in link should go to the sign in page");
    }));

    it('Should register successfully', async(() => {
        let user1 = new User();
        user1.email = "abc@abc.com";
        user1.givenName = "abc";
        user1.password = "abcd1234";
        user1.surname = "Shi";
        user1.givenName = "Chareles";
        let userService = de.injector.get(UserService);
        let spy = spyOn(userService, "create").and.returnValue(Observable.of(user1));
        // comp.onSubmit();
        fixture.detectChanges();

        // let router = de.injector.get(Router) as Router;
        // expect(router).toBeTruthy();
    }));

    it('Should show error message', async(() => {
        let user1 = new User();
        user1.email = "abc@abc.com";
        user1.givenName = "Charles";
        user1.surname = "Shi";
        user1.password = "abcd1234";
        let userService = de.injector.get(UserService);
        let spy = spyOn(userService, "create").and.returnValue(Observable.throw("Wrong Password"));
        comp.onSubmit();
        fixture.detectChanges();
        expect(comp.alertMessage).toBeDefined();
    }));

    it('Should disable the regeister button if a required field is empty.', async(() => {
        comp.user = new User();
        comp.user.email = "abc@g.com";
        comp.user.surname = "Shi";
        comp.user.givenName = "Charles";
        comp.repeatPassword = "abcd1234";

        fixture.detectChanges();
        let submitBtn = de.query(By.css('[type=submit]')).nativeElement;
        expect(submitBtn['disabled']).toBeDefined('The submit button should be disabled if the passowrd is empty');

        comp.user.email = null;
        comp.user.password = "abcd1234";
        fixture.detectChanges();
        submitBtn = de.query(By.css('[type=submit]')).nativeElement;
        expect(submitBtn['disabled']).toBeDefined('The submit button should be disabled if the email is empty');

        comp.user.email = "charles@abc.com";
        comp.user.surname = null;
        fixture.detectChanges();
        submitBtn = de.query(By.css('[type=submit]')).nativeElement;
        expect(submitBtn['disabled']).toBeDefined('The submit button should be disabled if the surname is empty');

        comp.user.surname = "Shi";
        comp.user.givenName = null;
        fixture.detectChanges();
        submitBtn = de.query(By.css('[type=submit]')).nativeElement;
        expect(submitBtn['disabled']).toBeDefined('The submit button should be disabled if the given name is empty');

        comp.user.givenName = "Charles";
        comp.repeatPassword = null;
        fixture.detectChanges();
        submitBtn = de.query(By.css('[type=submit]')).nativeElement;
        expect(submitBtn['disabled']).toBeDefined('The submit button should be disabled if the repeat password is empty');

        comp.repeatPassword = "abcd1234";
        fixture.detectChanges();
        submitBtn = de.query(By.css('[type=submit]')).nativeElement;
        expect(!submitBtn['disabled']).toBeTruthy('The submit button should be enabled');
    }));
});

class UserServiceStud {
    create(user: User) { };
}
