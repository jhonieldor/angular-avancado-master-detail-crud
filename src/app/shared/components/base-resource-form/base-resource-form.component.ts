import { OnInit, AfterContentChecked, Injector } from '../../../../../node_modules/@angular/core';
import { FormGroup, FormBuilder } from '../../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { BaseResourceModel } from '../../models/base-resources.model';
import { Inject } from '../../../../../node_modules/@angular/compiler/src/core';
import { BaseResourceService } from '../../services/base-resource.service';
import { switchMap } from '../../../../../node_modules/rxjs/operators';
import toastr from "toastr"

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string
    resourceForm: FormGroup
    pageTitle: string
    serverErrorMessages: string[] = null
    submittingForm: boolean = false


    protected route: ActivatedRoute
    protected router: Router
    protected formBuilder: FormBuilder

    // category: Category = new Category()

    constructor(protected injector: Injector,
        public resource: T,
        public resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData) => T) {
        this.route = this.injector.get(ActivatedRoute)
        this.router = this.injector.get(Router)
        this.formBuilder = this.injector.get(FormBuilder)
    }

    ngOnInit() {
        this.setCurrentAction()
        this.buildResourceForm()
        this.loadResource()
    }

    ngAfterContentChecked() {
        // this.setPageTitle()
    }

    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new")
            this.currentAction = this.creationPageTitle()
        else
            this.currentAction = "edit"


    }

    protected creationPageTitle(): string {
        return "Novo"
    }

    protected editionPageTitle(): string {
        return "Edição"
    }

    protected setPageTitle() {
        if (this.currentAction == 'new') {
            this.pageTitle = this.creationPageTitle()
        } else {
            // const categoryName = this.categor
        }
    }

    protected loadResource() {
        if (this.currentAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get("id")))
            ).subscribe((resource: any) => {
                this.resource = resource
                this.resourceForm.patchValue(resource)

            }, (error) => alert('Ocorreu um erro no servidor, tente mais tarde.'))
        }
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)

        this.resourceService.create(resource)
            .subscribe(resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)

        this.resourceService.update(resource).subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
        )
    }

    private actionsForSuccess(resource: T) {
        toastr.success("Solicitação processada com sucesso!")

        const baseComponentPath: string = this.route.snapshot.parent.url[0].path

        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentPath, resource.id, "edit"])
        )
    }

    private actionsForError(error) {
        toastr.error("Ocorreu um erro ao processar a sua solicitação!")
        this.submittingForm = false

        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors
        } else {
            this.serverErrorMessages = ["Falhas na comunicação com o servidor. Por favor, tente mais tarde."]
        }
    }

    submitForm() {
        this.submittingForm = true

        if (this.currentAction == "new") {
            this.createResource()
        } else {
            this.updateResource()
        }

    }

    protected abstract buildResourceForm(): void



}