$(function(){
  function buildHTML(user){
    var html = `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">
                   ${user.name}
                   </p>
                   <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
                return html;
  }

$("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

  .done(function(users){
    $('#user-search-result').empty();
    if (users.length != 0) {
      users.forEach(function(user){
        buildHTML(user);
        var html = buildHTML(user);
        $('#user-search-result').append(html)
      });
    };
  })
  .fail(function(){
    alert('ユーザー検索に失敗しました');
  });
  });
});

  $(function(){
    function appendUser(user_id, user_name){
      var html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value=${user_id}>
                <p class='chat-group-user__name'>${user_name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
                return html;
  }

$("#user-search-result").on("click",".chat-group-user__btn--add" ,function(){
  var user_id = $(this).data('user-id');
  var user_name = $(this).data('user-name');
  var html = appendUser(user_id, user_name);
  $('#add-user-list').append(html)
  $(this).parent().remove();
})
})

$(function(){
  $(".chat-group-user").on("click",".user-search-remove" ,function(){
    $(this).parent().remove();
  })
})