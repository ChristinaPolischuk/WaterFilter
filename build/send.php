<?php

$email = $_POST['email'];
$name = $_POST['name'];
$surname = $_POST['surname'];

$to = "senyqy@gmail.com";
$subject = "От посетителя сайта";
$text =  "Написал(а): $name\n Контактный email - $email\n\n Фамилия: $surname\n";

$header.= "Content-type: text/html; charset=utf-8\r\n";
$header .= "MIME-Version: 1.0\r\n";
$sending = mail($to, $subject, $text, $headers);

if($sending) echo "Письмо отправлено. Ответа не ждите :)";