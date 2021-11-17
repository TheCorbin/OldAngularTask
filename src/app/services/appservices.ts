import { Injectable } from '@angular/core';
import { SignupForm } from '../components/user/signup-form/signup-form';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable, empty } from 'rxjs';

@Injectable()
export class AppServices implements HttpInterceptor {
    sharingData: SignupForm = { country: '', state: '', email: '', phonenumber: '', username: '' };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);
    }

    constructor() {
    }

    public getStatesJSON(countryid: any): Observable<any> {
        return empty();
    }

    public getCountriesJSON(): Observable<any> {
        return empty();
    }

    public getStateNameById(stateid): Observable<any> {
        return empty();
    }

    public getCountryNameById(countryid): Observable<any> {
        return empty();
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw('Server error');
    }

    public saveData(country: string, state: string, email: string, phonenumber: string, username: string) {

    }

    public getData() {

    }
}
