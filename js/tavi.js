$(function() {

	Parse.$ = jQuery;

	// Initialize Parse with your Parse application javascript keys
	Parse.initialize("E4ni1ikWYDImGZAL8o5jYAuX5GloBxQyA6z7YTrm", "0tnWhmz9uf0xWOH9QpntSYI182sc68spcPhwN1MA");    

	var OrderView = Parse.View.extend({
		events: {
			//"click .log-out": "logOut",
			"change #order_time1":"select_time_changed",
			"focus #order_date": "order_select_date",
			"submit form.order-form": "order"
		},

		el: ".content",

		initialize: function() {
			_.bindAll(this, "order");
			this.render();
		},
		
		order_select_date: function() {
			var today = new Date().toISOString().split('T')[0];
			var date_field =  document.getElementsByName("order_date")[0];
			date_field.setAttribute('type', 'date');
			date_field.setAttribute('min', today);
		},
		
		select_time_changed: function() {
			var opt2 = '<select class="order_select" name="order_time2" id="order_time2">\
							<option value="0" selected>עד שעה?</option>';
			
			switch($('#order_time1 option:selected').val()) {
				case '1800':
					opt2 += '<option value="1830">18:30</option>';
				case '1830':
					opt2 += '<option value="1900">19:00</option>';
				case '1900':
					opt2 += '<option value="1930">19:30</option>';
				case '1930':
					opt2 += '<option value="2000">20:00</option>';
				case '2000':
					opt2 += '<option value="2030">20:30</option>';
				case '2030':
					opt2 += '<option value="2100">21:00</option>';
				case '2100':
					opt2 += '<option value="2130">21:30</option>';
				case '2130':
					opt2 += '<option value="2130">22:00</option>';
					break;
				default:
					opt2 += '\
								<option value="1830">18:30</option>\
								<option value="1900">19:00</option>\
								<option value="1930">19:30</option>\
								<option value="2000">20:00</option>\
								<option value="2030">20:30</option>\
								<option value="2100">21:00</option>\
								<option value="2130">21:30</option>';
					break;
			}
			opt2 += '</select>';
			
			self.$(".col2").html(opt2).show();
		},

		order: function(e) {
			var self = this;
			var _fullname = this.$("#order_fullname").val();
			var _address = this.$("#order_address").val();
			var _date = this.$("#order_date").val();
			var e1 = document.getElementById("order_time1");
			var _s_time = e1.options[e1.selectedIndex].text;
			var e2 = document.getElementById("order_time2");
			var _e_time = e2.options[e2.selectedIndex].text;
			var _phone = this.$("#order_phone").val();
			var OrderObject = Parse.Object.extend("OrderObject");
			var order = new OrderObject();
			order.save({
						fullname:	_fullname,
						address:	_address,
						date:		_date,
						start_time:		_s_time,
						end_time:		_e_time,
						phone:		_phone,
						done:		false
						//user:		Parse.User.current(),
						//ACL:		new Parse.ACL(Parse.User.current())
						}, {
					success: function(object) {
						$(".success").show();
						window.top.location.href = "http://tavi-delivery.com/thankYou.html?ref=1";
						//new ThankYouView();
						//self.undelegateEvents();
						//delete self;
					},
					error: function(user, error) {
						self.$(".order-form .error").html(_.escape(error.message)).show();
						self.$(".order-form button").removeAttr("disabled");
					}
				});

			this.$(".order-form button").attr("disabled", "disabled");

			return false;
		},
		
		 // Logs out the user and shows the login view
	    /*
	     * 
	     logOut: function(e) {
	      Parse.User.logOut();
	      new LogInView();
	      this.undelegateEvents();
	      delete this;
	    },*/
	    
		render: function() {
			this.$el.html(_.template($("#order-form-template").html()));
			this.delegateEvents();
		}
	});
/*
	var LogInView = Parse.View.extend({
		events: {
			"submit form.login-form": "logIn",
			"submit form.signup-form": "signUp"
		},

		el: ".content",

		initialize: function() {
			_.bindAll(this, "logIn", "signUp");
			this.render();
		},

		logIn: function(e) {
			var self = this;
			var username = this.$("#login-username").val();
			var password = this.$("#login-password").val();

			Parse.User.logIn(username, password, {
				success: function(user) {
					new OrderView();
					self.undelegateEvents();
					delete self;
				},

				error: function(user, error) {
					self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
					self.$(".login-form button").removeAttr("disabled");
				}
			});

			this.$(".login-form button").attr("disabled", "disabled");

			return false;
		},

		signUp: function(e) {
			var self = this;
			var username = this.$("#signup-username").val();
			var password = this.$("#signup-password").val();

			Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
				success: function(user) {
					new OrderView();
					self.undelegateEvents();
					delete self;
				},

				error: function(user, error) {
					self.$(".signup-form .error").html(_.escape(error.message)).show();
					self.$(".signup-form button").removeAttr("disabled");
				}
			});

			this.$(".signup-form button").attr("disabled", "disabled");

			return false;
		},

		render: function() {
			this.$el.html(_.template($("#login-template").html()));
			this.delegateEvents();
		}
	});
*/

//	The main view for the app
	var AppView = Parse.View.extend({
		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: $("#tp_app"),

		initialize: function() {
			this.render();
		},

		render: function() {
			/*if (Parse.User.current()) {
				new OrderView();
			} else {
				new LogInView();
			}*/
			new OrderView();
		}
	});

	new AppView;
	//Parse.history.start({});
});
