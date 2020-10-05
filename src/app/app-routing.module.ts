import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

//CanLoad: Lo podemos utilizar para evitar al usuario cargar módulos innecesarios.

const routes: Routes = [
  { path: 'principal', loadChildren: () => 
    import('./shared/default/default.module').then(m => m.DefaultModule),
    canActivate: [CheckLoginGuard] },
  { path: '', loadChildren: () => 
    import('./auth/login/login.module').then(m => m.LoginModule)
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    preloadingStrategy: NoPreloading
  })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
