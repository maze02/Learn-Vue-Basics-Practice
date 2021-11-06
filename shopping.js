//global channel though we we can send info - i.e. to transport passengers (state) throughout our app
const eventBus = new Vue();

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
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else 
                :class="{ outOfStock: !inStock}">Out of Stock</p>
            <!-- v-show more performant option than removing it from the dom entirely-->
            <!-- <p v-show="inStock">testing toggle</p> -->
            <p v-if="onSale">On Sale!</p>
            <p>{{sale}}</p>
            <!--<product-details :details="details"></product-details>-->
            <info-tabs :shipping='shipping' :details='details'></info-tabs>
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
            <div>
                <button v-on:click="addToCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock}">Add to Cart</button>
                <button v-on:click="removeFromCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock}">Remove From Cart</button>
            </div>
            <!--
            <button v-on:click="addToCart">Duplicate Cart Amount</button>
            <button @click="decrement">Decrement Cart Value</button>
            -->
        </div>
        <div>
            <product-tabs :reviews='reviews'></product-tabs>
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
            ],
            reviews: []
        }
    },
    methods:{
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        removeFromCart: function (){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
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
    },
    //lifecycle hook which contains code you want to run as soon as the component is mounted to the the dom
    mounted(){
        //listening for the review-submitted event & it will take our product
       // review and push it into the reviews array variable.
        eventBus.$on('review-submitted', productReview =>{
            this.reviews.push(productReview)
        })
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

/*This is where the product reviews are going to happen
we want whatever the user types into the input to be bound to 
the name data
v-bind -> is only for 1 way binding -> from the data to the template (i.e.  name: null  => input)
but now whatever user inputs to be bound to our data
i.e. want to add a dimension of data-binding from the template to the data
vue's v-model directive gives this functionality called 2 way data-binding
now whenever sth is entered into the input, the data changes
& whenever the data changes, anywhere using that data, will update
*/
Vue.component('product-review', {
    template: `   
    <form class="review-form" @submit.prevent="onSubmit"> <!--stops page from refreshing when you submit-->
        <div>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p> 
        </div> 
<div>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating"> <!--.number modifier typecasts the input so only a number can be added -->
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>Would you recommend this product?</p>
      <div>
            <label for="yes">Yes</label>
            <input type="radio" id="yes" name="recommend" value="Yes" v-model="recommend">
      
      </div>
    
        <div>
            <label for="no">No</label>
            <input type="radio" id="no" name="recommend" value="No" v-model="recommend">
        </div>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
      </div>
    </form>
`,
    data(){
        return{
            name:null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit: function(){
            if(this.name && this.review && this.rating){
                let productReview = { //but where does this go?
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend:this.recommend
                }
                //sends this info to the parent component: the product component using the emit event
                eventBus.$emit('review-submitted', productReview) //here eventBus is a bit like the context api or useReducer hook
                //resets values whenever you submit the form
                this.name = null 
                this.review = null
                this.rating = null
                this.recommend = null
            }
            else{
                //Error array corrects errors if values not filled out
                if(!this.name) this.errors.push("Name required.");
                if(!this.review) this.errors.push("Review required.");
                if(!this.rating) this.errors.push("Rating required.");
                if(!this.recommend) this.errors.push("Recommendation required.");
            }
        }
    }
});

Vue.component('product-tabs', {
    props:{
        reviews:{
            type: Array,
            required: true
        }
    },
    template: `
    <div>
        <span class="tab"
              :class="{ activeTab : selectedTab === tab}"
              v-for="(tab, index) in tabs" 
              :key="index"
              @click="selectedTab = tab">
              {{ tab }} </span>
              <div>
              <div v-show="selectedTab === 'Reviews'">
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>Comment: {{ review.review }}</p>
                        <p>Product Recommended: {{ review.recommend }}</p>
                    </li>
                </ul>
              </div>
          </div>
          <product-review v-show="selectedTab ==='Make a Review'"></product-review>
    </div>`,
    data(){
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
});

Vue.component('info-tabs', {
    props:{
        shipping:{
            type: String|Number,
            required:true
        },
        details:{
            type: Array,
            required:true
        }
    },
    template:`
    <div>    
        <span class="tab"
            :class="{activeTab : selectedTab === tab}"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = tab">
            {{ tab }} </span>
        
        <div>
            <div v-show="selectedTab === 'Shipping'">
                <p>Shipping: {{shipping}}</p>
            </div>
            <div v-show="selectedTab === 'Detail'">
                <product-details :details="details"></product-details>
            </div>
        </div>
    </div>

    `,
    data(){
        return {
            tabs: ['Shipping', 'Detail'],
            selectedTab: 'Shipping'
        }
    }
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
        },
        removeFromCart :  function(id){
          console.log("Hey I'm in removeFromCart and the id is:" + id);
          const indexRes = this.cart.findIndex(item => item === id); 
          console.log("Here  is indexRes: " + indexRes + " Here is the cart" + JSON.stringify(this.cart)) ;
          if(indexRes === 0 || indexRes !== -1){
              this.cart.splice(indexRes, 1)
          }  
        }
    }
});


/*
record of errors:
1. the components need to be nested in the   <div id="app">
2. Remember to add a comma, between the different properties in an object
3. Components must be above the vue app instance
*/

