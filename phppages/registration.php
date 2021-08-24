<?php
error_reporting(E_ALL);
session_start();
	include "config.php";	
	$data = json_decode(file_get_contents("php://input"));
	$name=$data->name;
	$email=$data->email;
	$password=$data->password;
$res1 = $conn->prepare("INSERT INTO studentdata(name,email,password) VALUES (?,?,?)");	
$res1->execute(array($name,$email,$password));
	/*if($res1)
  {
		?> 
		<script>
			alert("data inserted successfully!!!");
		</script>
		<?php 
	}else{
	?>
	<script>
			alert("data not inserted successfully!!!");
		</script>
<?php
}
*/
		//echo json_encode($data);
?>