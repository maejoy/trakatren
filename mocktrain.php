#!/usr/bin/env php

<?php
function setTrainLatLong($conn, $latitude, $id) {
  $statement = $conn->prepare("
  UPDATE Trains 
  SET 
    latitude = :latitude
  WHERE id=:id
  ");

  $statement->execute(array(
    "latitude" => $latitude,
    "id" => $id
  ));
}


if( ! ini_get('date.timezone') ) {
  date_default_timezone_set('Asia/Manila');
}

try {
  $conn = new PDO("mysql:host=127.0.0.1:3306;dbname=trakatren;", 'root', 'password');
  $conn->exec("SET CHARACTER SET utf8");  
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
  $northbound = 14.5343371;
  $southbound = 14.6575566;
  print_r("MOCK TRAIN COORDINATES\n");
  for($i=0; $i<10000; $i++) {
    if ($northbound > 14.6575566) {
      print_r("End of station\n");
      $northbound = 14.5343371;
    }
    if ($southbound < 14.5343371) {
      $southbound = 14.6575566;
    }
    $northbound += 0.005;
    $southbound -= 0.005;
    sleep(1);
    print_r("NORTHBOUND: ".$northbound.",120.9915956\n");
    print_r("SOUTHBOUND: ".$southbound.",120.9915956\n\n");
    
    setTrainLatLong($conn, $southbound, 1);
    setTrainLatLong($conn, $northbound, 2);
  } 
  
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

?>
