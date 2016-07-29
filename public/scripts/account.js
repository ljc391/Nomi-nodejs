$(function(){

	var state;
	var n_time;
	var r_time;
		$('#postform').on('click', function(e){
			e.preventDefault();
			var title = $('#title').val();
			var content = $('#content').val();

			postForm(title, content);
		});

		function postForm(title, content){
			$.ajax({
				url:'./postapi.php',
				method:'POST',
				data:{
					action:'postForm',
					title:title,
					content:content
				},
				dataType:'json',
				success: function(response){
					if (response.success){

						//console.log(response.success);
						//console.log(response.message);
					}else{

						//console.log("err");

						alert(response.message);
					}
				},
				error: function(response){
					//console.log("errs");
					//console.log(response.message);
				}

			});
		}






    	$('a[href="#logout"]').on('click', function(e){

    		e.preventDefault();
    		attemptLogout();
    	})


		function attemptLogout(){
			$.ajax({
				url:'./ajax/unauthenticate',
				method:'POST',
				data:{
					action:'signout'
				},
				dataType:'json',
				success: function(response){
					if (response.success){
						location.reload();
					}else{
						alert(response.message)
					}
				},
				error: function(){

				}

			});
		}


		$('a[href="#postComment"]').on('click', function(e){
			//console.log('click');
			e.preventDefault();
			var postId = $(this).attr('data-postId');
			$('#submitPostComment').attr('data-postId', postId);
			$('#postCommentModal').modal('show');
			loadPostComment(postId);

		});

		function loadPostComment(postId){
			$.ajax({
				url:'./getapi.php',
				method:'GET',
				data:{

					postId:postId,
					action:'loadPostComment'
				},
				dataType:'json',
				success: function(response){
					if (response.success){
						//var l = $('.list-group-item').length;
 						//$('.list-group-item').slice(1, l).remove();

 					$('.list-group-item').remove();

						var len = response.data.length;

				        for(var i=0;i<len;i++ ){
				        	if(response.data[i] != "nope"){
				            var $li = $('<li>').addClass('list-group-item').html(response.data[i]);
							$('.pcc').append($li) ;
 							}

				        }



					}else{
						//console.log(response.message);
					}
				},
				error: function(){
					//var l = $('.list-group-item').length;
 					//$('.list-group-item').slice(1, l).remove();
 					$('.list-group-item').remove();

				}

			});
		}

		$('#submitPostComment').on('click', function(e){
			e.preventDefault();
			//console.log('click2');
			var postId = $(this).attr('data-postId');
			var cname = $(this).attr('data-uname');
			//console.log(postId);
			//console.log(cname);
			var text = $('#postCommentText').val();
			$('.ppc').attr('data-postId', postId);
			$('#postCommentText').val('');
			attemptPostComment(postId, text,cname);
		});

		function attemptPostComment(postId, text, cname){
			$.ajax({
				url:'./postapi.php',
				method:'POST',
				data:{
					action:'postComment',
					postId:postId,
					cname:cname,
					text:text
				},
				dataType:'json',
				success: function(response){
					if (response.success){
						//console.log("success");

						var res = cname + " : " + text;

						//console.log(response.data);
						var $li = $('<li>').addClass('list-group-item').html(res);
						$('.pcc').append($li) ;
						$(this).attr('data-postId','0');
						notifyuser(postId);
						//$('#postCommentModal').modal('hide');

					}else{
					}
				},
				error: function(){
				}

			});
		}

        setInterval(usertimestamp, 5000);
		function usertimestamp(){
			$.ajax({
				url:'./postapi.php',
				method:'POST',
				data:{
					action:'userTimestamp'
				},
				dataType:'json',
				success: function(response){
					if (response.success){
						//console.log("success update time");


					}else{
						//console.log("e1");
						//console.log(response);
					}
				},
				error: function(){
					//console.log("e2");
				}

			});
		}
		function updatertime(){
			//alert('u clicked me');

			$.ajax({
				url:'./process_notify.php',
				method:'POST',
				data:{
					function:'updateRtime'
				},
				dataType:'json',
				success: function(response){
					if (response.success){
						//
						//console.log("success update R time");
						//console.log(response.r_time);
						r_time = response.r_time;
						$('li.noti').remove();
						$('#navimg').attr("src","image/edit.png");

					}else{
						//console.log("e1");
						//console.log(response);
					}
				},
				error: function(){
					//console.log("e2");
				}

			});

		}

/*
		var noti =  new Notification();
		function Notification () {
		    this.update = notifyuser;
			//this.getState = getStateOfNotification;
		}
*/


		var notifyUserTimer = null;

		function getStateOfNotification(){
			$.ajax({
			   type: "POST",
			   url: "process_notify.php",
			   data: {
			            'function': 'getState'
			            },
			   dataType: "json",

			   success: function(response){
			       n_time = response.n_time;
			       r_time = response.r_time;


			       notifyuser();

			       if (notifyUserTimer==null) notifyUserTimer = setInterval(notifyuser, 15000);

			   },
			});
		}

		getStateOfNotification();



		function notifyuser(postId){

			$('li.noti').remove();
			//console.log('---',n_time, r_time);
			$.ajax({
				type: "POST",
		        url:"process_notify.php",
				data:{
					'function':'notifyUser',
					postId:postId,
					n_time:n_time,
					r_time:r_time
				},
				dataType:'json',
				success: function(response){
					if (response.success){
						//console.log(response.data);

						//console.log(response.times);
						//getStateOfNotification();
				        var t = response.data;
				       // console.log(t);
				        //"<?php echo($u_id); ?>";
				        	//if(response.data.includes(t)){
				        //alert(t);
 							//}else{
 							//	console.log("no need to notify")
 							//}
 						var len = response.data.length;
 						if(len>0){
 							$('#navimg').attr("src","image/edit2.png");
 						}
 						for(var i=0;i<len;i++ ){
				        	var txt = "content-" + response.data[i];
 							console.log(response);
 							var $li = $('<li>').addClass('noti').append($('<a>').attr('href',txt).append(response.title[i]));
							$('.dropdown-menu').append($li);

				        }
				        if (len>0){
					        var $a = $('<a>').attr('href','#markRead').append('Mark read').on('click', function(e){
					        	e.preventDefault();
					        	updatertime();
					        });
					        var $li = $('<li>').addClass('noti').append($a);
								$('.dropdown-menu').append($li);
						}





					}else{
						console.log("no action");
					}
				},
				error: function(response){
					//console.log(response);
				}

			});
			//setTimeout(notifyuser(postId), 15000); // Every 15 seconds.
		}


		$('a[href="#likeContent"]').on('click', function(e){
			e.preventDefault();
			$this = $(this);
			var postId = $(this).attr('data-postId');
			$.ajax({
				url:'./postapi.php',
				method:'POST',
				data:{
					action:'likeContent',
					postId:postId
				},
				dataType:'json',
				success: function(response){
					if (response.success){
						//console.log("ulike");
						//console.log(response.data);
						//console.log(response.message);
						var images = $this.find('img');
					    images.attr('src','image/dlike.png');

					}else{
						//console.log("like");
						//console.log(response.data);
						//console.log(response.message);
						var images = $this.find('img');
					    images.attr('src','image/like.png');

					    images.animate({width: '50px'}).animate({width:'40px'});

					}
				},
				error: function(response){
						//console.log("error22");
				}

			});

		});

		$('a[href="#content-4"]').on('click', function(e){
			e.preventDefault();
			//console.log('click');
			$this = $(this);

			var postId = $(this).attr('data-postId');
			loadPostComment(postId);


		});

 		$('#searchbtm').on('click', function(e){
			e.preventDefault();
			var keyword = $('#inputbox').val();
			LoadSingleContent(keyword);


		});

		function LoadSingleContent(keyword){
			$.ajax({
				url:'./postapi.php',
				method:'POST',
				data:{
					action:'postComment',
					postId:postId,
					text:text
				},
				dataType:'json',
				success: function(response){
					if (response.success){
						//console.log("success");


						//console.log(response.data);
						var $li = $('<li>').addClass('list-group-item').html(text);
						$('.pcc').append($li) ;
						$(this).attr('data-postId','0');

						//$('#postCommentModal').modal('hide');

					}else{
					}
				},
				error: function(){
				}

			});
		}

		$("navbar-form").blur(function(){
			resetSearchResultTimer();
		});
		var searchRequest = null;

		var searchResultTimer=null;

		function resetSearchResultTimer(){
			if (searchResultTimer!=null) clearTimeout(searchResultTimer);
			searchResultTimer = setTimeout(function(){
				$('#searchresult>li').remove();
			}, 3000);
		}
		$('#inputbox').on('mouseleave',function(){
			///console.log("left");
			resetSearchResultTimer();
		});
		$('#searchresult').on('mouseleave',function(){
			///console.log("left");
			//resetSearchResultTimer();
		});

		$('#searchresult').on('mousemove',function(){
			resetSearchResultTimer();
		});

		function populateLis(that){
			//console.log("inputbox!!");
			value = $(that).val();
	        if (value.length >= 1 ) {
	            if (searchRequest != null)
	                searchRequest.abort();
	            	searchRequest = $.ajax({
		                type: "GET",
		               url:'./getapi.php',
		                data: {
		                    search_keyword : value,
							action:'searchbar'
		                },
		                dataType: "json",
		                success: function(response){
		                    //we need to check if the value is the same

		                    //Receiving the result of search here
		                    if (response.success){

			                	//console.log("success");
	 							$('#searchresult>li').remove();

								var len = response.data.length;

								var $searchresult = $('#searchresult');

						        for(var i=0;i<len;i++ ){
						            //console.log(response.data[i]);
						            var $a = $('<a>').html(response.data[i]);
						            var cont = "content-"+response.ids[i];
						            $a.attr('href',cont);
						            var $li = $('<li>').addClass("list-group-item");
						            $li.append($a);
						            $searchresult.append($li);

						        }


							}else{

	 							$('#searchresult>li').remove();
								//console.log("non");
								//console.log(response.data);
								var $li = $('<li>').addClass("list-group-item").html(response.data);
						        $('#searchresult').append($li);
							}

		                },
		                error: function(response){
		                	//console.log("error");
		                	//console.log(response);
		                }
	            	});
	        }
		}

		$("#inputbox").keyup(function () {
        	populateLis(this);
    	});

    	$("#inputbox").click(function () {
        	populateLis(this);
    	});

    	$("#inputbox").focus(function () {
        	populateLis(this);
    	});

	$('#fcom').on('click', function(e){
			e.preventDefault();
			var postId = $(this).attr('data-postId');
			//console.log('click');
			loadPostComment(postId);


		});
	$('a[href="#message"]').on('click',function(e){
		e.preventDefault();
		//console.log("msg page");

		var mtime = new Date().getTime();

		window.location.href = "message.php";
		//loadMessage(mtime);
	})




  });