import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KoapiService } from '../../koapi.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: number;
  private sub: any;
  animal: any;
  searchTextKeeper: string;
  searchTextFeed: string;
  searchTextVet: string;
  keeperlog: any;
  vetlog: any;
  feedlog: any;
  kb: any;
  dyk: any;

  constructor(private route: ActivatedRoute, private _koapi: KoapiService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getSelectedAnimal(this.id);
   });
  }

  // Get the Selected Animal
  getSelectedAnimal(animalId: any) {
    this._koapi
    .getService("Animal/" + animalId)
    .then((result) => {
      this.animal = result;
      // Add the animals's avatar image and add brackets to the nickname
      this.animal.avatar = "assets/animals/list-thumb/" + this.animal.Name.toLowerCase() + ".png";
        if (this.animal.Nickname != "") {
          this.animal.Nickname = "(" + this.animal.Nickname + ")";
        }
      // Get the Keeper, Vet, Feed Logs
      this.getKeeperLogs(animalId);
      this.getVetLogs(animalId);
      this.getFeedLogs(animalId);
      // Get the Virtual Tour Guide
      this.getKnowledgeBase(animalId);
      this.getKnowledgeBaseDyk(animalId);
    })
    .catch(error => console.log(error));
  }

  // Get Keeper Logs 
  getKeeperLogs(animalId: any) {
    this._koapi
    .getService("Animal/KeeperLog/" + animalId)
    .then((result) => {
      this.keeperlog = result;
      // Reformat the date
      this.keeperlog.forEach(l => {
        let day = l.LogDate.substring(8,10);
        let month = l.LogDate.substring(5,7);
        let year = l.LogDate.substring(0,4);
        let date = day + "." + month + "." + year;
        let time = l.LogDate.substring(11,16);
        l.LogDate = date;
        l.LogTime = time;
      });
    })
    .catch(error => console.log(error));
  }

  // Get Vet Logs 
  getVetLogs(animalId: any) {
    this._koapi
    .getService("Animal/Vet/" + animalId)
    .then((result) => {
      this.vetlog = result;
      // Reformat the date
      this.vetlog.forEach(l => {
        let day = l.LogDate.substring(8,10);
        let month = l.LogDate.substring(5,7);
        let year = l.LogDate.substring(0,4);
        let date = day + "." + month + "." + year;
        l.LogDate = date;
      });
    })
    .catch(error => console.log(error));
  }

  // Get Feed Logs 
  getFeedLogs(animalId: any) {
    this._koapi
    .getService("Animal/Feed/" + animalId)
    .then((result) => {
      this.feedlog = result;
    })
    .catch(error => console.log(error));
  }

  // Get Animal Knowledge Base 
  getKnowledgeBase(animalId: any) {
    this._koapi
    .getService("Animal/Knowledge/" + animalId)
    .then((result) => {
      this.kb = result;
    })
    .catch(error => console.log(error));
  }

  // Get Animal Knowledge Base 
  getKnowledgeBaseDyk(animalId: any) {
    this._koapi
    .getService("Animal/Knowledge/DYK/" + animalId)
    .then((result) => {
      this.dyk = result;
    })
    .catch(error => console.log(error));
  }

}
