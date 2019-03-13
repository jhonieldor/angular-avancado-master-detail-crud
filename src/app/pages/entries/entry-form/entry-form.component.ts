import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entry } from '../shared/entry.model';
import toastr from "toastr"
import { switchMap } from "rxjs/operators"
import { ValueConverter } from '../../../../../node_modules/@angular/compiler/src/render3/view/template';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit{

  
  categories: Array<Category>

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShor: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

// protected injector: Injector, protected categoryService: CategoryService
  constructor(protected injector: Injector, protected entryService: EntryService,
    private categoryService: CategoryService) {
    super(injector, new Entry(), entryService, Entry.fromJson)
  }

  ngOnInit() {
    this.loadCategories()
    super.ngOnInit()
  }

  // ngAfterContentChecked() {
  //   this.setPageTitle()
  // }

  // submitForm() {
  //   this.submittingForm = true
  //   if (this.currentAction == "new") {
  //     this.createEntry()
  //   } else {
  //     this.updateEntry()
  //   }

  // }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    })
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories
    })
  }

  protected creationPageTitle(): string{
    return "Cadastro de Novo Lançamento"
  }

  protected editionPageTitle(): string {
    const entryName = this.resource.name || ""
    return "Editando Lançamento: " + entryName
  }


  

}
