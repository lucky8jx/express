

exports.index = function(req, res) {
	// console.log(req.session.user, 'aaaaa');
	// req.session.user = null;
	if (req.signedCookies.user == null) {
		res.render('index', {
			title: 'Rainbow',
			login: false,
			items: {
				item1: {
					link: '#',
					source: '/images/shadow.png',
					alter: 'shadow'
				},
				item2: {
					link: '#',
					source: '/images/shadow.png',
					alter: 'shadow'
				},
				item3: {
					link: '#',
					source: '/images/shadow.png',
					alter: 'shadow'
				} 
			}
		});
	} else {
		res.render('index', {
			title: 'Rainbow',
			user: req.session.user,
			login: true
		});
	}
	
};

