// BOTON MENU -----------------------------------------
document.querySelector('.fa-bars').addEventListener('click',()=>{
    document.querySelector('.nav-menu').classList.toggle('show');
});

// --- BOTONES MENU ------------------------------------------------------

document.querySelector('.name-principal').addEventListener('click',()=>{
    document.querySelector('.content-iam-one').classList.remove('show'),
    document.querySelector('.content-cosas-hago').classList.remove('show'),
    document.querySelector('.blog').classList.remove('show'),
    document.querySelector('.content-home').classList.add('show');
});

document.querySelector('.link-quien-soy').addEventListener('click',()=>{
    document.querySelector('.content-iam-one').classList.add('show'),
    document.querySelector('.content-cosas-hago').classList.remove('show'),
    document.querySelector('.blog').classList.remove('show'),
    document.querySelector('.content-home').classList.remove('show'),
    document.querySelector('.nav-menu').classList.remove('show');
});

document.querySelector('.link-cosas-hago').addEventListener('click',()=>{
    document.querySelector('.content-iam-one').classList.remove('show'),
    document.querySelector('.content-cosas-hago').classList.add('show'),
    document.querySelector('.blog').classList.remove('show'),
    document.querySelector('.content-home').classList.remove('show'),
    document.querySelector('.nav-menu').classList.remove('show');
});

document.querySelector('.link-blogp').addEventListener('click',()=>{
    document.querySelector('.content-iam-one').classList.remove('show'),
    document.querySelector('.content-cosas-hago').classList.remove('show'),
    document.querySelector('.blog').classList.add('show'),
    document.querySelector('.content-home').classList.remove('show'),
    document.querySelector('.nav-menu').classList.remove('show');
});

//------------CREAR GALERIA DE IMAGENES ------------------------------------
document.querySelector('.link-cosas-hago').addEventListener('click',() => {
    var x = document.querySelector(".content-foto");
     if(x==null){
         for(i=1;i<=21; i++){
 
            let div = document.createElement("div");
            div.setAttribute("class", "content-foto");
            document.querySelector(".gallery").appendChild(div);

            let a = document.createElement("a");
            a.setAttribute("class",`linkfotos${i}`);
            a.setAttribute("href",`./images/${i}.jpg`);
            a.setAttribute("target","_blank");
            document.querySelector(".content-foto").appendChild(a);

            let img = document.createElement("img");
            img.setAttribute("src",`./images/${i}.jpg`);
            document.querySelector(`.linkfotos${i}`).appendChild(img);
         }
     }
});


// ------SLIDER----QUIEN SOY--------------------------------------------------
class IndexForSiblings{
    static get(el){
        let children = el.parentNode.children;
        for (var i = 0; i < children.length; i++){
            let child = children[i];
            if(child == el) return i;
        }
    }
}
class Slider{
    constructor(selector, movimiento=true){
        this.move = this.move.bind(this);
        this.moveByButton = this.moveByButton.bind(this);
        this.slider = document.querySelector(selector);
        this.itemsCount = this.slider.querySelectorAll(".container > *").length;
        this.interval = null;
        this.contador = 0;
        this.movimiento = movimiento;
        this.start();
        this.buildControls();
        this.bindEvents();
    }
    start() {
        if(!this.movimiento) return;
       this.interval = window.setInterval(this.move,3000);
    }

    restart() {
        if(this.interval) window.clearInterval(this.interval);
        this.start();
    }
    bindEvents() {
        this.slider.querySelectorAll(".controls li")
        .forEach(item => {
            item.addEventListener("click", this.moveByButton)
        });

    }
    moveByButton(ev){
        let index = IndexForSiblings.get(ev.currentTarget);
        this.contador = index;
        this.moveTo(index);
        this.restart();
    }
    buildControls(){
        for(var i=0;i < this.itemsCount; i++){
            let control = document.createElement("li");
            if(i==0) control.classList.add("active");
            this.slider.querySelector(".controls ul").appendChild(control);
        }
    }
    move() {
        this.contador++;
        if(this.contador > this.itemsCount -1) this.contador=0;
        this.moveTo(this.contador);
    }
    resetIndicator(){
        this.slider.querySelectorAll(".controls li.active")
            .forEach(item => item.classList.remove("active"));
    }
    moveTo(index){
        let left = index * 100;
        this.resetIndicator();
        this.slider.querySelector(".controls li:nth-child("+(index+1)+")").classList.add("active");
        this.slider.querySelector(".container").style.left = "-"+left+"%";
    }
}
(function(){
    new Slider(".slider", true);
})();
