import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { ToastType } from '../models/toast';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const accessToken = localStorage.getItem('accessToken');
  const authService = inject(AuthService)
  const toastService = inject(ToastService)

  //if user is logged in, refresh request
  if(authService.isLoggedIn()) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });

    return next(authReq)
    .pipe(
      tap(
        {
          error: (err: any) => {
            if(err.status === 401) {
              authService.deleteToken();
              toastService.updateToast({
                body:'You have been logged out. Please log in again to continue.',
                type: ToastType.error,
                duration: 8000
              });
              router.navigateByUrl('/login');
            }
            else if (err.status === 403) {
              toastService.updateToast({
                body:'You are not authorized to perform this action.',
                type: ToastType.error,
                duration: 8000
              });
            }
          }
        }
      )
    )
  }
  // If there is no access token, just pass the original request to the next handler
  return next(req);
};
