
/*
 * GET home page.
 */

exports.index = function(req, res){
	var view=req.route.path.replace("/","");
	switch(view){
		default:
			res.render(view, { title: 'Generic Page' });
		break;
		case "":
			res.render('index', { title: 'Group5 iBeacon Town!' });
		break;
		case "socket":
			res.render(view, { title: 'Testing Sockets' });
		break;
		case "ping":
			res.render(view, { title: 'Ping' });
		break;
		case "cms":
			res.render(view, { title: 'CMS' });
		break;

	}
};