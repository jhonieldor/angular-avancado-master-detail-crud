import { Injectable, Injector } from '@angular/core';
// import { HttpClient, HttpHeaders } from "@angular/common/http"
// import { Entry } from './entry.model';

import { Observable, throwError } from "rxjs"
import { map, catchError, flatMap } from "rxjs/operators"
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { Entry } from './entry.model';


@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  // private apiPath: string = "api/entries"

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService) {
    super("api/entries", injector, Entry.fromJson)
  }


  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this))
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this))
  }

  //PRIVATE METHODS
  protected jsonDataToResources(jsonData: any[]): Entry[] {
    const entries: Entry[] = []

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element)
      entries.push(entry)
    })

    return entries
  }

  protected jsonDataToResource(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData)
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category 
        return sendFn(entry)
      })
    )
  }


}
