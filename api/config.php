<?php
declare(strict_types=1);
function createDataBaseConnection (): mysqli
{
    $connection=new mysqli('127.0.0.1','root','','arduino_ia');
if($connection->connect_errno){
 http_response_code(500);
 echo json_encode([
    'ok'=> false,
    'message'=>'No se pudo conectar a la BD'
 ]);
 exit;
}
$connection->set_charset('utf8mb4');
return $connection;
}
