import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from 'src/app/alert/alert.model';
import { AlertService } from 'src/app/alert/alert.service';
import { Person } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styles: [
  ]
})
export class PersonDetailComponent implements OnInit {
  isEditForm = true;
  showAlert = false;
  selectedPersonRecord: Person = new Person();
  recordExists = false;
  constructor(public personService: PersonService, private router: Router, public alertService: AlertService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.router.url === "/add-person") {
      this.personService.formData = new Person();
      this.isEditForm = false;
      return;
    }

    //else get person details to update
    var personId = Number(this.route.snapshot.paramMap.get('id'));
    this.personService.getPersonById(personId).subscribe(
      res => {
        this.selectedPersonRecord = res as Person
        this.personService.formData = Object.assign({}, this.selectedPersonRecord);
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (this.personService.formData.code == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    //check if record exits before creating a new one
    this.personService.getPersonByIdNumber(form.value.id_Number).subscribe(
      res => {
        var data = res as Person;
        if (data) {
          this.recordExists = true;
          this.alertService.changeMessage(AlertType.Warning, "ID number")
          this.showAlert = true;
          this.closeAlert();
        }
        else {
          this.personService.postPerson(form.value).subscribe(
            res => {
              this.alertService.changeMessage(AlertType.Success)
              this.showAlert = true;
              this.closeAlert();
              setTimeout(() => {
                this.router.navigate(['/persons']);
              }, 2000);
              this.resetForm(form);
              this.personService.refreshList();
            },
            err => {
              console.log(err);
            });
        }
      },
      err => {
        console.log(err);
      });
  }

  updateRecord(form: NgForm) {
    this.personService.putPerson().subscribe(
      res => {
        this.alertService.changeMessage(AlertType.UpdateSuccess)
        this.showAlert = true;
        this.closeAlert();
        this.resetForm(form);
        this.ngOnInit();
        this.personService.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.personService.formData = new Person();
  }

  closeAlert() {
    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }
}
