<?php
require __DIR__ . '/http.php';
require __DIR__ . '/db.php';

$body = getBody();
$db = getDBC();
$res = getResponse();

try{

    $statement = "DELETE FROM game WHERE id = :id";
    $query = $db->prepare($statement);
    $query->execute(['id'=>$body->id]);
    $result = $query->fetchAll();
    
    $res->status = true;


}catch(\Throwable $th){
    $res->status = false;
    $res->msg = $th->getMessage();


}
send($res);