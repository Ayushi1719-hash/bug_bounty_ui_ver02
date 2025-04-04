import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { tokenInterceptorProvider } from './app/token.interceptor';
import { NgxMonacoEditorConfig, provideMonacoEditor } from 'ngx-monaco-editor-v2';
import { firebaseConfig } from './app/firebase.config';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';

export function onMonacoLoad() {
  console.log("Monaco config");
}


const monacoConfig: NgxMonacoEditorConfig = {
  // You can pass cdn url here instead
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad,
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(withInterceptorsFromDi()), provideHttpClient(),tokenInterceptorProvider, provideRouter(routes), provideMonacoEditor(monacoConfig), provideHttpClient(withInterceptorsFromDi()), tokenInterceptorProvider, provideFirebaseApp(() => initializeApp(firebaseConfig))]
};
