import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IAuth, IToken } from '../interfaces/auth.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    baseUrl: string = environment.baseUrl;
    url: string = `${this.baseUrl}/auth`

    isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    token$: BehaviorSubject<string> = new BehaviorSubject('')

    headers = new HttpHeaders({
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json',
     });
    options = { headers: this.headers };

    constructor(private httpClient: HttpClient) { 

    }
    

    authenticate(userName: IAuth): Observable<IToken> {
        let loggedIn = (token: IToken)=> {
            this.isAuthenticated$.next(true) 
            this.token$.next(token?.token)
            localStorage.setItem('token', token?.token)
            alert('Login Successfully!')
            location.reload()
        }
        return this.httpClient.post<IToken>(`${this.url}`, userName, this.options).pipe(
                tap({
                    next : (token: IToken)=>{
                    token ? loggedIn(token) : this.isAuthenticated$.next(token) 
                    }, 
                    error:(err) => alert(err)
                }), 
                catchError(this.handleError<IToken>('authenticate'))
            )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error('error : S', error); 
          console.log(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
    }
}