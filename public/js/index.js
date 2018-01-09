let hideImage = function () {
  document.getElementById('waterJug').style.visibility="hidden";
  setTimeout(function () {
    document.getElementById('waterJug').style.visibility="visible";
  },1000);
};
