<?php
require __DIR__ . '/http.php';
require __DIR__ . '/db.php';

$body = getBody();
$db = getDBC();
$res = getResponse();

try{

    $statement = "SELECT * FROM game";

    if($body->str){
       // $stament = "AND (title LIKE '%:str%' OR description LIKE '%:str%' OR genre LIKE '%:str%')";

    }
    $adhd;
    if($body->genre && $body->genre != ''){
        $statement = $statement . " WHERE genre = :genre";
        $adhd = $db->prepare($statement);
        $adhd->execute(['genre'=> $body->genre]);
        
    }else{
        $adhd = $db->prepare($statement);
        $adhd->execute();
    }
    $result = $adhd->fetchAll();
    $res->status =true;
    $res->data = $result;
    $res->msg = "returned ". count($result) . "games";



}catch(\Throwable $th){
    $res->status = false;
    $res->msg = $th->getMessage();


}
send($res);