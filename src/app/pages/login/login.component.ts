import { Component, OnInit } from '@angular/core';
import {positionTopPage} from '../../utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    positionTopPage();
  }

}
