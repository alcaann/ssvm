<?php
    require __DIR__ . '/http.php';
    require __DIR__ . '/db.php';
    $body = getBody();
    $res = getResponse();
    
    $db = getDBC();
    try{
        $statement = "INSERT INTO game (title, genre, description, coverImage, upvotes, downvotes) values (:title, :genre, :description, :coverImage, 0, 0); ";
        $sth = $db->prepare($statement);
        unset($body->id);
        if(!property_exists($body, 'coverImage')){
            $body->coverImage = '/assets/img/webDeveloperSimulator.png';
        }

        $sth->execute((array)$body);
        $result = $sth->fetchAll();
        $res->result = $result;
        $res->status = true;
    }catch(\Throwable $th){
        $res->status = false;
        $res->msg = $th->getMessage();
    }
    
    
    $res->requestBody = $body;

    send($res);
