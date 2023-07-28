export class ProductModel {
  id: string;
  name: string;
  desc: string;
  price: number;

  constructor(id?:string, data?:{ name: string, desc: string, price:number }) {

    if(id != undefined) {
      this.id = id;
    } else {
      this.id = '';
    }

    if(data) {
      this.name = data.name;
      this.desc = data.desc;
      this.price = data.price;
    } else {
      this.name = '';
      this.desc = '';
      this.price = 0;
    }
  }
}
