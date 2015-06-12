
$(document).ready (function() {
  page.init();
});



var page = {


  accountUrl: 'http://tiy-fee-rest.herokuapp.com/collections/chattycathyaccount',
  postUrl: 'http://tiy-fee-rest.herokuapp.com/collections/chattycathyposts',

  init: function() {
    page.initEvents();
    page.loadPosts();
    page.initStyles();
  },

  initStyles: function () {
  },

  initEvents: function() {
    $('.signUpWrap').on('click', "#signUpButton", page.addAccount);
    $('.signUpWrap').on('click', "#logInButton", function(event) {
      event.preventDefault();
      page.loadAccount();
    });
    $('.input-post').on('click', '#postButton', function(event){
      event.preventDefault();
      page.addPost();
    })
  },


  //////////////////////
  // AJAX & FUNCTIONS //
  //////////////////////

  addAccountToDOM: function (post) {
    page.loadAccountToPage("account", post, $('.username'));
  },

  addOnePostToDOM: function (post) {
      page.loadTmpl("posts", post, $('.outputs-IM'));
  },

  addAllPostsToDOM: function (allPosts) {
  _.each(allPosts, page.addOnePostToDOM);
  },



loadPosts: function () {

  // setInterval (function() {
    $.ajax({
      url: page.postUrl,
      method: 'GET',
      success: function (data) {
        $('.outputs-IM').html('');
        page.addAllPostsToDOM(data);
      },
      error: function (err) {

      }
    });
  // }) ;

},

  addAccount: function (event) {
    event.preventDefault();
    var newAccount = {
        username: $('input[name="user"]').val(),
        password: $('input[name="pass"]').val(),
      };
    page.createAccount(newAccount);
    $('input[name="user"]').val("");
    $('input[name="pass"]').val("")
  },

  addPost: function (event) {
  var newPost = {
    post: $('#post').val(),
    username: $('#dropdownMenu1').attr('name')
    
  };
  page.createPost(newPost);

  $('#post').val("");
  },

  createPost: function (newPost) {

  $.ajax({
    url: page.postUrl,
    method: 'POST',
    data: newPost,
    success: function (data) {
      page.addOnePostToDOM(data)
      console.log("success!!: ", data);
    },
    error: function (err) {
      console.log("error ", err);
    }
  });

},

  createAccount: function (newAccount) {

    $.ajax({
      url: page.accountUrl,
      method: 'POST',
      data: newAccount,
      success: function (data) {
        console.log("success!!: added accounts", data);
      },
      error: function (err) {
        console.log("error ", err);
      }
    });

  },

  loadAccount: function(event) {
    $.ajax({
      url: page.accountUrl,
      method: 'GET',
      success: function (data) {
        page.addAccountToDOM(data);
      },
      error: function (err) {

      }
    });
  },

  loadTmpl: function (tmplName, data, $target) {
  var compiledTmpl = _.template(page.getTmpl(tmplName));

  $target.prepend(compiledTmpl(data));
  },

  loadAccountToPage: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTmpl(tmplName));
    _.each(data, function (el){
      if ($('#userNameInput').val() === el.username && $('#passwordInput').val() === el.password){
      console.log(el);
      $target.html(compiledTmpl(el));
    }
    })
  },

  getTmpl: function (name) {
    return templates[name];
  },

}
