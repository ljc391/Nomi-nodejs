$(function(){


    	$('a[href="#createAccount"]').on('click', function(e){
    		e.preventDefault();
    		$('.forsignup').show().prop('disabled', false);
    		$('.forsignin').hide();
    	})

    	$('a[href="#signIn"]').on('click', function(e){
    		e.preventDefault();
    		$('.forsignup').hide();
    		$('.forsignin').show().prop('disabled', false);;
    	})

    	$('a[href="#guest"]').on('click', function(e){
    		e.preventDefault();
    		$('.forsignup').hide();
    		$('.forsignin').hide();
    		var guest = 'guest'.split('');
    		var guestPassword = 'guest'.split('');

    		console.log(guest);
    		$('#userid').val('');
    		$('#pwd').val('');

    		var first = true;
    		function aPwd(){
    			if (guestPassword.length==2 && first){
    				$('#pwd').val('');
    				guestPassword = 'guest'.split('');
    				first=false;
    			}
    			if (guestPassword.length>0){
	    			var c = guestPassword.shift();
	    			var current = $('#pwd').val();
	    			$('#pwd').val(current+c);
	    			setTimeout(aPwd,200);
	    		}else{
	    			setTimeout(function(){
	    				attemptSignIn();
	    			},1000)
	    		}
    		}

    		function aUser(){
    			if (guest.length>0){
	    			var c = guest.shift();
	    			var current = $('#userid').val();
	    			$('#userid').val(current+c);
	    			setTimeout(aUser,200);
	    		}else{
	    			setTimeout(aPwd,1000)
	    		}
    		}
    		aUser();
    	})

		$('#signin').on('click', function(e){
    		e.preventDefault();
    		attemptSignIn();
    	})

		function attemptSignIn(){
			$.ajax({
				url:'./ajax/authenticate',
				method:'POST',
				data:{
					u_accountName:$('#userid').val(),
					u_pwd:$('#pwd').val()
				},
				dataType:'json',
				success: function(response){
					if (response.success){
                        location.reload();
                    }else{
                        alert(response.message);
                    }
				},
				error: function(error){
                    alert(error.message);
                }
			});
		}

		$('#signup').on('click', function(e){
    		e.preventDefault();
    		attemptSignUp();
    	})

		function attemptSignUp(){
			$.ajax({
				url:'./ajax/register',
				method:'POST',
				data:{
					u_accountName:$('#userid').val(),
					u_pwd:$('#pwd').val(),
					u_name:$('#usern').val(),
					u_email:$('#email').val()
				},
				dataType:'json',
				success: function(response){
					if (response.success){
                        location.reload();
                    }else{
                        alert(response.message);
                    }
				},
				error: function(error){
                    alert(error)
				}

			});
		}





  });