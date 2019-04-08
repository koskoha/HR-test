
  function checkUserInfo() {
    const user = getUserInfo();
    if(user && user.name && user.address && user.email) {
      return
    }else{
      window.location.href = "index.html";
    }
  }

  checkUserInfo();

  function sendEmail() {
    const { name, address } = getUserInfo();
    window.open(`mailto:mklyuchko@strativia.com?subject=Certificate form ${name}&body=Employee Name: ${name};    Employee Address: ${address}`);
  }

  function sendEmail() {
    const { name, address, email } = getUserInfo();
    try{
      $.ajax({
        type: "POST",
        url: "https://script.google.com/macros/s/AKfycbzKDBe0BIrqXuQq3shfxGv4Y2k7QiqQ2sWVNeMCIzwIbQz8NeY/exec",
        data: "name=" + name + "&address=" + address+ "&email=" + email,
        success: function(resp) {
          console.log(resp);
          if (resp.result == "success") {
            M.toast({html: 'We successfully receive your certificate. Thank you.', classes: 'rounded toast-success'})
          } else {
            var toastHTML = '<span>We experiencing technical issues at this time. Please let us know about this issue. Sorry for any inconvenience.</span><button onclick="sendEmail()" class="btn-flat toast-action">Please Let Us Know</button>';
            M.toast({html: toastHTML, classes: 'rounded red darken-1', displayLength: 10000})
              console.log(resp.data.message);
          }
        }
      });
    }catch(e){
      var toastHTML = '<span>We experiencing technical issues at this time. Please let us know about this issue. Sorry for any inconvenience.</span><button onclick="sendEmail()" class="btn-flat toast-action">Please Let Us Know</button>';
      M.toast({html: toastHTML, classes: 'rounded red darken-1', displayLength: 10000})
      console.log(resp.data.message);
    }
  }

  function renderChoices(choices){
    let btns = document.getElementById('btn-choices');
    btns.innerHTML="";
    let block = ''
    choices.forEach((el, i) => {
      block += `<div class=" buttons col s12 "><button class="btn white black-text col s12" id="btn${i}"><span id="choice${i}"></span></button></div>`
    });
    btns.innerHTML = block;
  }

  function populate() {
      if(quiz.isEnded()) {
          showCertificate();
          sendEmail();
      }
      else {
          // show question
          var element = document.getElementById("question");
          element.innerHTML = `<b style="font-size: 25px">${quiz.getQuestionIndex().text}</b>`;

          // show options
          var choices = quiz.getQuestionIndex().choices;
          renderChoices(choices);
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
              populate();
          }else{
              let index = quiz.getAnswerIndex();
              let answer = document.getElementById('btn'+index);
              answer.classList.remove("white");
              answer.classList.add("green");

              button.classList.remove("green");
              button.classList.remove("white");
              button.classList.add("red");
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
        var gameOverHTML = `<center id='HTMLtoPDF' class="certificate">
        <div class="row certificate center-align">
          <div class="col s12" style=" padding:20px; text-align:center; border: 10px solid #787878">
            <div class="col s12" style=" padding:20px; text-align:center; border: 5px solid #787878">
              <div>
                <img class="cert-img" src="./images/strativia-logo.png" alt="Strativia logo" >
              </div>
              <span class="cert-title" >Certificate of Completion</span>
              <br><br>
              <span "cert-info"><i>This is to certify that</i></span>
              <br><br>
              <span class="cert-pre-title"><b>${user.name}</b></span><br/><br/>
              <span class="cert-info"><i>has completed the course</i></span> <br/><br/>
              <span class="cert-pre-title">Job Discrimination at Work Place</span> <br/><br/>
              <span class="cert-info"><i>Completed Date</i></span><br>
              <span class="cert-info"><i>${today.toLocaleDateString("en-US", options)}</i></span><br>
            </div>
          </div>
        </div>
        </center>`;
        gameOverHTML += "<div class='row' style='margin-top: 50px'>";
        gameOverHTML += "</div>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
      }
  };

  // create questions
  var questions = [
      new Question("Sexual harassment is behavior of a sexual nature that is", ["Unwanted and unwelcome to the recipient", "Innocent to all but the most sensitive","Public and clearly offensive to most witnesses"], "Unwanted and unwelcome to the recipient"),

      new Question('"Quid pro Quo" sexual harassment means that', ["The work environment is offensive", "Sexual favors are demanded in exchange for job benefits or under threat of job penalties","A sexual assault occurs in the workplace"], "Sexual favors are demanded in exchange for job benefits or under threat of job penalties"),

      new Question("If a male employee is attracted to a female employee and asks her out on a first date; is this harassment?", ["Yes", "No"], "No"),

      new Question('When a female employee is told by supervisor, "you could go far in this company, if you just dressed more femininely;" is this harassment?', ["Yes", "No"], "Yes"),

      new Question("A person who is being sexually harassed should", ["Learn to live with it", "Tell the harasser to stop the unacceptable behavior","Tell their co-workers about it"], "Tell the harasser to stop the unacceptable behavior"),
  ];

  // create quiz
  var quiz = new Quiz(questions);

  // display quiz
  populate();




