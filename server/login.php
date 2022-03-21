<?php
require __DIR__ . '/db.php';
require __DIR__ . '/http.php';

$body = getBody();
$res = getResponse();
$res->requestBody = $body;

try{

$dbc = getDBC();
$sql = "SELECT * from user where email = :email";
$phd = $dbc->prepare($sql);
$phd->execute(['email' => $body->email]);
$result = $phd->fetchAll();

if($result){
    if( !password_verify($body->password, $result[0]['password'])){
        throw new Exception("invalid password");
    }
    $res->status = true;
    $now = time();
    $sql = "UPDATE user SET lastLogin = :lastLogin WHERE email = :email";
    $phd = $dbc->prepare($sql);
    $phd->execute(['email'=> $body->email, 'lastLogin'=> $now]);
    $result2 = $phd->fetchAll();
    $token = new stdClass();
    $token->lastLogin = $now;
    $token->id = $result[0]['id'];


    $value = json_encode($token, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    setcookie('session', $value, time()+60*60*24*30, "/", "", false, true);

    

}else{
    throw new Exception("no users found");
}






} catch (\Throwable $e) {
    $res->status = false;
    $res->message = $e->getMessage();
}
send($res);


/*
header('Content-Type: application/json; charset=utf-8');
$res = new stdClass();
$body = json_decode(file_get_contents('php://input'), true);
$res->status = false;
$res->logs = ["Execution started."];

try {

    $pdo = getDBConnection();

    $stmt = $pdo->prepare("SELECT * FROM user WHERE name = :username");
    $stmt->execute(['username' => $body['username']]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


    //$res->data->query = $result;

    $authenticated =  password_verify($body['password'], $result[0]['password']);

    if ($authenticated === true) {
        addLog('Successfully authenticated.');
        $res->status = true;

    } else {
        addLog( 'Invalid credentials.');
    }



    
} catch (\Throwable $e) {
    $res->status = false;
    $res->msg = $e->getMessage();
}

echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
*/
