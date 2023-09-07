import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SampleHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request URL matches the desired route
    if (request.url.includes('/users/view') || request.url.includes('/users/list/:id')) {
      // Clone the request and add your desired headers
      const modifiedRequest = request.clone({
        setHeaders: {
          'CUSTOM_SAMPLE': 'SAMPLE',
        }
      });

      // Pass the modified request to the next interceptor or to the HTTP handler
      return next.handle(modifiedRequest);
    }

    // If the route doesn't match, proceed without modifying the request
    return next.handle(request);
  }
}