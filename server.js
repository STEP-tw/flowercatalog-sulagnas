let fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const http = require('http');
const WebApp = require('./webapp');
const storeNewComment=require('./lib/dataStore.js').storeNewComment;

let registered_users = [{userName:'bhanutv',name:'Bhanu Teja Verma'},{userName:'harshab',name:'Harsha Vardhana'}];

const logRequest=function (req) {
  console.log(req.method,'==>',req.url);
};

const loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
    console.log('\nuser is ==> ',req.user);
    console.log('========================');
  }
};

const getContentType=function (fileName) {
  let extension=fileName.split('.').pop();
  let contentType={
    'html':'text/html',
    'css':'text/css',
    'js':'text/js',
    'pdf':'application/pdf',
    'gif':'img/gif',
    'jpg':'img/jpg'
  }
  if(contentType[extension])
    return contentType[extension];
  return 'text/plain';
};

const getPath=function (req) {
  if(req.url=='/'||req.url=='/index.html'||req.url=='/logoutPage'){
    return './public/index.html';
  }
  return req.url.replace('/','./public/');
};

const redirectToLoginPage=function (res) {
  res.setHeader('Set-Cookie',`loginFailed=true`);
  res.redirect('/loginPage.html');
}

const getUserWithSessionId=function (res,user) {
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
}

const redirectToGuestBook=function (res) {
  res.redirect('/guestBook.html');
};

const redirectToRequiredPage=function (req,res) {
  let user = registered_users.find(u=>u.userName==req.body.userName);
  console.log(req.body,req.method);
  if(!user) {
    redirectToLoginPage(res);
    return;
  }
  getUserWithSessionId(res,user);
  redirectToGuestBook(res);
};

const writeContentOfFile=function (res,path,content) {
  res.setHeader('Content-Type',getContentType(path));
  res.write(content);
  res.end();
};

const serveFile=function (req,res) {
  let path=getPath(req);
  let content=fs.readFileSync(path)
  writeContentOfFile(res,path,content);
};

const getContentOfFile=function (req,res) {
  if(req.method=='GET')
    serveFile(req,res);
};

const redirectToIndexPage=function (res) {
  res.redirect('/index.html');
};

let app = WebApp.create();

app.use(logRequest);
app.use(loadUser);
app.use(getContentOfFile);

app.post('/addComment',(req,res)=>{
  let user = req.user;
  if(!user) {
    redirectToLoginPage(res);
    return;
  }
  storeNewComment(req.body);
  redirectToGuestBook(res)
});

app.post('/loginPage.html',(req,res)=>{
  redirectToRequiredPage(req,res);
});

const PORT = 6500;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
