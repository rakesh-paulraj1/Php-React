<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];
$name = $data['name'];


if (empty($email) || empty($password) || empty($name)) {
    echo json_encode(["error" => "All fields are required."]);
    exit();
}
$password_hash = password_hash($password, PASSWORD_DEFAULT);


$stmt = $conn->prepare("INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, 'student')");
$stmt->bind_param("sss", $email, $password_hash, $name);


if ($stmt->execute()) {
    echo json_encode(["success" => "Student created successfully."]);
} else {
    echo json_encode(["error" => "Failed to create student. Email may already be in use."]);
}

$stmt->close();
$conn->close();
?>
