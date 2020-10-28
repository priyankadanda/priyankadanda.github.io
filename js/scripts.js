//Attach wave effect to buttons and other elements
Waves.attach(".btn");
Waves.init();

//PORTFOLIO INFO START

//Insert products info here
const products = [{ "title": "Apple", 
					"description" : "Product Design Engineering Co-op for Apple's Cable and Accesories Team", 
					"banner" : "https://i.imgur.com/kME5mxG.png",
					"url" : "apple.html" },
					{ "title": "Bridgestone", 
					"description" : "Student Corporate Consultant for Bridgestone through Krannert School of Management", 
					"banner" : "https://i.imgur.com/ivKXX9z.jpg", 
					"url" : "bridgestone.html"},
		{ "title": "C-Design Lab", 
					"description" : "Graduate Assistant for Purdue's C-Design Lab", 
					"banner" : "https://i.imgur.com/IEohR34.png", 
					"url" : "cdesign.html"}];

//Insert projects info here
const projects = [{ "title": "Floor Cleaning Robot", 
					"description" : "Designed an autonomous robot that can track, sort, pickup and drop ball bearings in a no light situation.", 
					"banner" : "https://i.imgur.com/Dbo3KhP.png",
					"url" : "mechatronics.html" },
					{ "title": "Refrigeration Solution for office purposes", 
					"description" : "Designed a solution for shared refrigerator space for offices to increase efficiency in maintenance.", 
					"banner" : "https://i.imgur.com/0XjdIHP.png",
					"url" : "refridgerator.html" }
		];

//PORTFOLIO INFO END


//REACT COMPONENTS START

//Class for individual products/projects card
class Card extends React.Component {
  render() {
  	return (
  		<div className="card animated bounceIn">
		    <div className="pageImg d-flex align-items-center">
		      <a href="#" data-toggle="modal" data-target="#modalContainer"><img src={this.props.banner}></img></a>
		    </div>
		    <div className="pageInfo">
		      <a href="#" className="pageTitle" data-toggle="modal" data-target="#modalContainer"><h1>{this.props.title}</h1></a>
		      <p className="pageDescription">{this.props.description}</p>
		    </div>
		</div>
  	);
  }
}

class ModalTitle extends React.Component {
	render(){
		return (<div>{this.props.title}</div>);
	}
}

// class ModalPics extends React.Component {
// 	render(){
// 		return (
// 			<div className="modal-body">

// 			</div>
// 		);
// 	}
// }

//Class for groups of cards
class Cards extends React.Component {
	render() {
		var cards = [];
		if (this.props.type == "products") {
			for (var i = 0; i < products.length; i++ ) {
				cards.push(<Card key={i} banner={products[i].banner} title={products[i].title} description={products[i].description} url={products[i].url} />)
			}
		} else {
			for (var i = 0; i < projects.length; i++ ) {
				cards.push(<Card key={i} banner={projects[i].banner} title={projects[i].title} description={projects[i].description} url={projects[i].url} />)
			}
		}

		return (
			<div className="cards d-flex flex-row justify-content-center flex-wrap" id={"cards-"+this.props.type}>{cards}</div>
		);
	}
}

//Class for messages made by the bot
class MessageBot extends React.Component {
	render() {
		
		var props = this.props.message;
		var ids = this.props.id;
		var messages = [];

		for (var i = 0; i < props.length; i++ ) {
			messages.push(<li key={i} className="chatBubble" id={ids[i]}>{props[i]}</li>);
		}

		return (

			<div className="chatContainer animated slideInUp d-flex flex-row justify-content-start align-items-end">
				<div className="thumbnail" id={"pic-"+ids[0]}>
					<img src="https://i.imgur.com/qo6Fe88.jpg"></img>
				</div>
				<ul className="chatBubbles">
					{messages}
				</ul>
			</div>

		);
	}
}

//Class for messages made by user
class MessageUser extends React.Component {
	render() {
		return (
			<div className="chatBubble chatReply animated slideInUp chatContainer align-self-end" id={this.props.id}>{this.props.message}</div>
		);
	}
}

//REACT COMPONENTS END

//REACT RENDERING + ANIMATIONS START

const totalMessages = 14; //Number of total messages goes here
var messagesRemaining = 9; //Number of messages remaining after intro

const outroMessage = "Thanks for hanging out! Don't forget to check out my LinkedIn profile at the bottom of the page 🙃";
const outroID = "outro";

$(document).on("click", "#btnProducts", function(){

	$('.replyButtons button').prop('disabled', true);
	$("#header").fadeOut();
	
	//Render user reply
	var idProd1 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageUser message="Tell me about your experience" id={"chat-"+idProd1}/>, document.getElementById('userReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#userReplies").html());

	//Render bot reply
	var botReply = ["Sure thing"];
	var idProd2 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageBot message={botReply} id={["chat-"+idProd2]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());

	//Render products cards
	ReactDOM.render(<Cards type="products" />, document.getElementById('products'));
	$(".replyButtons").before($("#products").html());	

	//Render bot follow-up if this is not the last prompt
	if ($(".replyButtons").children().length > 1) {
		var botFollowUp = ["Anything else?"];
		var idProd3 = (totalMessages - messagesRemaining).toString();
	} else {
		var botFollowUp = [outroMessage];
		var idProd3 = outroID;
	}

	ReactDOM.render(<MessageBot message={botFollowUp} id={["chat-"+idProd3]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());

	//Reveal and animate rendered components
	$(".container").addClass("fixed-bottom");
	$(".replyButtons").removeClass("fadeIn");
	$(".replyButtons").addClass("fadeOut");
	$("#chat-"+idProd1).slideToggle();
	setTimeout(function(){ $("#btnProducts").remove();; }, 400);
	setTimeout(function(){ $("#chat-"+idProd2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#pic-chat-"+idProd2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#cards-products .card").slideToggle(); }, 2000);
	setTimeout(function(){ $("#chat-"+idProd3).slideToggle(); }, 3000);
	setTimeout(function(){ $("#pic-chat-"+idProd3).slideToggle(); }, 3000);
	setTimeout(function(){ $('.replyButtons button').prop('disabled', false); $(".replyButtons").removeClass("fadeOut"); $(".replyButtons").addClass("fadeIn"); }, 3000);
	setTimeout(function(){ updateScroll(); $(".card").removeClass("animated"); }, 3400);

});

$(document).on("click", "#btnProjects", function(){

	$('.replyButtons button').prop('disabled', true);
	$("#header").fadeOut();
	
	//Render user reply
	var idProj1 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageUser message="I want to know about your projects!" id={"chat-"+idProj1} />, document.getElementById('userReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#userReplies").html());

	//Render bot reply
	var botReply = ["Here ya go 😎"];
	var idProj2 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageBot message={botReply} id={["chat-"+idProj2]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());

	//Render projects cards
	ReactDOM.render(<Cards type="projects" />, document.getElementById('projects'));
	$(".replyButtons").before($("#projects").html());

	//Render bot follow-up if this is not the last prompt
	if ($(".replyButtons").children().length > 1) {
		var botFollowUp = ["What else? 🤔"];
		var idProj3 = (totalMessages - messagesRemaining).toString();
	} else {
		var botFollowUp = [outroMessage];
		var idProj3 = outroID;
	}
	ReactDOM.render(<MessageBot message={botFollowUp} id={["chat-"+idProj3]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());


	//Reveal and animate rendered components
	$(".container").addClass("fixed-bottom");
	$(".replyButtons").removeClass("fadeIn");
	$(".replyButtons").addClass("fadeOut");
	$("#chat-"+idProj1).slideToggle();
	setTimeout(function(){ $("#btnProjects").remove(); }, 400);
	setTimeout(function(){ $("#chat-"+idProj2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#pic-chat-"+idProj2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#cards-projects .card").slideToggle(); }, 2000);
	setTimeout(function(){ $("#chat-"+idProj3).slideToggle(); }, 3000);
	setTimeout(function(){ $("#pic-chat-"+idProj3).slideToggle(); }, 3000);
	setTimeout(function(){ $('.replyButtons button').prop('disabled', false); $(".replyButtons").removeClass("fadeOut"); $(".replyButtons").addClass("fadeIn"); }, 3000);
	setTimeout(function(){ updateScroll(); $(".card").removeClass("animated"); }, 3400);

});

$(document).on("click", "#btnAboutMe", function(){

	$('.replyButtons button').prop('disabled', true);
	$("#header").fadeOut();
	
	//Render user reply
	var idAbout1 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageUser message="Tell me more about yourself 🙂" id={"chat-"+idAbout1} />, document.getElementById('userReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#userReplies").html());
	//Set messages for 'about me' reply
	var aboutMe1 = "Does this mean we're friends? 😁";
	var id1 = "chat-"+(totalMessages - messagesRemaining).toString();
	var aboutMe2 = "I'm currently building an awesome SaaS platform for legal teams as a Product Manager";
	var id2 = "chat-"+(totalMessages - messagesRemaining + 1).toString();
	var aboutMe3 = "Psst. I am the UX designer for my projects as well! We can discuss this over some coffee ☕";
	var id3 = "chat-"+(totalMessages - messagesRemaining + 2).toString();
	var aboutMe4 = "I love technology and I'm currently looking to join a product team as a product manager! If you've got any leads, email me at danda_priyanka@outlook.com 👍";
	var id4 = "chat-"+(totalMessages - messagesRemaining + 3).toString();
	var botFollowUp = "Wanna see my work?";
	var botGoodbye = "Thanks for hanging out! 👋"
	var id5 = "chat-"+(totalMessages - messagesRemaining + 4).toString();

	//Only include bot follow up if this is not the final prompt
	if ($(".replyButtons").children().length > 1) {
		var messages = [aboutMe1, aboutMe2, aboutMe3, aboutMe4, botFollowUp];
		var ids = [id1, id2, id3, id4];
	} else {
		var messages = [aboutMe1, aboutMe2, aboutMe3, aboutMe4, botGoodbye];
		var ids = [id1, id2, id3, id4];
	}

	//Render 'about me' replies
	ReactDOM.render(<MessageBot message={messages} id={ids} />, document.getElementById('aboutMe'));
	messagesRemaining = messagesRemaining - ids.length;
	$(".replyButtons").before($("#aboutMe").html());
	
	//Animate rendered components
	$(".container").addClass("fixed-bottom");
	$(".replyButtons").removeClass("fadeIn");
	$(".replyButtons").addClass("fadeOut");
	$("#chat-"+idAbout1).slideToggle();
	setTimeout(function(){ $("#btnAboutMe").remove(); }, 400);
	setTimeout(function(){ $("#"+id1).slideToggle(); }, 1000);
	setTimeout(function(){ $(".container .thumbnail").last().slideToggle(); }, 1000);
	setTimeout(function(){ $("#"+id2).slideToggle(); }, 2000);
	setTimeout(function(){ $("#"+id3).slideToggle(); }, 3000);
	setTimeout(function(){ $("#"+id4).slideToggle(); }, 4000);
	setTimeout(function(){ $('.replyButtons button').prop('disabled', false); $(".replyButtons").removeClass("fadeOut"); $(".replyButtons").addClass("fadeIn"); }, 4000);
	setTimeout(function(){ updateScroll(); $(".card").removeClass("animated"); }, 4400);

});

//Load modal file when user clicks on project
$(document).on("click", ".card a", function(){
	$("#modalContainer .modal-content").empty();
	var modalTitle = $(this).parent().parent().find(".pageTitle").text();
	if ($(this).parent().parent().parent().attr("id") == "cards-products") {
		var project = arraySearch(modalTitle, products);
	} else {
		var project = arraySearch(modalTitle, projects);
	}
	$("#modalContainer .modal-content").load(project.url);
	Waves.attach(".btn, .carousel-control-next, .carousel-control-prev");
	Waves.init();
});

//REACT RENDERING + ANIMATIONS END

//INTRO ANIMATION START

//function to detect when animations end
var animationEnd = (function(el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));

setTimeout(function(){$("#chat-1, #pic-intro").slideToggle()}, 200);
$('#chat-1').one(animationEnd, function(){
	setTimeout(function(){$("#chat-2").slideToggle()}, 100);
	$('#chat-2').one(animationEnd, function(){
		setTimeout(function(){$("#chat-3").slideToggle()}, 100);
		$('#chat-3').one(animationEnd, function(){
			setTimeout(function(){$("#chat-4").slideToggle()}, 100);
			$('#chat-4').one(animationEnd, function(){
				$(".replyButtons").css("visibility", "visible");
				$(".replyButtons").addClass("animated fadeIn");
			});
		});
	});
});

//INTRO ANIMATION END

//FUNCTIONS

//scroll to bottom of page
function updateScroll() {
	if ($(".container").height() > $(window).height()) {
		$(".container").removeClass("fixed-bottom");
	}
	$(document).scrollTop($(".container")[0].scrollHeight);
}

//Search array for object key value
function arraySearch(valueKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].title === valueKey) {
            return myArray[i];
        }
    }
}
