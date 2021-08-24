<?php
date_default_timezone_set('Asia/Calcutta');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$host ="localhost";
	$db_name = "student";
	$db_username = "root";
    $db_password = "";

	$conn = new PDO("mysql:dbname=$db_name;host=$host;charset=utf8", "$db_username", "$db_password");	
	$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);	
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
?>
