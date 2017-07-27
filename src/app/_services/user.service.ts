import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

import { User } from '../_models/index';

@Injectable()
export class UserService {
    private defaultOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    constructor(private http: Http) {

    }

    register(user: User) {
        return this.http.post('/api/register', JSON.stringify(user), this.defaultOptions).map((response: Response) => response.json());
    };

    signIn(email: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }), this.defaultOptions)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('CURRENT_USER', JSON.stringify(user));
                }
            });
    }

    signOut(): void {
        localStorage.removeItem('CURRENT_USER');
    }
}