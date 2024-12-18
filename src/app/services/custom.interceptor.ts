import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = localStorage.getItem('jwtToken');
  if (jwtToken) {
    var cloned = req.clone({
      headers: req.headers.set('Authorization', 'bearer ' + jwtToken),
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
