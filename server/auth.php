<?php
require __DIR__ . '/db.php';
require __DIR__ . '/http.php';

$body = getBody();
$res  = getResponse();
$db = getDBC();



try {
    if(!isset($_COOKIE['session'])){
        throw new Exception("missing cookie");
    }else{
    $cookie = stripslashes($_COOKIE['session']);
    $cookie = json_decode($cookie);
    $sql = "SELECT * FROM user WHERE id = :id";
    $prepared = $db->prepare($sql);
    $prepared->execute(['id'=> $cookie->id]);
    $result = $prepared->fetchAll();

    if($result && $result[0]){
        if($result[0]['lastLogin'] == $cookie->lastLogin){
            $res->status = true;
            
        }else{
            $res->cookie = $cookie;
            $res->result = $result;
            unset($_COOKIE['session']);
            throw new Exception("expired state");
        }
    }
    }

} catch (\Throwable $e) {
    $res->status = false;
    $res->msg = $e->getMessage();
}
send($res);