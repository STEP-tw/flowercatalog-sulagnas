const fs=require('fs');

const getNewCommentWithNameAndDate=function (commentDetails,userName) {
  commentDetails.date = new Date().toLocaleString();
  commentDetails.name = userName;
  return commentDetails;
};

const storeInCommentsStorage=function (commentsStoragePath,commentsInPublicPath,newComment) {
  fs.readFile(commentsStoragePath,(err,content)=>{
    let commentList=JSON.parse(content);
    commentList.unshift(newComment);
    writeInCommentStorage(commentsStoragePath,commentList);
    writeInPublicStorage(commentsInPublicPath,commentList);
  });
};

const storeNewComment=function (commentDetails,userName) {
  let newComment=getNewCommentWithNameAndDate(commentDetails,userName);
  const commentsStoragePath='./data/comments.json';
  const commentsInPublicPath='./public/js/comments.js'
  storeInCommentsStorage(commentsStoragePath,commentsInPublicPath,newComment);
};

const writeInCommentStorage=function (commentsStoragePath,commentList) {
  let commentToStore=JSON.stringify(commentList,null,2);
  fs.writeFile(commentsStoragePath,commentToStore,()=>{});
};

const writeInPublicStorage=function (commentsInPublicPath,commentList) {
  let commentToStore='let commentList='+JSON.stringify(commentList,null,2);
  fs.writeFile(commentsInPublicPath,commentToStore,()=>{});
};

const redirectToPage=function (res,location){
  const redirectLocation={'Location':location};
  res.writeHead(302,redirectLocation);
  res.end();
};

exports.storeNewComment=storeNewComment;
