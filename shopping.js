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
            <img :src="image" />
        </div>
        <div class="product-info">
            <h1>{{product}}</h1>
            <a :href="link">View more socks</a>
            <p>User is premium: {{premium}}</p>
            <p>Shipping: {{shipping}}</p>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else 
                :class="{ outOfStock: !inStock}">Out of Stock</p>
            <!-- v-show more performant option than removing it from the dom entirely-->
            <!-- <p v-show="inStock">testing toggle</p> -->
            <p v-if="onSale">On Sale!</p>
            <p>{{sale}}</p>
            <product-details :details="details"></product-details>
                <div class="color-box"
                    v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    :style="{backgroundColor: variant.variantColor}"
                    @mouseover="updateProduct(index)"
                >
                </div>
            <h2>Sizes</h2>
            <p v-for="size in sizes"
                >{{size}}</p>
            <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock}">Add to Cart</button>
            <!--
            <button v-on:click="addToCart">Duplicate Cart Amount</button>
            <button @click="decrement">Decrement Cart Value</button>
            -->
        </div>
    </div>
    `,
    data(){
        return{
            product: 'Socks', 
            description: 'Green sock with red frogs',
            details:["80% cotton", "20% polyester", "Gender-neutral"],
            link:"https://www.google.com/search?q=socks&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjFs7WtmevzAhWfA2MBHaRrBLUQ_AUoAXoECAEQAw&biw=1536&bih=763&dpr=1.25",
            selectedVariant: 0,
            inventory: 100,
            onSale: true,
            sizes:["XL", "L", "M", "S", "XS"],
            brand: "Levis" ,
            variants:[
                {
                variantId: 2234,
                variantQuantity: 15,
                variantColor: 'green',
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg'
                },
                {
                variantId: 2235,
                variantQuantity: 7,
                variantColor: 'blue',
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg'
                }
            ]
        }
    },
    methods:{
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        updateProduct: function(index){
            this.selectedVariant = index
        }
        /*
        decrement: function(){
            this.cart--;
        }
        instead of writing the functions as anonymous functions
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
        title() {
            return this.brand + ' ' + this.product
          },
        image() {
        return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
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


Vue.component('product-details', {
props:{
    details:{
        type: Array,
        required: true
    }
},
template:`
    <ul>
    <li v-for="detail in details">{{detail}}</li>
    </ul>
`
});

const app = new Vue ({
    el:'#app',
    data:{
        premium: true,
        cart: [],
    },
    methods:{
        updateCart : function(id){
            this.cart.push(id)
        }
    }
});

/*
record of errors:
1. the components need to be nested in the   <div id="app">
2. Remember to add a comma, between the different properties in an object
*/

