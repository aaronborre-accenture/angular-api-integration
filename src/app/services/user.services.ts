import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IUser } from './../interfaces/user.interface';
import { AuthService } from './auth.services';

@Injectable({providedIn: 'root'})
export class UserService {
    baseUrl = environment.baseUrl;
    url: string = `${this.baseUrl}/users`
    userList$: BehaviorSubject<IUser[]> =  new BehaviorSubject<IUser[]>([]); ;
    userDetails$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({  
        id: '',
        fullName: '',
        userName: '',
        contactNo: '',
        photo: '',
        createdBy: '',
        dateCreated: '',
        email: '',
        description: ''
    });

    headers = new HttpHeaders({
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token') || '',
     });
    options = { headers: this.headers };

    getToken(){
        
    }
     

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    register(user: IUser): Observable<IUser> {
        return this.httpClient.post<IUser>(`${this.url}/add`, {user: user}, this.options).pipe(
            tap({
                next: (res: IUser) => {
                    //run code here for successful user registration
                    res ? alert('successfully registered') : alert('registration failed : Username is already taken')
                },
                error: (err) => console.log('error ', err)
            }), catchError(this.handleError<IUser>('register'))
        )
    }

    list(): Observable<IUser[]>{
        return this.httpClient.post<IUser[]>(`${this.url}/list`, {searchString:''},  {
            headers: new HttpHeaders({
                "token": "4ypq1bee8j2g9lmhl8tvjj"
            })
            }).pipe(
            tap({
                next: (res: IUser[]) => this.userList$.next(res),
                error: (err) => console.log('error ', err)
            }), catchError(this.handleError<IUser[]>('list'))
        )
    }

    update(user: IUser): Observable<IUser> {
        let updated = (user:IUser)=>{
            alert('successfully updated')
            this.userDetails$.next(user)
        }
        return this.httpClient.post<IUser>(`${this.url}/update`, {user: user}, this.options).pipe(
            tap({
                next: (res: IUser) => {
                    //run code here for successful user update
                    res ? updated(user) : alert('update fail')
                },
                error: (err) => console.log('error ', err)
            }), catchError(this.handleError<IUser>('update'))
        )
    }

    view(id: string): Observable<IUser>{
        return this.httpClient.post<IUser>(`${this.url}/view`, {id}, this.options).pipe(
            tap({
                next: (res: IUser) => this.userDetails$.next(res),
                error: (err: any) => console.log(err)
            }), catchError(this.handleError<IUser>('view'))
        )
    }

    delete(id: string): Observable<boolean>{
        return this.httpClient.post<boolean>(`${this.url}/delete`, {id}, this.options).pipe(
            tap({
                next: (res: boolean) => res && this.list().subscribe(),
                error: (err: any) => console.log(err)
            }), catchError(this.handleError<boolean>('delete'))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error); 
          console.log(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
    }
    
}