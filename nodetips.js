/*
 * Pequenos códigos para uso geral, de códigos que uso no dia a dia.
 * Alguns códigos podem depender de coisas externas ao node, como express.
 */
 
 /**************************************************************************
  * Acessar arquivos da sua app via browser
  * Obs: Somente acessa arquivos com url completa, não lista o diretório
  */
  var express = require('express'),
      path = require('path'),
      app = express.createServer();
  app.use(express.static(path.dirname(process.mainModule.filename)));
  
 /**************************************************************************
  * Fazer upload de arquivos
  * Obs: não esquecer de adicionar o atributo ao formulário: enctype="multipart/form-data"
  */
  
  var fs = require('fs');
  
  //O nome do campo no form é "arquivo
	fs.readFile(req.files.arquivo.path, function (err, data) {
	  // Montando url do arquivo (sudpondo que seja pdf)
	  var newPath = __dirname + "/uploads/"+req.body.nomearquivo+".pdf";
	  fs.writeFile(newPath, data, function (err) {
	    //redireciona de acorto com a msg de erro
		  if(!err){
		    	res.redirect("/?ok=1");
			} else {
		    	res.redirect("/?erro=1");
			}
	  });
	});
	
 /**************************************************************************
  * Obter os parametros passados via get
  */
  	var query = require('url').parse(req.url,true).query;
  	
 /**************************************************************************
  * Renderizar uma página externa no seu site
  */
    var request = require('request'),
		    options = {
  		    url: 'http://sheldonled.com',
  		    headers: {
  		        'Content-type' : 'text/html; charset=utf-8'
		    }
		    
		request.get(options, function (err, response, body) {
	        res.send(body);
	    });
		};
