<?php

//Определить переменные и установить в пустые значения
// $nameErr = $emailErr = $phoneErr = "";
// $name = $email = $phone = "";
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
// $name = test_input($_POST["name"]);
// $email = test_input($_POST["email"]);
// $phone = test_input($_POST["website"]);
// }

// function test_input($data) {
//   $data = trim($data);
//   $data = stripslashes($data);
//   $data = htmlspecialchars($data);
//   return $data;
// }

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     if (empty($_POST["name"])) {
//       $nameErr = "* Введіть ваше iм'я";
//     } else {
//       $name = test_input($_POST["name"]);
//       if (!preg_match("/^[a-яA-Я ]*$/",$name)) {
//         $nameErr = "* Дозволено лише літери та пропуски";
//         echo $nameErr;
//       }
//     }

//     if (empty($_POST["email"])){
//       $emailErr = "* Введіть ваш email";
//     } else {
//       $email = test_input($_POST["email"]);
//       if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//         $emailErr = "* Невірний формат email";
//       }
//     }

//     if (empty($_POST["phone"])){
//       $phoneErr = "* Введіть ваш телефон";
//     } else {
//       $phone = test_input($_POST["phone"]);
//       if (!preg_match("/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/",$phone)) {
//         $phoneErr = "* Невірний формат телефону";
//       }
//     }

//     if(!$nameErr && !$emailErr && !$phoneErr) {
//       $success = "Ваше повідомлення відправлено";
//     }

//   }

// if(isset($_POST['send'])) 
if($_SERVER["REQUEST_METHOD"] == "POST")
  {
    if($_POST['name'] != "")
    {
      $_POST['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);

      if($_POST['name'] == "")
      {
        $error_name = "Ім'я введено некоректно";
      }

    }
    else
    {
      $error_name = "Введіть ваше ім'я";
    }

    if($_POST['email'] != "")
    {
      $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

      if(!filter_var($email, FILTER_VALIDATE_EMAIL))
      {
        $error_email = "$email не є коректною емейл адресою";
      }
    }
    else
    {
      $error_email = "Введіть ваш емейл";
    }

    if($_POST['phone'] != "")
    {
      $_POST['phone'] = filter_var($_POST['phone'], FILTER_SANITIZE_NUMBER_FLOAT);

      if($_POST['phone'] == "")
      {
        $error_phone = "Введть телефон без спеціальних символів";
      }

    }
    else
    {
      $error_phone = "Введіть ваше повідомлення";
    }

    if(!$error_name && !$error_email && !$error_phone) {
      $result = "Ваше повідомлення відправлено";
      echo json_encode($result);
      
      $c = true;

      $project_name = trim($_POST["project_name"]);
      $admin_email  = trim($_POST["admin_email"]);
      $form_subject = trim($_POST["form_subject"]);

      foreach ( $_POST as $key => $value ) {
        if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
          $message .= "
          " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
          </tr>
          ";
        }
      }

      $message = "<table style='width: 100%;'>$message</table>";

      function adopt($text) {
        return '=?UTF-8?B?'.Base64_encode($text).'?=';
      }

      $headers = "MIME-Version: 1.0" . PHP_EOL .
      "Content-Type: text/html; charset=utf-8" . PHP_EOL .
      'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
      'Reply-To: '.$admin_email.'' . PHP_EOL;

      mail($admin_email, adopt($form_subject), $message, $headers );

    } else {
      $result = "Введені дані некоректні";
      echo json_encode($result);
    }

    

  }

// мои примеры
  // echo $_POST['name'] . ", " . $_POST['email'] . ", " . $_POST['phone'];

  // $formSend['name'] = $_POST['name'];
  // $formSend['email'] = $_POST['email'];
  // $formSend['phone'] = $_POST['phone'];

  // echo json_encode($formSend);

  // echo $_POST['name'] . ", " . $_POST['email'] . ", " . $_POST['phone'];

?>