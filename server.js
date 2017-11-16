// import thư viện express
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// khai báo biến port lấy port từ hệ thống hoặc là 4800
const port = process.env.PORT || 4800;
// khai báo biến app
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


// thực hiện lưu log quá trình request từ client đến server bằng middleware
app.use((req, res, next) => {
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error){
            console.log('Unable file server.log');
        }
    });

    next();
});

// xử lý bằng middleware để xây dựng trang bảo trì hệ thống
// nếu có request từ client lên thì render template bảo trì 
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

// khai báo biến dùng chung cho các engine template 
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        contentPage: 'Wellcome Express Node js by NPPRO',
    
    });

    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'Phuoc',
    //     like: [
    //         'games',
    //         'sing'
    //     ]
    // })
});

app.get('/about',(req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        contentPage: 'Some text here. View content guide for my site'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Project Page',
        contentPage: 'Nội dung project'
    });
})

// /bad - send back json with errorMessage
app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 4800');
});