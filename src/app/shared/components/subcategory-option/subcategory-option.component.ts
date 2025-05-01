import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

export interface Subcategory {
  image: string;
  name: string;
  alt: string;
  query: string;
}

@Component({
  selector: 'app-subcategory-option',
  imports: [
    RouterLink
  ],
  templateUrl: './subcategory-option.component.html',
  styleUrl: './subcategory-option.component.css'
})
export class SubcategoryOptionComponent {
    @Input() subcategory!: Subcategory;
}
