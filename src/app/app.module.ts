import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppServices } from './services/appservices';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupFormComponent } from './components/user/signup-form/signup-form.component';
import { SignupDetailsComponent } from './components/user/signup-details/signup-details.component';
import { FieldmatchesDirective } from './components/validators/fieldmatches.directive';
import { RouterModule, Routes } from '@angular/router';

const routesPaths = {
    signupForm: 'signup-form',
    signupDetails: ''
};

export const appRoutes: Routes = [
];

@NgModule({
    declarations: [
        AppComponent,
        SignupFormComponent,
        SignupDetailsComponent,
        FieldmatchesDirective
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [AppServices],
    bootstrap: [AppComponent]
})
export class AppModule { }
