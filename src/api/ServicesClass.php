<?php
require __DIR__ . '/vendor/autoload.php';

class ServicesClass {

    public $spreadsheetId = '1ywNrFyi0TFd31eiZA1PErBn0QAgGfSLaEPS0NfLa3K0';
    public $range = 'A2:AB';

    public function __construct()
    {   
        //Conexión con la api
        $client = new \Google_Client();
        $client->setApplicationName('Torenos ATP');
        $client->setScopes(Google_Service_Sheets::SPREADSHEETS_READONLY);
        $client->setAuthConfig(__DIR__ .'/credentials.json');
        $client->setAccessType('offline');

        $service = new \Google_Service_Sheets($client);

        $params = [
            'dateTimeRenderOption' => 'FORMATTED_STRING',
            'majorDimension' => 'ROWS',
        ];
            
        $response = $service->spreadsheets_values->get($this->spreadsheetId, $this->range, $params);
        $this->valuesResponse = $response->getValues();;

    }



    public function get(){

        try {
            $tourneys = array();
            $listTourney = array();
            //Solo obtenemos los resultaods de los torneos del Grand Slam
            foreach ($this->valuesResponse as $row) {
                $tourney = $row[2];
                if ($tourney == 'Wimbledon' || $tourney == 'Australian Open' || $tourney == 'Roland Garros' || $tourney == 'US Open') {
                    array_push($tourneys, $tourney);
                    $listTourney[] = array(
                        'tourney_name' => $row[2],
                        'singles_winner_name' => $row[15],
                        'tourney_year' => $row[0],
                        'tourney_location' => $row[5],
                        'tourney_dates' => $row[6]
                    );
                }
            }
            //Agrupamos los datos por tourney_name
            $data = $this->groupArray($listTourney, 'tourney_name');

            $tableResult = array();

            //Obtenemos los datos del jugador con mas torneo ganado.
            for ($i=0;$i<count($data);$i++) {
                $players = $this->groupArray($data[$i]['player_name'], 'singles_winner_name');
                $repeat = 0;
                for ($j=0;$j<count($players);$j++) {
                    $tourneyGame = count($players[$j]['player_name']);
                    if ($tourneyGame >= $repeat) {
                        $repeat = $tourneyGame;
                        $player = $players[$j]['singles_winner_name'];
                        $winnerLast = end($players[$j]['player_name']);
                    }
                }
        
                $tableResult[] = array(
                    'tourney_name' => $data[$i]['tourney_name'],
                    'player_name' => $player,
                    'repeat_winner' => $repeat,
                    'winnerLast' => $winnerLast['tourney_year'],
                    'tourney_location' => $winnerLast['tourney_location'],
                    'tourney_dates' => $winnerLast['tourney_dates']
                );
            }
            
            echo json_encode(array(
                'status' => true,
                'data' => $tableResult
            ));

        } catch(Exception $e) {

            echo json_encode(array(
                'status' => false,
                'message' => $e->getMessage()
            ));
        }
    
    }


    //Agrupación de un array por su key.
    public function groupArray($array,$groupkey)
    {
        if (count($array)>0)
        {
            $keys = array_keys($array[0]);
            $removekey = array_search( $groupkey, $keys ); if ( $removekey===false )
                return array("Clave \"$groupkey\" no existe");
            else
                unset($keys[$removekey]);

            $groupcriteria = array();
            $return = array();
            foreach($array as $value)
            {
                $item = null;
                foreach ($keys as $key)
                {
                    $item[$key] = $value[$key];
                }
                $search = array_search( $value[$groupkey], $groupcriteria );
                if ($search === false)
                {
                    $groupcriteria[] = $value[$groupkey];
                    $return[] = array( $groupkey => $value[$groupkey], 'player_name' => array() );
                    $search = count($return)-1;
                }
                $return[$search]['player_name'][] = $item;
            }
            
            sort($return);
            return $return;
        }
        else
            return array();
    }

}