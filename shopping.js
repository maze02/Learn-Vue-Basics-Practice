const app = new Vue ({
    el:'#app',
    data:{
        product: 'Socks', 
        description: 'Green sock with red frogs',
        image: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
        link:"https://www.google.com/search?q=socks&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjFs7WtmevzAhWfA2MBHaRrBLUQ_AUoAXoECAEQAw&biw=1536&bih=763&dpr=1.25",
        inStock: false,
        inventory: 10,
        onSale: true,
        details:["80% cotton", "20% polyester", "Gender-neutral"],
        sizes:["XL", "L", "M", "S", "XS"]
    }
});


