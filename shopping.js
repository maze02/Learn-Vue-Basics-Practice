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
        sizes:["XL", "L", "M", "S", "XS"],
        cart: 0, 
        variants:[
            {
            variantId: 2234,
            variantColor: 'green',
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg'
            },
            {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg'
        }
        ]
    },
    methods:{
        addToCart: function () {
            this.cart += 2;
        },

        updateProduct: function(variantImage){
            this.image= variantImage;
        },

        decrement: function(){
            this.cart--;
        }
        /*instead of writing the functions as anonymous functions
        can write them using ES6 - but not all browsers
        support this feature
        
        addToCart(){
            this.cart +=1
        },

        updateProduct(variantImage){
            this.image = variantImage
        }
    
        */

    }
});

/*
record of errors:


*/
