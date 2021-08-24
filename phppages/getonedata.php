<?php
include_once("config.php");
 
$postdata = file_get_contents("php://input");
$id=$_GET["id"];
 
$sql="SELECT id,name,email,password FROM studentdata where id=?";
 
$result = $conn->prepare($sql);
	$result->execute(array($id));
	
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

