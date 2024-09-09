<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';


$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];
$name = $data['name']; 


if (empty($email) || empty($password) || empty($name)) {
    echo json_encode(["error" => "Email, name, and password are required."]);
    exit();
}

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["error" => "Email is already in use."]);
    $stmt->close();
    $conn->close();
    exit();
}


$password_hash = password_hash($password, PASSWORD_DEFAULT);


$stmt = $conn->prepare("INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, 'admin')");
$stmt->bind_param("sss", $email, $password_hash, $name);

if ($stmt->execute()) {
    $newUserId = $stmt->insert_id;
    $token = bin2hex(random_bytes(16)); 

    echo json_encode([
        "token" => $token,
        "user" => [
            "id" => $newUserId,
            "name" => $name,
            "role" => "admin"
        ],
        "success" => "Signup successful."
    ]);
} else {
    echo json_encode(["error" => "Failed to create the user. Please try again."]);
}

$stmt->close();
$conn->close();
?>
