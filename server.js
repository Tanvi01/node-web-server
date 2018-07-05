const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT||3000;
var app=express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFileSync('server.log',log + '\n');
next();

})

app.get('/',(req,res)=>{
	//res.send('<h1>Hello express!</h1>');
	// res.send({
	// 	name:'Tanvi',
	// 	likes:[
	// 	'biking','cities']
	// });
	res.render('home.hbs',{
		welcomeMsg:'Hi!Welcome to the home page',
		pageHeading:'Home'});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageHeading:'About Page'
	});
});
app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'Unable to proceed madam'
	});
});

app.get('/project',(req,res)=>{
	res.render('project.hbs',{
	welcomeMsg:'Welcome to my Project page',
		pageHeading:'Project'		
		
	});
});
app.listen(port,()=>{
	console.log(`server is up on port ${port}`);
});
