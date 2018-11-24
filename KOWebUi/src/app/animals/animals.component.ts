import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { KoapiService } from '../koapi.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  constructor(private _koapi: KoapiService, private router: Router) { }

  animalsFur: any;
  animalsFeather: any;
  animalsScales: any;
  animalsOther: any;
  name: any;
  age: any;
  temperament: any;
  species: any;
  speciesId: any;
  subSpecies: any;
  subspeciesId: any;
  enclosures: any;
  enclosureId: any;
  classification: any;
  classFur = "Fur";
  classFeather = "Feather";
  classScale = "Scale";
  classOther = "Other";

  ngOnInit() {
    this.getAnimals("fur");
    this.getAnimals("feather");
    this.getAnimals("scale");
    this.getAnimals("other");
    this.getSpecies();
    this.getEnclosures();
  }

  // Round up the animals
  getAnimals(classification: string) {
    this._koapi
    .getService("animals/" + classification)
    .then((result) => {
      // Add the animals's avatar image and add brackets to the nickname
      result.forEach(animal => {
        animal.avatar = "assets/animals/list-thumb/" + animal.Name.toLowerCase() + ".png";
        if (animal.Nickname != "") {
          animal.Nickname = "(" + animal.Nickname + ")";
        }
      });
      // Herd animals to their correct tables
      switch (classification) {
        case "fur":
          this.animalsFur = result;
          break;
        case "feather":
          this.animalsFeather = result;
          break;
        case "scale":
          this.animalsScales = result;
          break;
        case "other":
          this.animalsOther = result;
          break;
        default:
          break;
      }
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }

  // Get a species list
  getSpecies() {
    this._koapi
    .getService("species")
    .then((result) => {
      this.species = result;
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }

  // Get the species value and the sub species list
  speciesSelect(value) {
    this.speciesId = value.value;
    this._koapi
    .getService("subspecies/" + this.speciesId)
    .then((result) => {
      this.subSpecies = result;
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }

  // Set the sub-species
  subSpeciesSelect(value) {
    this.subspeciesId = value.value;
  }

  // Get an enclosure list
  getEnclosures() {
    this._koapi
    .getService("enclosures")
    .then((result) => {
      this.enclosures = result;
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }

  // Set the enclosure id
  enclosureSelect(value) {
    this.enclosureId = value.value;
  }

  // Set the classification
  classSelect(value) {
    this.classification = value.value;
  }

  // Add a new animal
  AddNewAnimal() {
    class NewAnimal {
      Name: any;
      Class: any;
      Species: any;
      SubSpecies: any;
      Age: any;
      Enclosure: any;
      Temperament: any;
      Id: any;
    }
    let animalToSend = new NewAnimal();
    animalToSend.Name = this.name;
    animalToSend.Class = this.classification;
    animalToSend.Species = this.speciesId;
    animalToSend.SubSpecies = this.subspeciesId;
    animalToSend.Age = this.age;
    animalToSend.Enclosure = this.enclosureId;
    animalToSend.Temperament = this.temperament;
    this._koapi
    .postService("animal/add", animalToSend)
    .then((result) => {
      // Close Modal
      document.getElementById("closeModalButton").click();
    })
    .catch(error => console.log(error));
  }

  // Redirect to Animal Detail
  animalDetail(animalid) {
    this.router.navigate(['/animal', animalid])
  }
}
