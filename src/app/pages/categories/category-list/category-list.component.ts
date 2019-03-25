import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { element } from '../../../../../node_modules/@angular/core/src/render3';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  // categories: Category[] = []

  constructor(private categoryService: CategoryService) { 
    super(categoryService)
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(categories => this.resources = categories,
      error => alert('Erro ao carregar a lista'))
  }


  deleteCategory(category: Category) {
    const mustDelete = confirm('Deseja realmente excluir este item?')
    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => this.resources = this.resources.filter(element => element != category),
        () => alert("Erro ao tentar excluir!")
      )
    }

  }

}
