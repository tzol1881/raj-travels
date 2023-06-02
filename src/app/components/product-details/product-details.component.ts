import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any = {};
  ratingArr: number[] = [];
  starCount: number = 5;
  rating: number = 0;
  userRole: string = '';
  constructor(
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {
  }

  ngOnInit(): void {
    this.productDetails = this.product.product
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
