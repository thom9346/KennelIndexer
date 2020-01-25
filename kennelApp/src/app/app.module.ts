import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NameIndexComponent } from './pages/name-index/name-index.component';

//customs
import { FilterPipe } from './pipes/filter.pipe'

//ng-zorro
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AddPeopleComponent } from './modals/add-people/add-people.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NameIndexComponent,
    FilterPipe,
    AddPeopleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTableModule,
    NzInputModule,
    NzModalModule,
    NzProgressModule
  ],
  exports: [
    FilterPipe
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
