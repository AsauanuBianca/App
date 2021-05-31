import { Component, OnInit } from '@angular/core';
import { hostService } from '../host.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataStorageService } from '../data-storage.service';


@Component({
  selector: 'app-host-edit',
  templateUrl: './host-edit.component.html',
  styleUrls: ['./host-edit.component.css']
})
export class HostEditComponent implements OnInit{

  id: number;
  editMode = false;
  hostForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private hostService: hostService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
   
  
    if (this.editMode) {
      this.hostService.updateHost(this.id, this.hostForm.value);
    } else {
      this.hostService.addHost(this.hostForm.value);
    }
    this.dataStorageService.storeHost();
    this.router.navigate(['/admin'], { relativeTo: this.route });
    
  }

  onCancel() {
    this.router.navigate(['/admin'], { relativeTo: this.route });
  }

  private initForm() {
    let hostTitle = '';
    let hostImagePath = '';
    let hostDescription = '';
    let hostAdress ='';
    let hostContent ='';
  


  if (this.editMode) {
      const host = this.hostService.getHost(this.id);
      hostTitle = host.title;
      hostImagePath = host.imagePath;
      hostAdress = host.adress;
      hostDescription = host.description;
      hostContent = host.content;

    }
  

    this.hostForm = new FormGroup({
      title: new FormControl(hostTitle, Validators.required),
      imagePath: new FormControl(hostImagePath, Validators.required),
      adress: new FormControl(hostAdress, Validators.required),
      description: new FormControl(hostDescription, Validators.required),
      content: new FormControl(hostContent, Validators.required),
     
    });
  }


}

  