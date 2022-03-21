<?php
require __DIR__ . '/http.php';

$res = getResponse();
if(isset($_COOKIE['session'])){

    unset($_COOKIE['session']);
    setcookie('session', '', time()-3600, '/', '', false, true);
    $res->status= true;
}else{
    $res->status = false;
}
send($res);