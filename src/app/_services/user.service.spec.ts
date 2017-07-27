import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ResponseType, Request, HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';

import { UserService } from '../_services/index';
import { User } from '../_models/index';

describe('user.service', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                UserService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ],
            imports: [
                FormsModule,
                HttpModule
            ]
        });

        TestBed.compileComponents();
    }));


    it('User.service.create: Should create user successfully', async(
        () => {
            let userService: UserService = getTestBed().get(UserService);
            let mockBackend = getTestBed().get(MockBackend) as MockBackend;
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            body:
                            {
                                id: 1,
                                surname: "Shi",
                                givenName: "Charles",
                                email: "charles@abc.com",
                                password: "abcd1234"
                            }
                        }
                        )));
                });

            let user1: User = new User();
            user1.email = "charles@abc.com";
            user1.surname = "shi";
            user1.givenName = "charles";
            user1.password = "abcd1234";
            userService.create(user1).subscribe(
                data => {
                    expect(data.email).toEqual(user1.email, "Email don't match.");
                }
            );

        }
    ));


    it('User.service.signIn: should signin successfully', async(
        () => {
            let userService: UserService = getTestBed().get(UserService);
            let mockBackend = getTestBed().get(MockBackend) as MockBackend;
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            body:
                            {
                                id: 1,
                                surname: "Shi",
                                givenName: "Charles",
                                email: "charles@abc.com",
                                password: "abcd1234",
                                token: "fakeToken123"
                            }
                        }
                        )));
                });

            let email = "charles@abc.com";
            let password = "abcd1234";
            localStorage.removeItem('CURRENT_USER');
            userService.signIn(email, password).subscribe(
                data => {
                    let currentUser = localStorage.getItem('CURRENT_USER');
                    expect(currentUser).toBeDefined('Local storage should has a current user');
                    let u = JSON.parse(currentUser);
                    expect(u.token).toBeDefined("Current user should have a token");
                    expect(u.email).toEqual(email, "Email should be same");
                    expect(u.id).toBeDefined('User id should be defined.');
                }
            );

        }
    ));

    it('Should got a wrong password error', async(
        () => {
            let userService: UserService = getTestBed().get(UserService);
            let mockBackend = getTestBed().get(MockBackend) as MockBackend;
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(new MockError(
                        new ResponseOptions({
                            type: ResponseType.Error,
                            status: 401,
                            body: JSON.stringify({ error: "Invalid user or password." })
                        }
                        )));
                });

            let email = "charles@abc.com";
            let password = "abcd1234";
            userService.signIn(email, password).subscribe(
                data => {
                    fail("Should get an signin error instead of success.");
                }, error => {
                    expect(error.status).toEqual(401);
                    expect(error).toBeDefined("Should have some error message");
                }
            );
        }
    ));

    it('SignOut', () => {
        let userService: UserService = getTestBed().get(UserService);
        userService.signOut();
        expect(localStorage.getItem('CURRENT_USER')).toBeNull("Current user should be cleared,");
    }
    );

});

class MockError extends Response implements Error {
    name: any
    message: any
}