import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AssignhomeworkService {
  POSTDATA:any=[];
  constructor(private http:HttpClient) { }



  HomeworkClasses(): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};

let POSTDATA = new FormData();


POSTDATA.append('teacher_id',localStorage.getItem('tid'));


     return this.http.post(`${environment.baseUrl}/teacher_api/homework.php`,POSTDATA)

   }

 HomeworkData(homeworkid): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};

let POSTDATA = new FormData();


POSTDATA.append('homeworkid',homeworkid);


     return this.http.post(`${environment.baseUrl}/teacher_api/homework_data.php`,POSTDATA)

   }

  DeleteHomework(homeworkid): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};

let POSTDATA = new FormData();


POSTDATA.append('homeworkid',homeworkid);


     return this.http.post(`${environment.baseUrl}/teacher_api/deletehomework.php`,POSTDATA)

   }

   
   HomeworkSubjects(): Observable<any>
   {
      const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type':  'application/json'
       })};
 
  let POSTDATA = new FormData();
 
 
 POSTDATA.append('teacher_id',localStorage.getItem('tid'));
 
 
      return this.http.post(`${environment.baseUrl}/teacher_api/homeworksubjects.php`,POSTDATA)
 
    }
 
 
 
 
    HomeworkList(): Observable<any>
   {
      const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type':  'application/json'
       })};
 
  let POSTDATA = new FormData();
 
 
 POSTDATA.append('teacher_id',localStorage.getItem('tid'));
 
 
      return this.http.post(`${environment.baseUrl}/teacher_api/homeworklist.php`,POSTDATA)
 
    }
 
 
 
 
    AssignHomework(transid,subid,title,detail,completiondata,base64image,selectedFileNames,homeworkid): Observable<any>
    {
        const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })};
  
   let POSTDATA = new FormData();
  
  
   POSTDATA.append('teacher_id',localStorage.getItem('tid'));
   POSTDATA.append('transid',transid);
   POSTDATA.append('subid',subid);
   POSTDATA.append('title',title);
   POSTDATA.append('detail',detail);
   POSTDATA.append('completiondate',completiondata);
   POSTDATA.append('attached_file',JSON.stringify(base64image));
   POSTDATA.append('selectedFileNames',selectedFileNames);
   POSTDATA.append('homeworkid',homeworkid);
   
   console.log("teacher_id Here ==>",localStorage.getItem('tid'));
   console.log("transid Here ==>",transid);
   
   console.log("subid Here ==>",subid);
   console.log("title Here ==>",title);
   console.log("detail Here ==>",detail);
   console.log("completiondate Here ==>",completiondata);
   console.log("base64image Here ==>",base64image);
   console.log("selectedFileNames Here ==>",selectedFileNames);
   
   
  
       return this.http.post(`${environment.baseUrl}/teacher_api/homeworksave.php`,POSTDATA)
  
     }
}

