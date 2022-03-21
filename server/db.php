<?php

function getDBC(){
    $dbconfig = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ];
    return new PDO('mysql:host=localhost;dbname=skillsDB;port=3306;charset=utf8mb4', 'alcan', 'Acho', $dbconfig);

}


?>