
$(function() {

  function buildHTML(message) {
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >`: "";
  
    var html = `<div class="message" data-message-id="${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.date}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>
        ${image}
      </div>
    </div>`
      return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
      var formData = new FormData(this);
      console.log(formData);
      var url = $(this).attr('action');
      $.ajax({
        type: 'POST',
        url: 'url',
        processData: false,
        contentType: false,
        data: formData
      })
      .done(function(data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#new_message')[0].reset();
        $('.form__submit').prop('disabled', false);
      })
      .fail(function() {
        alert('非同期通信失敗');
      });
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
      insertHTML = buildHTML(message);
      $('.messages').append(insertHTML);
      })
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
     .fail(function() {
       alert('自動更新に失敗しました');
     });
    }
};
    //  setInterval(reloadMessages, 5000);
});