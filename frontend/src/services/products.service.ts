import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { productInterface } from "src/components/products/products.component";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(
    private http: HttpClient
  ){}

  public getProducts() {
    return this.http.get(environment.apiUrl + 'products');
  }

  public addProduct(product: productInterface) {
    return this.http.post(environment.apiUrl + 'products', {
      name: product.name,
      desc: product.desc,
      price: product.price
    })
  }

  public editProduct(product: productInterface) {
    return this.http.put(environment.apiUrl + 'products/' + product.id, {
      name: product.name,
      desc: product.desc,
      price: product.price
    })
  }

  public deleteProduct(product: productInterface) {
    this.http.delete(environment.apiUrl + 'products/' + product.id)
  }
}
