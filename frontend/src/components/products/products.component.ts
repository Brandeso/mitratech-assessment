import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";
import { ProductsService } from "src/services/products.service";


export interface productInterface {
  id: string,
  name: string,
  desc: string,
  price: number
}

const productsData: productInterface[] = [];

@Component({
  selector: 'app-products',
  templateUrl:'./products.component.html',
  styleUrls: ['../components.styles.scss', './products.component.scss']
})

export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.datasource.paginator = value;
  }

  isLoading = false;
  productForm = false;
  datasource = new MatTableDataSource<productInterface>(productsData);

  displayedColumns: string[] = ["position", "name", "description", "price"];

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this.datasource.paginator = this.paginator;
    this.getProducts();
    this.isLoading = false;
  }

  getProducts() {
    return this.productsService.getProducts().subscribe((products:any) => {
      let productData: productInterface[] = [];
      products.snapData.forEach((product: productInterface) => {
        productData.push(product);
       })
       this.datasource.data = productData;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}
