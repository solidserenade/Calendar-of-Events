<?php

$newEvent = $_REQUEST["event"];
$event = json_decode($newEvent);

include_once "php-01_link.php";
$link = new conection;
$conn = mysqli_connect($link->host, $link->login, $link->password, $link->db);

$conn->set_charset("utf8"); // устанавливаем кодировку при запросе к базе

$sql = "DELETE FROM events WHERE eventFieldID='$event->boxID'";

if ($conn->query($sql) === TRUE) {
    echo "Событие добавлено";
} else {
    echo "Ошибка: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>