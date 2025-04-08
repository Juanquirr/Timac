import {Component, Input} from '@angular/core';

export interface Subcategory {
  image: string;
  name: string;
  alt: string;
  link: string;
}

@Component({
  selector: 'app-subcategory-option',
  imports: [],
  templateUrl: './subcategory-option.component.html',
  styleUrl: './subcategory-option.component.css'
})
export class SubcategoryOptionComponent {
    @Input() subcategory!: Subcategory;
}
