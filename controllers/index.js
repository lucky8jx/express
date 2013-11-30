

exports.mainHome = function(req, res) {
	res.render('index', {
		title: 'Rainbow',
		logflag: false,
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
};

exports.userHome = function(req, res) {
	res.render('index', {
		title: 'Rainbow',
		logflag: true,
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
		},
		user: req.session.user
	});
};

