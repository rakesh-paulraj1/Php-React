<?php
$servername = "localhost";
$username = "mysqlphp";
$password = "mysqlphp";
$database = "test";


$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
