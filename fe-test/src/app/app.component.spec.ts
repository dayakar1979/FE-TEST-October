import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import {FormsModule} from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, AppModule, FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fe-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fe-test');
  });

  

  it('should update the amount on the input field', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const inputDe = fixture.debugElement.query(By.css('input[name="amountId"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = '100';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('input[name="amountId"]'));
    expect(de.nativeElement.value).toEqual('100');
  });

  it('should show a validation error if the amount or to account or both was touched but left empty', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    
    const inputDe = fixture.debugElement.query(By.css('input[name="amountId"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = '100';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const inputDe2 = fixture.debugElement.query(By.css('input[name="toAccountId"]'));
    const inputE2 = inputDe2.nativeElement;
    inputE2.value = '100';
    inputE2.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button[name="submitButton"]')).triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() =>{
      const inputDe1 = fixture.debugElement.query(By.css('input[name="validationId"]'));
      console.log('test');
      expect(inputDe1.nativeElement.value).toBeFalse();
    })
    
    
  });

  it('should the transfer amount to be deducted from original balance', () => {
    
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    let balanceBeforeTransfer = Number(app.totalAmount);
    fixture.detectChanges();
    
    const inputDe = fixture.debugElement.query(By.css('input[name="amountId"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = '100';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const inputDe2 = fixture.debugElement.query(By.css('input[name="toAccountId"]'));
    const inputE2 = inputDe2.nativeElement;
    inputE2.value = '100';
    inputE2.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    

    fixture.debugElement.query(By.css('button[name="submitButton"]')).triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button[name="transferButton"]')).triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() =>{
      app = fixture.componentInstance;
      expect(app.totalAmount).toEqual(balanceBeforeTransfer-Number(inputEl.value));
    })
  });

});
