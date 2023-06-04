import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../service/crud-service.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public taskObj : Task = new Task()
  public taskArr : Task[] | undefined = []

  public addTaskValue : string = ''
  public editTaskValue : string = ''

  constructor(private crudServiceService : CrudServiceService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudServiceService.getAllTask().toPromise().then(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    this.taskObj.taskInput = this.addTaskValue;
    this.crudServiceService.addTask(this.taskObj).toPromise().then(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.taskInput = this.editTaskValue;
    this.crudServiceService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to update task");
    })
  }

  deleteTask(etask : Task) {
    this.crudServiceService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.taskInput;
  }
}
