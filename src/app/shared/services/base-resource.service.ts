import { BaseResourceModel } from "../models/base-resources.model"
import { Observable, throwError } from "rxjs"
import { map, catchError, flatMap } from "rxjs/operators"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injector } from '../../../../node_modules/@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel>{

    // private apiPath: string
    protected http: HttpClient

    constructor(protected apiPath: string, protected injector: Injector) {
        this.http = injector.get(HttpClient)
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResources)
        )
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        )
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        )
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`

        return this.http.put(url, resource).pipe(
            catchError(this.handleError),
            map(() => resource)
        )
    }

    delete(id: number): Observable<any>{
        const url = `${this.apiPath}/${id}`
        return this.http.delete(url).pipe(
          catchError(this.handleError),
          map(() => null)
        )
      }

    protected jsonDataToResources(jsonData: any[]): T[] {
        const categories: T[] = []
        jsonData.forEach(element => categories.push(element as T))
        return categories
    }

    protected jsonDataToResource(jsonData: any): T {
        return jsonData as T
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error)
        return throwError(error)
    }
} 