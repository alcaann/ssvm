<?php

require __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
$res = new stdClass();
$res->status = true;
$body = json_decode(file_get_contents('php://input'), true);
$res->requestBody = $body;
$res->logs = ["Execution started."];

try {

    $pdo = getDBConnection();
    addLog("Successfully connected.");
    addLog("Checking if email is available...");
    $stmt = $pdo->prepare("SELECT  * FROM user WHERE email = :email");
    $stmt->execute(['email' => $body['email']]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);



    if(sizeof($result) != 0){
        throw new Exception("Email already in use.");
    }else{
        $stmt = $pdo->prepare("INSERT INTO user SET name = :name, password = :password, email = :email");
        $stmt->execute([
            'name' => $body['username'], 
            'password' => password_hash($body['password'], PASSWORD_DEFAULT),
            'email' => $body['email']
        ]);

        addLog("User registered successfully.");
}





    
} catch (\Throwable $e) {
    $res->status = false;
    $res->msg = $e->getMessage();
    addLog($e->getMessage());
}

echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);



?>