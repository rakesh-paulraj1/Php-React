<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['id'];

if (empty($user_id)) {
    echo json_encode(["error" => "User ID is required."]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => "User deleted successfully."]);
    } else {
        echo json_encode(["error" => "User not found."]);
    }
} else {
    echo json_encode(["error" => "Failed to delete the user. Please try again."]);
}

$stmt->close();
$conn->close();
?>
