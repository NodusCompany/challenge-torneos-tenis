import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GrandSlamService } from '../grand-slam.service';

@Component({
  selector: 'app-grand-slam-viewer',
  templateUrl: './grand-slam-viewer.component.html',
  styleUrls: ['./grand-slam-viewer.component.css']
})
export class GrandSlamViewerComponent implements OnInit {
	jsonData: any = [];

  	grandSlams: any = [];

	selectedGrandSlam: any = {};

  	DistincGrandSlams: any = [];
    
	@ViewChild("modalContent")
	modalContentRef: TemplateRef<any>;

  constructor(private grandSlamService: GrandSlamService, private modalService: NgbModal) { 

  }

  private filterData(){
    this.jsonData.forEach(grandSlam => {
      if (!this.DistincGrandSlams.includes(grandSlam[2])){
        this.DistincGrandSlams.push(grandSlam[2]);
      }
    });
  }

  public abrir_modal(grandSlam){
	this.selectedGrandSlam = grandSlam;
	console.log(this.selectedGrandSlam);
	this.modalService.open(this.modalContentRef);
  }

  public cerrar_modal(){
    this.modalService.dismissAll();
  };


  private findMaxMaleWiner(){
    this.DistincGrandSlams.forEach(DistintcTourment => {
		var max_wins = 0;
		var lastYearWin = 0;
		var champ_laste_year_win = 0;
		var max_name_wins = '';
		var posiblesGanadores = [];
      	var tourmentData = this.jsonData.filter(function(item){return item[2] == DistintcTourment});
     	tourmentData.forEach(torneo => {
			  var player_name = torneo[15];
			  //alert(player_name);
       		if (!posiblesGanadores.includes(player_name)){
				var champsPlayerArray = this.jsonData.filter(function(item2){return item2[15] == player_name && item2[2] == DistintcTourment});
       			var cants_wins = 0;
        		champsPlayerArray.forEach(torneoGanado => {
					var año_torneo = torneoGanado[0];
					if(año_torneo > lastYearWin){
						lastYearWin = año_torneo;
					}
       				 cants_wins = cants_wins + 1;
       			});
				if(cants_wins > max_wins){
					max_wins = cants_wins;
					max_name_wins = player_name;
					champ_laste_year_win = lastYearWin;
				}
				posiblesGanadores.push(player_name);	
        	}
      	});
		//alert(posiblesGanadores);
    	//alert('Torneo:'+DistintcTourment+', Mayor ganador:'+max_name_wins+', con '+max_wins + 'victorias.');
		var tourment = [DistintcTourment,max_name_wins, champ_laste_year_win, max_wins];
        this.grandSlams.push(tourment);
    });
  }

  ngOnInit(): void {
    this.grandSlamService.getPrueba().subscribe((result)=>{ 
      this.jsonData = result;
      this.filterData();
      this.findMaxMaleWiner();
    });
  }

}
