<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';


$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

if (empty($email) || empty($password)) {
    echo json_encode(["error" => "Email and password are required."]);
    exit();
}


$stmt = $conn->prepare("SELECT id, password_hash, name FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $password_hash,$name);
$stmt->fetch();

if ($stmt->num_rows == 0 || !password_verify($password, $password_hash)) {
    echo json_encode(["error" => "Invalid email or password."]);
    $stmt->close();
    $conn->close();
    exit();
}

$stmt->close();
echo json_encode([ "name" => $name,
    "id" => $id,"success" => "Login successful."]);
$conn->close();
?>
