<div class="form">
  <div class="form-title__wrap">
    <div class="form-title">Замовити</div>
    <div class="form-title">Замовити</div>
  </div>
  <form method="post" action="send.php">
    <div class="form-group">
      <input type="text" name="name" id="name">
      <label for="name">
        <span>І</span>
        <span>м</span>
        <span>'</span>
        <span>я</span>
      </label>
      <div class="form-group__error"></div>
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
      <div class="form-group__error"></div>
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
      <div class="form-group__error"></div>
    </div>
    <div class="form-submit-btn-wrapper">
      <button class="form-submit-btn" type="submit">
        <span class="form-submit-btn__text">Відправити</span>
        <svg class="liquid-button"></svg>
      </button>
    </div>
  </form>
</div>