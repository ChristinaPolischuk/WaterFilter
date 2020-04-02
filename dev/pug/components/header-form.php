<?php
// Определить переменные и установить в пустые значения
$nameErr = $emailErr = $phoneErr = "";
$name = $email = $phone = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$name = test_input($_POST["name"]);
$email = test_input($_POST["email"]);
$phone = test_input($_POST["website"]);
}

function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"])) {
      $nameErr = "* Введіть ваше iм'я";
    } else {
      $name = test_input($_POST["name"]);
      if (!preg_match("/^[a-яA-Я ]*$/",$name)) {
        $nameErr = "* Дозволено лише літери та пропуски";
      }
    }

    if (empty($_POST["email"])){
      $emailErr = "* Введіть ваш email";
    } else {
      $email = test_input($_POST["email"]);
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = "* Невірний формат email";
      }
    }

    if (empty($_POST["phone"])){
      $phoneErr = "* Введіть ваш телефон";
    } else {
      $phone = test_input($_POST["phone"]);
      if (!preg_match("/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/",$phone)) {
        $phoneErr = "* Невірний формат телефону";
      }
    }
  }
?>

<div class="form">
  <div class="form-title__wrap">
    <div class="form-title">Замовити</div>
    <div class="form-title">Замовити</div>
  </div>
  <!-- <form method="post" action="send.php"> -->
  <form method="post" action='<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>'>
    <div class="form-group">
      <input type="text" name="name" id="name">
      <label for="name">
        <span>І</span>
        <span>м</span>
        <span>'</span>
        <span>я</span>
      </label>
      <div class="form-group__error"><?php echo $nameErr;?></div>
    </div>
    <div class="form-group">
      <input type="text" name="email" id="email">
      <label for="email">
        <span>E</span>
        <span>-</span>
        <span>m</span>
        <span>a</span>
        <span>i</span>
        <span>l</span>
      </label>
      <div class="form-group__error"><?php echo $emailErr;?></div>
    </div>
    <div class="form-group">
      <input type="text" name="phone" id="phone" maxlength="18">
      <label for="phone">
        <span>T</span>
        <span>е</span>
        <span>л</span>
        <span>е</span>
        <span>ф</span>
        <span>о</span>
        <span>н</span>
      </label>
      <div class="form-group__error"><?php echo $phoneErr;?></div>
    </div>
    <div class="form-submit-btn-wrapper">
      <button class="form-submit-btn" type="submit">
        <span class="form-submit-btn__text">Відправити</span>
        <svg class="liquid-button"></svg>
      </button>
    </div>
  </form>
</div>