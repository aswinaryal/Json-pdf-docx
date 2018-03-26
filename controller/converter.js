import fs from 'fs';
import pdf from 'html-pdf';
import Handlebars from 'handlebars';
import jsondata from '../models/data';

function getPdf(request,response,next){
  const options = { format: 'Letter' };
  const templatefile = fs.readFileSync('./views/template.hbs','utf8');

  let data = {"skills":jsondata.skills,"experiences":jsondata.experiences,"education":jsondata.education};
  let template = Handlebars.compile(templatefile);
  let result = template(data);

  pdf.create(result, options).toFile('./test.pdf', function(err, res) {
    if (err) return console.log(err);
    // console.log(res);
    response.status(200)
      .json({
        status: 'success',
        message: 'Your pdf file has been generated to '+res.filename
      });
  });

}

function getDocx(request,response,next){
  let carbone = require('carbone');

  carbone.render('./models/template.odt', jsondata, function(err, result){
    if (err) {
      return console.log(err);
    }
    // write the result
		fs.writeFileSync('test.docx', result);
		// process.exit(); // to kill automatically LibreOffice workers
    response.status(200)
      .json({
        status: 'success',
        message: 'Your docx file has been generated to root folder'
      });
	});
}

export default {getPdf,getDocx}
