import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';

import { BehaviorSubject, Observable, Subject, Subscription, debounceTime } from 'rxjs';




@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export default class SearchComponent implements OnInit {

  public termInitial: string = ''
  /////////////////////////////
  private debouncer: BehaviorSubject<string> = new BehaviorSubject(this.termInitial)
  public readonly currentDebouncer: Observable<string> = this.debouncer.asObservable()
  private debouncerSuscription?: Subscription

  //////////////////////////////////
  @Output()
  public onValue = new EventEmitter<string>()
  @Output()
  public onDebounce = new EventEmitter<string>()
  /////////////////////////////////
  ngOnInit(): void {
    this.debouncerSuscription = this.currentDebouncer //como este es un observable tebemos acceso a rxjs
      .pipe(
        debounceTime(500,)
      )
      .subscribe(value => {
        this.onDebounce.emit(value)
      })
  }
  /////////////////////////////////Limpieza de la suscripcion

  /////////////////////////////////
  emitValue(value: string): void {
    this.onValue.emit(value)

  }

  onKeyPress(searchTerm: string) {
      this.debouncer.next(searchTerm)
    }


}
