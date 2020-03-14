<?php

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  $_POST['name'];
  $_POST['email'];
  $_POST['phone'];
}

function clean($value = "") {
  $value = trim($value);
  $value = stripslashes($value);
  $value = strip_tags($value);
  $value = htmlspecialchars($value);
  
  return $value;
}

function check_length($value = "", $min, $max) {
  $result = (mb_strlen($value) < $min || mb_strlen($value) > $max);
  return !$result;
}

$name = clean($name);
$email = clean($email);
$phone = clean($phone);

if(!empty($name) && !empty($email) && !empty($phone)) {
  $email_validate = filter_var($email, FILTER_VALIDATE_EMAIL);
  if(check_length($name, 3, 25) && check_length($phone, 9, 35) && $email_validate) {
    echo "Дякуємо за замовлення";
} else { // добавили сообщение
  echo "Введені дані є некоректними";
}
}else { // добавили сообщение
  echo "Заповніть усі поля";
}

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