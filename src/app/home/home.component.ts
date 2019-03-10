import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string;
  isLoading: boolean;
  plans: { type: string; image: string; price: string }[];

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });

    this.plans = [
      {
        type: 'N26',
        price: '0.00',
        image:
          'https://images.ctfassets.net/q33z48p65a6w/2DqC4xSMtayA6kmOo64I0E/604829a1ba76d613f65367ebeceb76f6/Standard.png?fit=thumb&w=275&q=60&fm=jpg&fl=progressive'
      },
      {
        type: 'N26 Black',
        price: '9.90',
        image:
          'https://images.ctfassets.net/q33z48p65a6w/4OBArVypLGoAqgu42iQK6O/9221d0fad9c87fe7837cea20a270103d/n26-cards-mastercard-black-en.png?fit=thumb&w=275&q=60&fm=jpg&fl=progressive'
      }
    ];
  }
}
