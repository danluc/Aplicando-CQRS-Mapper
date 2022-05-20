var codigo = document.currentScript.getAttribute('data-form');
console.log("DANIEL LUCAS " + codigo);
t = [15];
root = document.getElementById("form-doacao-fs");
cw = root.clientWidth - 95;
h = 800;
for(i=0; i<1; i++) { l = Math.floor(t[i]/(cw/9))+1; h +=49;
	if(cw <= 154) h+=20; h += (l*15) + ((l-1)*5);
}
root.setAttribute("style", "max-width: 100%;");
ifrm = document.createElement("IFRAME"); ifrm.setAttribute("src", "https://fundacaosara.org.br/sistemas/doacoes/formulario/" + codigo);
ifrm.setAttribute("id", "symplaw");
ifrm.setAttribute("frameborder", "0");
ifrm.setAttribute("vspace", "0");
ifrm.setAttribute("hspace", "0");
ifrm.setAttribute("marginheight", "0");
ifrm.setAttribute("marginwidth", "5");
ifrm.style.overflow = "hidden!important";
if(root.getAttribute("height") == "auto" || root.getAttribute("height") == null) {
	ifrm.style.width = "100%";
	ifrm.style.height = h +"px";
} else {
	if(root.getAttribute("height") != null) {
		ifrm.style.width = "100%";ifrm.style.height = root.getAttribute("height")+"px";
	}
}
while (root.firstChild) {
	root.removeChild(root.firstChild);
}
root.appendChild(ifrm);