import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { IToken } from '../interfaces/auth.interface';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IToken } from './../interfaces/auth.interface';

@Injectable({providedIn: 'root'})
export class AuthenticateService {
    constructor(private httpClient: HttpClient) { }
    baseUrl: string = environment.baseUrl;
    token: BehaviorSubject<IToken> = new BehaviorSubject<IToken>({token: ''});
    signIn(): Observable<IToken>{
        let baseUrl = '';
        return this.httpClient.post<IToken>(`${this.baseUrl}/auth`, {userName: "jppaterno"}).pipe(
            tap(
                {
                    next: (res)=> this.token.next(res),
                    error: (err)=>alert(err?.message)
                }
            ), catchError((err: IToken)=>{ return of(err)})
        )
    }
}