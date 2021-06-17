import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Person } from './shared/person.model';
import { PersonService } from './shared/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styles: [
  ]
})
export class PersonsComponent implements OnInit {
  config: any;
  form: FormGroup | undefined;
  
  constructor(public service: PersonService, private route: ActivatedRoute, private router: Router ) { }
  searchText: string = "";
  formData: Person = new Person();

  ngOnInit(): void {
    
    this.service.refreshList();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.service.list.length
    };

    this.form = new FormGroup({
      search: new FormControl(''),
    });

    
    // this.form.get('search').valueChanges
    // .subscribe(x => {
    //   this.form.get('input2').setValue(x);
    //   this.setTotalValue();
    // })

  }

  populateForm(selectedRecord: Person) {
    this.service.formData = Object.assign({},selectedRecord);
    //this.router.navigate([`detail/${selectedRecord.code}`], { relativeTo: this.route });
  }
 
  onDelete(id:number)
  {
    this.service.deletePerson(id)
    .subscribe(
      res=>{
         this.service.refreshList();
      },
      err=>{console.log(err)}
    )
  }

  pageChanged(event : any){
    this.config.currentPage = event;
  }

  // navigateToAddNewPerson() {
  //   let navigationExtras: NavigationExtras = {

  //   }
  //   this.router.navigate(['add'], { relativeTo: this.route });
  // }
}
