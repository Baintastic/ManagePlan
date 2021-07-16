import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  searchText: string = "";
  formData: Person = new Person();

  constructor(public personService: PersonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.personService.refreshList();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.personService.list.length
    };

    this.form = new FormGroup({
      search: new FormControl(''),
    });

  }

  populateForm(selectedRecord: Person) {
    this.personService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    this.personService.deletePerson(id)
      .subscribe(
        res => {
          this.personService.refreshList();
        },
        err => { console.log(err) }
      )
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

}
