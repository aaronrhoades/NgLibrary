import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
console.log('auth request',req);

  // Get the access token from local storage
  const accessToken = localStorage.getItem('accessToken');

  // If the access token exists, clone the request and add the Authorization header
  if (accessToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    // Pass the cloned request to the next handler
    return next(authReq);
  }
  // If there is no access token, just pass the original request to the next handler

  return next(req);
};
