let cart = JSON.parse(localStorage.getItem("bocaCart") || "{}");
let selectedCategory = "Todos";
let deliveryMethod = "retirada";

const money = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const save = () => localStorage.setItem("bocaCart", JSON.stringify(cart));

function categories(){
  const names = ["Todos", ...new Set(PRODUCTS.map(p=>p.category))];
  document.querySelector("#categories").innerHTML = names.map(c =>
    `<button class="cat ${c===selectedCategory?"active":""}" onclick="setCategory('${c}')">${c}</button>`
  ).join("");
}
function setCategory(c){selectedCategory=c; categories(); renderProducts();}
function renderProducts(){
  const list=PRODUCTS.filter(p=>selectedCategory==="Todos"||p.category===selectedCategory);
  document.querySelector("#catalog").innerHTML=list.map(p=>`
    <article class="product">
      <img src="${p.image}" alt="${p.name}">
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <span class="price">${money(p.price)}</span>
        <button class="add" onclick="add(${p.id})">ADICIONAR</button>
      </div>
    </article>`).join("");
}
function add(id){cart[id]=(cart[id]||0)+1;save();renderCart();openCart();}
function change(id,d){cart[id]+=d;if(cart[id]<=0)delete cart[id];save();renderCart();}
function cartData(){return Object.entries(cart).map(([id,q])=>({p:PRODUCTS.find(x=>x.id==id),q}));}
function total(){return cartData().reduce((s,x)=>s+x.p.price*x.q,0)}
function renderCart(){
  const data=cartData(), count=data.reduce((s,x)=>s+x.q,0);
  document.querySelector("#cartCount").textContent=count;
  document.querySelector("#cartTotal").textContent=money(total());
  document.querySelector("#checkoutTotal").textContent=money(total());
  document.querySelector("#checkoutItemsCount").textContent=`${count} ${count===1?"item":"itens"}`;
  document.querySelector("#cartItems").innerHTML=data.length?`<div class="cart-list">${data.map(x=>`
    <div class="cart-item">
      <img src="${x.p.image}">
      <div class="cart-item-info"><strong>${x.p.name}</strong><span>${money(x.p.price)}</span>
        <div class="qty"><button onclick="change(${x.p.id},-1)">−</button><b>${x.q}</b><button onclick="change(${x.p.id},1)">+</button></div>
      </div>
    </div>`).join("")}</div>`:`<div class="empty">Seu pedido está vazio.</div>`;
}
function openCart(){document.querySelector("#cartDrawer").classList.remove("hidden")}
function closeCart(){document.querySelector("#cartDrawer").classList.add("hidden")}
function openCheckout(){
  if(!cartData().length){alert("Adicione pelo menos um produto.");return}
  closeCart();document.querySelector("#checkoutModal").classList.remove("hidden");
}
function buildWhatsApp(){
  const name=document.querySelector("#firstName").value.trim();
  if(!name){alert("Informe seu primeiro nome.");return}
  let msg=`Olá! Sou ${name} e quero fazer este pedido:%0A%0A`;
  cartData().forEach(x=>msg+=`${x.q}x ${x.p.name} — ${money(x.p.price*x.q)}%0A`);
  msg+=`%0AForma: ${deliveryMethod==="entrega"?"Entrega":"Retirada"}%0A`;
  if(deliveryMethod==="entrega"){
    const a=document.querySelector("#address").value.trim(), n=document.querySelector("#number").value.trim(), b=document.querySelector("#neighborhood").value.trim(), c=document.querySelector("#complement").value.trim();
    if(!a||!n||!b){alert("Preencha endereço, número e bairro.");return}
    msg+=`Endereço: ${a}, ${n} — ${b}${c?` — ${c}`:""}%0A`;
  }
  msg+=`%0ATotal: ${money(total())}%0A%0AQuero confirmar o pedido.`;
  // Número comercial real, formato internacional (Brasil +55, DDD 82).
  const whatsappNumber="5582987638446";
  window.open(`https://wa.me/${whatsappNumber}?text=${msg}`,"_blank");
}

document.querySelector("#openCart").onclick=openCart;
document.querySelector("#closeCart").onclick=closeCart;
document.querySelector("#closeCartBtn").onclick=closeCart;
document.querySelector("#checkoutBtn").onclick=openCheckout;
document.querySelector("#closeCheckout").onclick=()=>document.querySelector("#checkoutModal").classList.add("hidden");
document.querySelectorAll(".choice").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll(".choice").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
  deliveryMethod=btn.dataset.method;
  document.querySelector("#addressFields").classList.toggle("hidden",deliveryMethod!=="entrega");
});
document.querySelector("#whatsappBtn").onclick=buildWhatsApp;

categories();renderProducts();renderCart();
