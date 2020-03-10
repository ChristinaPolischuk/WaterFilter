<?php

$email = $_POST['email'];
$name = $_POST['name'];
$phone = $_POST['phone'];

$to = "senyqy@gmail.com";
$subject = "Пан Фільтрон - Від користувача сайту";
// $text =  "Написал(а): $name\n Контактный email - $email\n Фамилия: $surname\n";
$text =  "Написал(а): $name\n Контактный email - $email\n Телефон: $phone\n";

$header.= "Content-type: text/html; charset=utf-8\r\n";
$header .= "MIME-Version: 1.0\r\n";
$sending = mail($to, $subject, $text, $headers);

if($sending) echo "Письмо отправлено. Ответа не ждите :)";