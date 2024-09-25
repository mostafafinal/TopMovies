import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(LoginService).getToken()!==null){

    console.log('');

    return true;
  }
  else{
    console.log("you can not access this page");
    inject(Router).navigate(["/notfound"]);
    return false;
  }
};
