import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl= environment.apiUrl;
  validationErrors:string[]=[];

  constructor(private http:HttpClient){

  }

  get404Error(){
    this.http.get(this.baseUrl+"error/not-found").subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  get400Error(){
    this.http.get(this.baseUrl+"error/bad-request").subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  get500Error(){
    this.http.get(this.baseUrl+"error/server-error").subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  get401Error(){
    this.http.get(this.baseUrl+"error/auth").subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  getValidationError(){
    this.http.post(this.baseUrl+"account/register",{}).subscribe({
      next:response=>console.log(response),
      error:error=>{
        console.log(error);
        this.validationErrors=error;
      }
    })
  }
}
