import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StoresService} from '../../../../services/stores.service';
import {ConfigService} from '../../../../services/config.service';


@Component({
  selector: 'app-vendor-store',
  templateUrl: './vendor-store.component.html',
  styleUrls: ['./vendor-store.component.css']
})
export class VendorStoreComponent implements OnChanges {

  @Input('store') store: string;
  storeLoaded:any;
  loading:boolean;

  constructor(private _storesService:StoresService,
              public _configService:ConfigService) {
    this.storeLoaded = null;
    this.loading = false;
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    this._storesService.getFilterData('store', this.store).subscribe(
      (responseStore) => {
        this.storeLoaded = responseStore[0];
        this.loading = false;
      }
    )

  }

}
