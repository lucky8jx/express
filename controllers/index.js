exports.index = function(req, res) {
	res.render('index', {
		title: 'Rainbow',
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
}