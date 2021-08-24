<?php
error_reporting(E_ALL);
session_start();

	include "config.php";

	$id=$_GET["id"]; 
	
	$qry_res1 = $conn->prepare("UPDATE studentdata SET del_flag=1 where id=?");	
	$qry_res1->execute(array($id));

   
   $query = "SELECT * FROM studentdata where del_flag=0 ORDER BY id DESC ";
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
