import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "src/services/products.service";
import { productInterface } from "../products.component";

@Component({
  selector: 'app-product-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['../products.component.scss']
})

export class ProductFormComponent implements OnInit {

  @Input() product: any;
  @Output() close = new EventEmitter<any>

  currentProduct: productInterface = { id: '', name: '', desc: '', price: 0.0}
  editProduct: boolean = false;

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);

  desc = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(1000)
  ]);

  price = new FormControl(0, [
    Validators.required,
    Validators.min(1),
    Validators.max(20000)
  ]);

  productForm = new FormGroup({
    name: this.name,
    desc: this.desc,
    price: this.price
  });

  title = "Add new "
  isLoading: boolean = true;


  constructor(
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    if(this.product.id != undefined) {
      this.title = "Edit";
      this.productForm.setValue({
        name: this.product.name,
        desc: this.product.desc,
        price: this.product.price
      })
    }
    this.isLoading = false;
  }

  cancel() {
    this.close.emit();
  }

  refreshForm() {
    this.editProduct = false;
    this.currentProduct = {id: '',  desc: '', name: '', price: 0};
    this.isLoading = false;
  }

  saveOrUpdate() {
    console.log(this.productForm.value)
  }
}
