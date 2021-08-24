<?php
error_reporting(E_ALL);
session_start();
	include "config.php";	
	$data = json_decode(file_get_contents("php://input"));
	$password=$data->password;
	$email=$data->email;
	
	
	
    $sql = "SELECT * FROM studentdata where email=? and password=?";
	$result = $conn->prepare($sql);
	$result->execute(array($email,$password));
    if($result->rowCount()>0)
	{
        while($row = $result->fetch())
		{
		     
        $data=array();
        $data[] = array("result"=>"Login Successful","name"=>$row["name"]);
        echo json_encode($data);
        }


    }
    else
    {
        $data=array();
        $data[] = array("result"=>"Unsuccessful");
        echo json_encode($data);

    }
		
?>
