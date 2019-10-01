import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../routes/app-routing.module';
import { WbComponent } from '../../components/container/wb.component';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {StoreEnhancer} from 'redux';
import {environment} from '../../environments/environment';
import {IAppState} from '../interfaces/appState.interface';
import {INITIAL_STATE, reducerApp} from '../store/store';
import { MapComponent } from '../../components/components/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    WbComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2On2f9AY0mW9_QhSVMB42wsrl_tzIjxo'
    })
  ],
  providers: [],
  bootstrap: [WbComponent]
})
export class AppModule {
  constructor(private ngredux: NgRedux<IAppState>,
              private reduxDevTools: DevToolsExtension) {
    const enhancers: StoreEnhancer<IAppState>[] = (this.reduxDevTools.isEnabled() && !environment.production)
      ? [this.reduxDevTools.enhancer()] : [];

    ngredux.configureStore(reducerApp, INITIAL_STATE, [], enhancers);
  }
}
