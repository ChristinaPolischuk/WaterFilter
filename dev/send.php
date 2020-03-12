<?php

// $email = $_POST['email'];
// $name = $_POST['name'];
// $surname = $_POST['surname'];

// $to = "senyqy@gmail.com";
// $subject = "От посетителя сайта";
// $text =  "Написал(а): $name\n Контактный email - $email\n\n Фамилия: $surname\n";

// $header.= "Content-type: text/html; charset=utf-8\r\n";
// $header .= "MIME-Version: 1.0\r\n";
// $sending = mail($to, $subject, $text, $headers);

// if($sending) echo "Письмо отправлено. Ответа не ждите :)";

$recepient = "senyqy@gmail.com";
$siteName = "Пан Фільтрон";

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$message = "Ім'я: $name \nE-mail: $email \nТелефон: $phone"

$pageTitle = "Замовлення з сайту \"$siteName\"";

mail($recepient, $pageTitle, $message, "Content-type: text/plain; charset=\"utf-8\" from $recepient");