import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public options: any;

  constructor(private data: DataService, public alertCtrl: AlertController) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.data.getData().subscribe(data => {
      this.options = data;
    });
  }

  deleteChip(data) {
    this.data.deleteItem(data.id).subscribe(() => {
      this.getData();
   });
  }

  async presentAlert(type) {
    if (type === 'new') {
    const alert = await this.alertCtrl.create({
      header: 'Create Chip',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Enter chip name',
          handler: () => {}
        }],
      buttons: [{text: 'Cancel',
                 role: 'cancel',
                },
                {text: 'OK',
                 handler: (data) => {
                  const input = data.name1;
                  if (input.length > 0) { this.addChip(input); } else { return false; }
                }

                }],
    });
    await alert.present();
  } else {
    const alert = await this.alertCtrl.create({
      header: 'Edit Chip',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Enter chip name',
          handler: () => {}
        }],
      buttons: [{text: 'Cancel',
                 role: 'cancel',
                },
                {text: 'OK',
                 handler: (data) => {
                  const input = data.name1;
                  if (input.length > 0) { this.addChip(input); } else { return false; }
                }

                }],
    });
    await alert.present();

  }
  }

  addChip(input) {
    const idarray = [];
    let newid = null;
    this.options.forEach(obj => {
      idarray.push(obj.id);
    });
    newid = Math.max(...idarray) + 1;
    const chip = {
      id: newid,
      name: input
    };

    this.data.addItem(chip).subscribe(() => {
      this.getData();
   });
  }

}
