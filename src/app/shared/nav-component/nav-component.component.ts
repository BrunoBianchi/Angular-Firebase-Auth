import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent implements OnInit {
  public user:any;
  ngOnInit(): void {
    this.user =  localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')||""):null;
    console.log(this.user)
  }

}
