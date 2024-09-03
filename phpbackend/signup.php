<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

// Validate inputs
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(["error" => "All fields are required."]);
    exit();
}

// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["error" => "Email is already registered."]);
    $stmt->close();
    $conn->close();
    exit();
}

$stmt->close();


$password_hash = password_hash($password, PASSWORD_BCRYPT);


$stmt = $conn->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $password_hash);
if ($stmt->execute()) {
    echo json_encode(["name" => $name,
    "id" => $id,"success" => "User registered successfully."]);
} else {
    echo json_encode(["error" => "Error: " . $stmt->error]);
}
$stmt->close();
$conn->close();
?>
