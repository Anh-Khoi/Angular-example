import { Component,OnInit } from '@angular/core';
import { Project } from './Proj';
import { Projects } from './Project-detail';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'example-project';
  filteredItems : Project[];
   pages : number = 4;
   pageSize : number = 5;
   optionPageSize: number[] = [
    3,5,7,11
   ]
   pageNumber : number = 0;
   currentIndex : number = 1;
   items: Project[];
   pagesIndex : Array<number>;
   pageStart : number = 1; 
   inputName : string = '';
   constructor( ){
    this.filteredItems = Projects;
  this.init();
  this.items = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
  this.pagesIndex =  this.fillArray();
};

init(){
  this.currentIndex = 1;
  this.pageStart = 1;
  this.pages = 4;

  this.pageNumber = parseInt(""+ (this.filteredItems.length / this.pageSize));
  if(this.filteredItems.length % this.pageSize != 0){
     this.pageNumber ++;
  }

  if(this.pageNumber  < this.pages){
        this.pages =  this.pageNumber;
  }

  this.refreshItems();
  console.log("this.pageNumber :  "+this.pageNumber);
}

prevPage(){
  if(this.currentIndex>1){
     this.currentIndex --;
  } 
  if(this.currentIndex < this.pageStart){
     this.pageStart = this.currentIndex;
  }
  this.refreshItems();
}

nextPage(){
  if(this.currentIndex < this.pageNumber){
        this.currentIndex ++;
  }
  if(this.currentIndex >= (this.pageStart + this.pages)){
     this.pageStart = this.currentIndex - this.pages + 1;
  }

  this.refreshItems();
}

setPage(index : number){
  this.currentIndex = index;
  this.refreshItems();
}

refreshItems(){
  this.items = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
  this.pagesIndex =  this.fillArray();
}

fillArray(): any{
  var obj = new Array();
  for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
              obj.push(index);
  }
  return obj;
}

FilterByName(){
  this.filteredItems = [];
  if(this.inputName != ""){
        Projects.forEach(element => {
            if(element.name.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
              this.filteredItems.push(element);
           }
        });
  }else{
     this.filteredItems = Projects;
  }
  console.log(this.filteredItems);
  this.init();
}

}


