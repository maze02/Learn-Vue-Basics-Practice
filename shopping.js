//creating a new component
Vue.component('product', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    }
    ,
    template: `
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="description">
        </div>
        <div class="product-info">
            <p>User is premium: {{premium}}</p>
            <p>Shipping: {{shipping}}</p>
            <h1>{{product}}</h1>
            <a :href="link">View more socks</a>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else 
                :class="{ outOfStock: !inStock}">Out of Stock</p>
            <!-- v-show more performant option than removing it from the dom entirely-->
            <p v-show="inStock">testing toggle</p>
            <p v-if="onSale">On Sale!</p>
            <p>{{sale}}</p>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div v-for="variant in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(variant.variantImage)">
            </div>
            <h2>Sizes</h2>
            <p v-for="size in sizes"
                >{{size}}</p>
            <button v-on:click="cart += 1" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock}">Add to Cart</button>
            <!--
            <button v-on:click="addToCart">Duplicate Cart Amount</button>
            <button @click="decrement">Decrement Cart Value</button>
            -->
            <div class="cart">
                <p>Cart({{cart}})</p>
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            product: 'Socks', 
            description: 'Green sock with red frogs',
            image: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
            link:"https://www.google.com/search?q=socks&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjFs7WtmevzAhWfA2MBHaRrBLUQ_AUoAXoECAEQAw&biw=1536&bih=763&dpr=1.25",
            inStock: false,
            inventory: 0,
            onSale: true,
            details:["80% cotton", "20% polyester", "Gender-neutral"],
            sizes:["XL", "L", "M", "S", "XS"],
            cart: 0,
            brand: "Levis" ,
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
        }
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

    }, 
    computed:{
        sale(){
            if(this.onSale){
            return `${this.brand} ${this.product} is on sale!`;
            }else{
            return `${this.brand} ${this.product} is not sale!`;    
            };
        },
        shipping(){
            if(this.premium){//not props premium
                return "Free"
            } else {
                return 2.99
            }
        }
    }
});


const app = new Vue ({
    el:'#app',
    data:{
        premium: true
    }
});

/*
record of errors:
1. the components need to be nested in the   <div id="app">

*/
