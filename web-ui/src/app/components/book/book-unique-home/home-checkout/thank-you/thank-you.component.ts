import { Component, OnInit,Input } from '@angular/core';
import { BookingDetailsModel } from '../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-book-thank-you',
  templateUrl: './thank-you.component.html'
})
export class BookThankYouComponent implements OnInit {
  
  transactionId:string = "";
  constructor( private router: Router,
    public route: ActivatedRoute) {

  }

  ngOnInit() {
      this.transactionId = this.route.snapshot.params.genValue;
  }

  // async getBookIndividual() {
  //   this.bookUnique.CheckIn = '2018-01-18';
  //   this.bookUnique.CheckOut = '2018-01-18';
  //   this.bookUnique.NumberofGuestsInRoom = 120;
  //   try {
  //     const response = await this.bookService.getBookIndividual(this.bookUnique);
  //     // console.log(response.data.Result);
  //   } catch (e) {

  //   }
  // }
}