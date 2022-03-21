<?php
    function getBody(){
        return json_decode(file_get_contents('php://input'), false);
    }

    function getResponse(){
        $res = new stdClass();
        $res->status = false;
        $res->msg = "Default Message.";
        $res->logs[] = "Execution started.";
        return $res;
    }

    function send($res){
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: http://192.168.100.61:4200');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type');
        echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
