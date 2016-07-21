$(function() {
  var $form = $('#myForm');

  $('#user-phone').mask('+7(999) 999-9999');

  $form.validate({
    rules: {
      phone: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
      }
    },
    messages: {
      phone: {
        required: 'Введите телефон',
        regex: /\+7\(\d{3}\) \d{3}-\d{4}/,
      },
      email: {
        required: 'Введите e-mail',
        email: 'Введите корректный e-mail',
      }
    },
    errorClass: 'has-error',
    highlight: function(element, errorClass, _) {
      $(element).closest('.need-valid').addClass(errorClass);
    },
    unhighlight: function(element, errorClass, _) {
      $(element).closest('.need-valid').removeClass(errorClass);
    },
  });

  $form.submit(function(e) {
    e.preventDefault();

    if ($(this).valid()) {
      sendMail();
    }
  });

  function sendMail() {
    $.ajax({
      url: 'https://formspree.io/pst_spb2016@mail.ru',
      method: 'POST',
      data: {
        _subject: 'Заявка с сайта "ПСТ"',
        name: $('#user-name').val(),
        phone: $('#user-phone').val(),
        email: $('#user-email').val(),
        text: $('#user-text').val(),
      },
      dataType: 'json',
      success: function() {
        location.href = '/thanks.html';
      }
    });
  }
});
