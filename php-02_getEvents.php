<?php
include_once "php-01_link.php";
$link = new conection;
$conn = mysqli_connect($link->host, $link->login, $link->password, $link->db);

$conn->set_charset("utf8"); // устанавливаем кодировку при запросе к базе

$result = mysqli_query($conn, "SELECT * FROM events");

$data = array();

while($row = mysqli_fetch_assoc($result))
{
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>


