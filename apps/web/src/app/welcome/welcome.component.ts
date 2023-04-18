import { Component, OnInit } from "@angular/core";
import { first } from "rxjs";
import { Store } from "@ngrx/store";

import { AuthActions, AuthFeature } from "../store/auth";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [NgIf, AsyncPipe],
})
export default class WelcomeComponent implements OnInit {
  user$ = this.store.select(AuthFeature.selectUser);

  ngOnInit(): void {
    this.user$.pipe(
      first(user => user === null)
    ).subscribe(() => {
      this.store.dispatch(AuthActions.getUserRequest())
    })
  }


  constructor(private store: Store) { }

}