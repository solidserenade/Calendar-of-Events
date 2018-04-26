<?php

$newEvent = $_REQUEST["event"];
$event = json_decode($newEvent);

include_once "php-01_link.php";
$link = new conection;
$conn = mysqli_connect($link->host, $link->login, $link->password, $link->db);

$conn->set_charset("utf8"); // устанавливаем кодировку при запросе к базе

if($event->selectedBoxEvent)
{
    $sql = "UPDATE events SET event='$event->event' WHERE eventFieldID='$event->boxID'";
}
else
{
    $sql = "INSERT INTO events (event, eventFieldID) VALUES ('$event->event', '$event->boxID')";
}

if ($conn->query($sql) === TRUE) {
    echo "Событие добавлено";
} else {
    echo "Ошибка: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>