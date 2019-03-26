import { BaseResourceModel } from "../models/base-resources.model"
import { Observable, throwError } from "rxjs"
import { map, catchError, flatMap } from "rxjs/operators"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injector } from '../../../../node_modules/@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel>{

    // private apiPath: string
    protected http: HttpClient

    constructor(protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T) {
        this.http = injector.get(HttpClient)
        // console.log(this)
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this)),//o bind(this) se responsabiliza por certificar
            //que o this seja do objeto instanciado e não do map
            catchError(this.handleError)

        )
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)

        )
    }

    create(resource: T): Observable<T> {
        console.log('update()...')
        console.log('this.apiPath', this.apiPath)
        return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)

        )
    }

    update(resource: T): Observable<T> {
        console.log('create()...')
        console.log('this.apiPath', this.apiPath)
        const url = `${this.apiPath}/${resource.id}`
        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleError)

        )
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)

        )
    }

    protected jsonDataToResources(jsonData: any[]): T[] {
        console.log(this)
        const resources: T[] = []
        jsonData.forEach(
            element => resources.push(this.jsonDataToResourceFn(element))
        )

        return resources
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData)
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error)
        return throwError(error)
    }
} 