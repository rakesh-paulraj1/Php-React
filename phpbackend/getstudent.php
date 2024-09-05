<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

include 'config.php';


$sql = "SELECT id, name, email FROM users WHERE role = 'student'";
$result = $conn->query($sql);

$students = [];

if ($result->num_rows > 0) {
   
    while ($row = $result->fetch_assoc()) {
        $students[] = [
            "id" => $row['id'],
            "name" => $row['name'],
            "email" => $row['email']
        ];
    }
}


echo json_encode(["users" => $students]);

$conn->close();
?>
