jQuery(document).ready(function(){
	jQuery(".login input[type=text],.login .input").focus(function(){
		jQuery(this).parent().addClass("focus");
	});
	jQuery(".login input[type=text],.login .input").blur(function(){
		jQuery(this).parent().removeClass("focus");
	});

	jQuery("#loginform .button").click(function(e){
		e.preventDefault();
		var username = jQuery("#user_login").removeClass("error").removeClass("focus").val();
		var password = jQuery("#user_pass").removeClass("error").removeClass("focus").val();
		var error = false;

		jQuery("p.message").remove();
		jQuery("#login_error").remove();
		if(!username){
			jQuery("#user_login").parent().addClass("error").addClass("focus");
			error = true;
		}
		if(!password){
			jQuery("#user_pass").parent().addClass("error").addClass("focus");
			error=true;
		}
		if(error){
			jQuery("h1").after("<p class='message' id='login_error'>Please fill out all required fields.</p>");
		}else{
			//jQuery("#loginform").submit();

			//Ajax Login attempt
			var data = jQuery("#loginform").serialize();
			var url = jQuery("#loginform").attr("action");
			console.log("here");
			console.log(url);
			jQuery.ajax({
				type:'post',
				url:url,
				data:data,
				beforeSend:function(){
					jQuery("body").addClass("loading");
				},
				error:function(data){
					console.log("error");
					console.log(data);
					jQuery("body").removeClass("loading");
					jQuery("h1").after('<div id="login_error">Login error: please try again later.</div>');
				},
				success:function(data){
					var name = jQuery(data).filter("#name").html(); 
					var username = jQuery(data).filter("#username").html(); 

					if(!name && !username){
						// failed login
						jQuery("body").removeClass("loading");
						jQuery("h1").after('<div id="login_error">Invalid Login credentials.</div>');
					}else{
						// successful login presents greeting before redirecting
						jQuery("#loginform,#nav,#backtoblog").addClass("inactive");
						if(name)
							jQuery("#login").prepend("<h2>Welcome, " + name + "!</h2>");
						else
							jQuery("#login").prepend("<h2>Welcome, " + username + "!</h2>");

						jQuery("#login h2").addClass("active");
						setTimeout(function(){
							window.location = '/wp-admin';
						},1000);
					}
				}
			})
		}
	});

	jQuery("p#nav a,.modal-mask").click(function(e){
		e.preventDefault();
		jQuery(".modal").toggleClass("modal-active");
		jQuery("html").toggleClass("modal-perspective");
	})
})
