import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";

const appRoutes: Routes = [
    {path: '', component: InicioComponent},

]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);