$(document).ready(function () {

  function checkUserInfo() {
    const user = getUserInfo();
    if(user && user.name && user.address) {
      return
    }else{
      window.location.href = "index.html";
    }
  }

  checkUserInfo();

  function HTMLtoPDF(){
    html2canvas($('#HTMLtoPDF')[0], {windowWidth: 860}).then(function(canvas) {
      let image = canvas.toDataURL('image/png');
      let doc = new jsPDF('p','mm');
      doc.addImage(image,'PNG', 0, 10);
      doc.save('certificate.pdf');
    });
  }

  function sendEmail() {
    console.log(window)
    window.open(`mailto:klyuchko92@gmail.com?subject=Certificate form ${user.name}&body=Employee Name: ${user.name};    Employee Address: ${user.address}`);
  }

  function populate() {
      if(quiz.isEnded()) {
          showCertificate();
      }
      else {
          // show question
          var element = document.getElementById("question");
          element.innerHTML = quiz.getQuestionIndex().text;

          // show options
          var choices = quiz.getQuestionIndex().choices;
          for(var i = 0; i < choices.length; i++) {
              var element = document.getElementById("choice" + i);
              element.innerHTML = choices[i];
              guess("btn" + i, choices[i]);
          }

          showProgress();
      }
  };

  function guess(id, guess) {
      var button = document.getElementById(id);
      button.classList.add("white");
      button.onclick = function() {
          // quiz.guess(guess);
          if(quiz.guess(guess)){
              console.log('correct');
              populate();
          }else{
              let index = quiz.getAnswerIndex();
              console.log(index);
              let answer = document.getElementById('btn'+index);
              answer.classList.remove("white");
              answer.classList.add("green");

              button.classList.remove("green");
              button.classList.remove("white");
              button.classList.add("red");
              console.log('wrong');
          }
      }
  };


  function showProgress() {
      var currentQuestionNumber = quiz.questionIndex + 1;
      var element = document.getElementById("progress");
      element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };

  function getUserInfo() {
    let user = new Object;
    if (window.location.search.split('?').length > 1) {
      var params = window.location.search.split('?')[1].split('&');
      for (var i = 0; i < params.length; i++) {
        var key = params[i].split('=')[0];
        var value = decodeURIComponent(params[i].split('=')[1]);
        user[key] = value;
      }
      return user;
    }else{
      return undefined;
    }
  }

  function showCertificate() {
    const user = getUserInfo();
      if ( user && user.name && user.address) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var today  = new Date();
        var gameOverHTML = `<center id='HTMLtoPDF'>
        <div style="width:770px; padding:20px; text-align:center; border: 10px solid #787878">
          <div style="width:710px; padding:20px; text-align:center; border: 5px solid #787878">
            <img src="../images/strativia-logo.png" alt="Strativia logo" >
            <span style="font-size:50px; font-weight:bold">Certificate of Completion</span>
            <br><br>
            <span style="font-size:25px"><i>This is to certify that</i></span>
            <br><br>
            <span style="font-size:30px"><b>${user.name}</b></span><br/><br/>
            <span style="font-size:25px"><i>has completed the course</i></span> <br/><br/>
            <span style="font-size:30px">Job Discrimination at Work Place</span> <br/><br/>
            <span style="font-size:25px"><i>Completed Date</i></span><br>
            <span style="font-size:25px"><i>${today.toLocaleDateString("en-US", options)}</i></span><br>
          </div>
        </div>
        </center>`;
        gameOverHTML += "<div class='row' style='margin-top: 50px'>";
        // gameOverHTML += "<a id='score'> Your scores: " + quiz.score + "</a>";
        gameOverHTML += "<div class='col s6 center'><a class='btn' onclick='HTMLtoPDF()'> Download Certificate </a> </div>";
        gameOverHTML += "<div class='col s6 center'><a class='btn' onclick='sendEmail()'> Let Us Know </a></div></div>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
      }
  };

  // create questions
  var questions = [
      new Question("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatios aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", ["Discrimination", "Important laws ","Important  ", "Laws "], "Important laws "),
      new Question("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", ["How to prevent discrimination ", "Sexual Harassment ", "Contact EEOC", "Pregnancy"], "Pregnancy"),
      new Question("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", ["Harassment1", "Race/Color","Discrimination", "How to prevent discrimination "], "Race/Color"),
      new Question("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", ["Equal Pay / Compensation", "Python", "Discrimination", "All"], "All"),
      new Question("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", ["How to prevent discrimination ", "Library", "Discrimination", "All"], "Library")
  ];

  // create quiz
  var quiz = new Quiz(questions);

  // display quiz
  populate();

});



