import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  isNewEmployee: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ){ 
    this.isNewEmployee = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: param => {
        if(param?.['new'])
          this.isNewEmployee = true
      }
    })
  }

  goBack() {
    this.router.navigateByUrl('/admin/funcionarios')
  }

  
}
