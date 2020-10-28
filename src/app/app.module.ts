import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './modules/header/header.component';
import { HeaderPromotionComponent } from './modules/header-promotion/header-promotion.component';
import { HeaderMobileComponent } from './modules/header-mobile/header-mobile.component';
import { NewletterComponent } from './modules/newletter/newletter.component';
import { FooterComponent } from './modules/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { PreloadComponent } from './shared/preload/preload.component';
import { HomeFeaturesComponent } from './pages/home/home-features/home-features.component';
import { HomePromotionsComponent } from './pages/home/home-promotions/home-promotions.component';
import { HomeHotTodayComponent } from './pages/home/home-hot-today/home-hot-today.component';
import { HomeTopCategoriesComponent } from './pages/home-top-categories/home-top-categories.component';
import { HomeShowCaseComponent } from './pages/home/home-show-case/home-show-case.component';
import { OwlCarouselDirective } from './directives/owl-carousel.directive';
import { ProductsBreadcrumbComponent } from './pages/products/products-breadcrumb/products-breadcrumb.component';
import { BestSalesItemComponent } from './pages/products/best-sales-item/best-sales-item.component';
import { SlickDirective } from './directives/slick.directive';
import { LightBoxDirective } from './directives/light-box.directive';
import { CountDownDirective } from './directives/count-down.directive';
import { RatingDirective } from './directives/rating.directive';
import { ProgressBarDirective } from './directives/progress-bar.directive';
import { ProductsRecommendedComponent } from './pages/products/products-recommended/products-recommended.component';
import { ProductsShowCaseComponent } from './pages/products/products-show-case/products-show-case.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import { TabsDirective } from './directives/tabs.directive';
import { SearchBreadcrumbComponent } from './pages/search/search-breadcrumb/search-breadcrumb.component';
import { SearchShowcaseComponent } from './pages/search/search-showcase/search-showcase.component';
import { CallToActionComponent } from './pages/product/call-to-action/call-to-action.component';
import { ProductBreadcrumbComponent } from './pages/product/product-breadcrumb/product-breadcrumb.component';
import { ProductLeftComponent } from './pages/product/product-left/product-left.component';
import { ProductRightComponent } from './pages/product/product-right/product-right.component';
import { DomSanitizerPipe } from './pipes/dom-sanitizer.pipe';
import { BoughtTogetherComponent } from './pages/product/product-left/bought-together/bought-together.component';
import { VendorStoreComponent } from './pages/product/product-left/vendor-store/vendor-store.component';
import { ReviewsComponent } from './pages/product/product-left/reviews/reviews.component';
import { SimilarBoughtComponent } from './pages/product/similar-bought/similar-bought.component';
import { RelatedProductComponent } from './pages/product/related-product/related-product.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderPromotionComponent,
    HeaderMobileComponent,
    NewletterComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    SearchComponent,
    Error404Component,
    HomeBannerComponent,
    PreloadComponent,
    HomeFeaturesComponent,
    HomePromotionsComponent,
    HomeHotTodayComponent,
    HomeTopCategoriesComponent,
    HomeShowCaseComponent,
    OwlCarouselDirective,
    ProductsBreadcrumbComponent,
    BestSalesItemComponent,
    SlickDirective,
    LightBoxDirective,
    CountDownDirective,
    RatingDirective,
    ProgressBarDirective,
    ProductsRecommendedComponent,
    ProductsShowCaseComponent,
    TabsDirective,
    SearchBreadcrumbComponent,
    SearchShowcaseComponent,
    CallToActionComponent,
    ProductBreadcrumbComponent,
    ProductLeftComponent,
    ProductRightComponent,
    DomSanitizerPipe,
    BoughtTogetherComponent,
    VendorStoreComponent,
    ReviewsComponent,
    SimilarBoughtComponent,
    RelatedProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
