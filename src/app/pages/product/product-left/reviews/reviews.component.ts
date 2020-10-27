import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConfigService} from '../../../../services/config.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnChanges {

  @Input('product') product: any;
  reviewBars: Array<any>;
  loading: boolean;

  constructor(public _configService: ConfigService) {
    this.loading = false;
    this.reviewBars = [];
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('product review', this.product);
    this.gruoupByReviews();
  }

  gruoupByReviews() {
    const agrupacion = _.groupBy(this.product.reviews, 'review');
    const totalReviews = this.product.reviews.length;
    const resultsObject = [];
    const defaultReviews = [];
    for (let i = 1; i < 6; i++) {
      defaultReviews.push({'value': i, 'quantity': 0, 'average': 0});
    }


    _.forEach(agrupacion, (review, idx) => {
      resultsObject.push({'value': Number(idx), 'quantity': review.length, 'average': (review.length * 100) / totalReviews});
    });

    // Armando con los datos reales
    defaultReviews.map((review) => {

      const findReviewInResult = _.filter(resultsObject, (result) => {
        return result.value === review.value;
      });

      if (findReviewInResult.length > 0) {
        review.quantity = findReviewInResult[0].quantity;
        review.average = findReviewInResult[0].average;
      }
    });

    this.reviewBars = _.clone(defaultReviews);

  }

}
