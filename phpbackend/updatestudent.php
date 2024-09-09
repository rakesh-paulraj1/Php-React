<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$name = $data['name'];
$email = $data['email'];

if (empty($id) || empty($name) || empty($email)) {
    echo json_encode(["error" => "ID, name, and email are required."]);
    exit();
}


$stmt = $conn->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
$stmt->bind_param("ssi", $name, $email, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => "Student details updated successfully."]);
} else {
    echo json_encode(["error" => "Failed to update student details."]);
}

$stmt->close();
$conn->close();
?>
