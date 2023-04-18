import { FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthActions, selectAuthenticated } from "../store/auth";
import { LoginCredentials } from "@example/shared";
import { first } from "rxjs";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  imports: [ReactiveFormsModule]
})
export default class LoginComponent implements OnInit {
  form = this.fb.group({
    username: '',
    password: ''
  })

  onSubmit() {
    const data = this.form.value;
    if (!data.username || !data.password) return;
    this.store.dispatch(AuthActions.loginRequest({ payload: data as LoginCredentials }))
  }

  ngOnInit(): void {
    this.store.select(selectAuthenticated).pipe(
      first((value) => value === true),
    ).subscribe(() => {
      this.router.navigate(['/']);
    })

  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) { }

}