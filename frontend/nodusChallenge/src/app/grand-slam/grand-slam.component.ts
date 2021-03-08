import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-grand-slam]',
  templateUrl: './grand-slam.component.html',
  styleUrls: ['./grand-slam.component.css']
})
export class GrandSlamComponent implements OnInit {
  @Input()
  grandSlam: any;

  @Output()
  showInfoEvent: EventEmitter <any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public anio_ultimo_triunfo(){
    this.showInfoEvent.emit(this.grandSlam);
    //alert('Torneo: '+this.grandSlam[0]+'Ganador: '+this.grandSlam[1]+', ultima vez ganado: '+this.grandSlam[2]+', Cant. Veces Ganado: '+this.grandSlam[3]);
  }
}
