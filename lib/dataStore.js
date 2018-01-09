const fs=require('fs');

const getNewCommentWithDate=function (commentDetails) {
  commentDetails.date = new Date().toLocaleString();
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

const storeNewComment=function (commentDetails) {
  let newComment=getNewCommentWithDate(commentDetails);
  const commentsStoragePath='./data/comments.txt';
  const commentsInPublicPath='./public/js/comments.js'
  storeInCommentsStorage(commentsStoragePath,commentsInPublicPath,newComment);
};

const writeInCommentStorage=function (commentsStoragePath,commentList) {
  let commentToStore=JSON.stringify(commentList,null,2);
  fs.writeFile(commentsStoragePath,commentToStore,()=>{});
};

const writeInPublicStorage=function (commentsInPublicPath,commentList) {
  let commentToStore='let commentList='+JSON.stringify(commentList);
  fs.writeFile(commentsInPublicPath,commentToStore,()=>{});
};

const redirectToPage=function (res,location){
  const redirectLocation={'Location':location};
  res.writeHead(302,redirectLocation);
  res.end();
};

exports.storeNewComment=storeNewComment;
