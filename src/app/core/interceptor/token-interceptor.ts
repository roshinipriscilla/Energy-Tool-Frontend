/* eslint-disable max-len */
import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from "@angular/common/http";
import { catchError, Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("accessToken");
        request = request.clone({
            setHeaders: {
                "authorization": `${token}`,
                "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Credentials": true
            }
        });

        return next.handle(request);
    }
}
