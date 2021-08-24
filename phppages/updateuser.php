<?php
error_reporting(E_ALL);
session_start();


	include "config.php";
	$data = json_decode(file_get_contents("php://input"));
	$id=$data->id; // data service
    $name=$data->name;
	$email=$data->email;
	$password=$data->password;
	// Update Data Query

	$qry_res1 = $conn->prepare("UPDATE studentdata SET name=?,email=?,password=? where  del_flag=0 AND id=?");
	$qry_res1->execute(array($name,$email,$password,$id));

    
   $query = "SELECT * FROM studentdata  where del_flag=0 ORDER BY id DESC ";
	$result = $conn->prepare($query);
	$result->execute();
	
	$data=array();
	if($result->rowCount() >0)
	{
		while($row = $result->fetch())
		{
			

			$data[] = array("id"=>$row["id"],"name"=>$row["name"],"email"=>$row["email"],"password"=>$row["password"]);
		}
	}
		
		echo json_encode($data);
	
	
?>
