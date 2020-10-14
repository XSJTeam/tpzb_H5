$(function(){
	setRem();
	$(window).resize(function(){
		setRem();
	}); 
});
function setRem(){
	var win_width=document.documentElement.clientWidth||window.innerWidth,
		psSize=win_width/750;
	window.FS=(psSize>1?1:psSize) * 100;
	document.documentElement.style.fontSize=window.FS + 'px';
}