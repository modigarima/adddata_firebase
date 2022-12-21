import { Component,OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adddata_firebase';
   id:string;

   PersonalData: PersonalData = new PersonalData();

  constructor(public db: AngularFireDatabase,private router:ActivatedRoute) { }

  ngOnInit() {

     
    }; 
  







  addTask() {
   
    if (this.PersonalData.FirstName == "") {
      alert( "Please enter FirstName !!!");
      return;
    }
    if (this.PersonalData.LastName == "") {
      alert( "Please enter LastName !!!");
      return;
    }
    if (this.PersonalData.City == "") {
      alert( "Please enter City !!!");
      return;
    }
  
    
    let lastKey = 1;
    let dbPath = "PersonalData/lastKey";

    let lastKeyInstance = this.db.object(dbPath).valueChanges().subscribe(
      data => {
        console.log(data)
        lastKeyInstance.unsubscribe();
        if (data != null) {
          lastKey = Number(data) + 1;
        }
        dbPath = "PersonalData/" + lastKey;
        this.db.object(dbPath).update({ firstname: this.PersonalData.FirstName, lastname: this.PersonalData.LastName, city: this.PersonalData.City});
        
        dbPath = "PersonalData/";
        this.db.object(dbPath).update({lastKey:lastKey})

      }
    )

  }

}


export class PersonalData {

  FirstName:string;
  LastName:string;
  City:string;
 
  

 
}
