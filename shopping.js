const app = new Vue ({
    el:'#app',
    data:{
        product: 'Socks', 
        description: 'Green with red frogs'
    }
});

app.product = "I've changed the data";
