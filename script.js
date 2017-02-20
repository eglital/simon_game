$(document).ready(function(){

  var audioUrl = "https://s3.amazonaws.com/freecodecamp/simonSound";
  var game = {
    on: false,
    active: false,
    count: 0,
    strict: false,
    randomSeq: [],
    hitSeq: [],
    playerTurn: false,
    colors: ["green", "red", "yellow", "blue"],
  };

  //click ON/OFF button
  $(".slider").on("click", function(){
    if (game.on){
      game.on = false;
      game.count = 0;
      game.active = false;
      game.strict = false;
      game.randomSeq = [];
      game.hitSeq = [];
      game.playerTurn = false;
      $("#strict").removeClass("special");
      $("#start").css("background-color", "#c00");
      $("#counter").text("");
    } else {
      game.on = true;
      $("#counter").text("--");
    }
  });

  //click START button
  $("#start").on("click", function(){
    if (game.on && !game.active) {
      game.active = true;
      $(this).css("background-color", "green");
      generateNext();
      play();
    }
  });

  //click STRICT button
  $("#strict").on("click", function(){
    if (game.on && !game.strict){
      game.strict = true;
      $(this).toggleClass("special");
    } else if (game.on && game.strict){
      game.strict = false;
      $(this).toggleClass("special");
    }
  });

  //function to play sound
  function playSound(num) {
    var audio = new Audio (audioUrl + num + ".mp3");
    audio.play();
  }

  //function for the computer to play the sequence
  function play() {
    if (!game.playerTurn){
     var speed = 1250;
      if (game.randomSeq.length >= 5){
        speed -= 250;
      } if (game.randomSeq.length >= 9) {
        speed -= 250;
      } if (game.randomSeq.length >= 13){
        speed -= 250;
      }
      $.each(game.randomSeq, function(index, pad){
        setTimeout(function(){
        push(pad);
        }, index * speed);
      });
    }
    game.playerTurn = true;
  }

  //function to generate next random member of sequence
  function generateNext() {
    var rand = Math.floor(Math.random() * 4);
    game.randomSeq.push(rand);
    game.count++;
    $("#counter").text(game.count);
  }

  //function to animate pushing the pad
  function push(num) {
    $("#" + game.colors[num]).addClass("lit");
    playSound(num + 1);
    setTimeout(function(){
      $("#" + game.colors[num]).removeClass("lit");
    }, 300);
  }

  //player click events
  $("#green").on("click", function(){
   push(0);
    if (game.playerTurn){
      game.hitSeq.push(0);
      check();
    }
  });
  $("#red").on("click", function(){
    push(1);
    if (game.playerTurn) {
      game.hitSeq.push(1);
      check();
    }
  });
  $("#yellow").on("click", function(){
    push(2);
   if (game.playerTurn){
      game.hitSeq.push(2);
     check();
   }
  });
  $("#blue").on("click", function(){
    push(3);
    if (game.playerTurn){
      game.hitSeq.push(3);
      check();
    }
  });

  //function check
  function check(){
    if (game.hitSeq[game.hitSeq.length-1] !== game.randomSeq[game.hitSeq.length-1]){
      game.playerTurn = false;
      wrong();
    } else if (game.hitSeq.length === game.randomSeq.length){
      game.playerTurn = false;
      game.hitSeq = [];
      if (game.count < 20) {
        $("#counter").text("++");
        setTimeout(function(){
          generateNext();
          play();
        }, 1000);
      } else {
        $(".modal").css("display", "block");
      }
    }
  }

  //close madal
  $(".close").on("click", function(){
    $(".modal").css("display", "none");
    game.count = 0;
    game.hitSeq = [];
    game.randomSeq = [];
    game.playerTurn = false;
    $("#counter").text("1");
    generateNext();
    play();
  });

//function if player gets it wrong
  function wrong() {
    if (game.strict) {
      game.count = 0;
      $("#counter").text("1");
      game.randomSeq = [];
      game.hitSeq = [];
      $("#counter").text("!!");
      setTimeout(function(){
        generateNext();
      }, 700);
      setTimeout(function(){
        play();
      }, 1000);
    } else {
      game.hitSeq = [];
      $("#counter").text("!!");
      setTimeout(function(){
        $("#counter").text(game.count);
      }, 1000);
      setTimeout(function(){
        play();
      }, 1500);
    }
  }
});