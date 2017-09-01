var nbAtoms,tailleX,tailleY,temps,timer,bonneImage,perteEnCours,limite;
var fichier="hulot.png";
function demarre()
{
  nbAtoms=2;
  tailleX=document.getElementById("div1").offsetWidth-128;
  tailleY=document.getElementById("div1").offsetHeight-128;
  affiche();
}

function affiche()
{
  var x,y,img;
  for(var iAtom=0;iAtom<nbAtoms;iAtom++)
  {
    x=Math.floor(Math.random()*tailleX);
    y=Math.floor(Math.random()*tailleY);
    img=document.createElement("img");
    img.src=fichier;
    img.style.left=x+"px";
    img.style.top=y+"px";
    img.style.position="absolute";
    img.onclick=perdre;
    document.getElementById("div1").appendChild(img);
    var clone=img.cloneNode(true);
    clone.onclick=perdre;
    document.getElementById("div2").appendChild(clone);
  }
  x=Math.floor(Math.random()*tailleX);
  y=Math.floor(Math.random()*tailleY);
  img=document.createElement("img");
  img.src=fichier;
  img.style.left=x+"px";
  img.style.top=y+"px";
  img.style.position="absolute";
  img.onclick=gagner;
  bonneImage=img;
  document.getElementById("div1").appendChild(img);
  perteEnCours=false;
}

function gagner()
{
  document.getElementById("info").innerHTML="Bravo !";
  nbAtoms++;
  efface();
  affiche();
  temps=limite;
  clearInterval(timer);
  timer=setInterval(avanceTemps,100);
}

function avanceTemps()
{
  temps--;
  document.getElementById("timer").innerHTML=(temps-temps%10)/10+"."+temps%10;
  if(temps==0)
  {
    document.getElementById("timer").innerHTML="Plus de temps";
    perdre();
  }
}

function efface()
{
  var d1=document.getElementById("div1");
  while(d1.firstChild)
  {
    d1.removeChild(d1.firstChild);
  }
  var d2=document.getElementById("div2");
  while(d2.firstChild)
  {
    d2.removeChild(d2.firstChild);
  }
}

function clignoter()
{
  if(bonneImage.style.visibility=="hidden")
  {
    bonneImage.style.visibility="visible";
  }
  else
  {
    bonneImage.style.visibility="hidden";
  }
}

function setDiff(d)
{
  info=document.getElementById("difficulte");
  switch(d)
  {
    case 0:
      info.innerHTML="Difficulté : Aisé (5s)";
      limite=50;
      break;
    case 1:
      info.innerHTML="Difficulté : Normal (4s)";
      limite=40;
      break;
    case 2:
      info.innerHTML="Difficulté : Ardu (3s)";
      limite=30;
      break;
  }
}

function perdre()
{
  if(!perteEnCours)
  {
    perteEnCours=true;
    clearInterval(timer);
    document.getElementById("info").innerHTML="Perdu";
    document.getElementById("timer").innerHTML=(limite/10)+".0";
    bonneImage.onclick="";
    var clignotement=setInterval(clignoter,100);
    setTimeout(function(){
      clearInterval(clignotement);
      efface();
      demarre();
    },2000);
  }
}

function changeTete()
{
  if(fichier=="hulot.png"){
    fichier="kappa.png";
  }
  else {
    fichier="hulot.png";
  }
  if(nbAtoms==2)
  {
    efface();
    demarre();
  }
}

/*function randImage()
{
  switch(Math.floor(Math.random()*3))
  {
    case 0:
      return "atom.png";
    case 1:
      return "hulot.png";
    case 2:
      return "kappa.png";
  }
}*/
