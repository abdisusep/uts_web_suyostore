var store = new Vuex.Store({
	strict: true,
	state: {
	  	collections: []
	},
	mutations: {
		setCollections(state, collections){
		state.collections = collections
	  }
	},
	actions: {
		getCollections ({ commit }) {
		return new Promise((resolve, reject) => {
		  var xhr = new XMLHttpRequest();
		  xhr.open("GET", "https://api.jsonbin.io/b/5ea5d4f01299b93742368dc9");
		  xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
			  commit('setCollections', JSON.parse(xhr.response))
			  resolve(xhr.response);
			} else {
			  reject({
				status: this.status,
				statusText: xhr.statusText
			  });
			}
		  };
		  xhr.oneerror = function () {
			reject({
			  status: this.status,
			  statusText: this.statusText
			});	
		  };
		  xhr.send();
		})
	  }
	},
	getters: {
		collections: state => state.collections
	}
})

export const CollectionsComponent = {
	store,
	data () {
		return {
			keyword:''
		}
	},
	computed: {
		collections(){
			return this.$store.state.collections.filter((collection)=>{
				return collection.title.includes(this.keyword)
			})
		}
	},
	created() {
	  store.dispatch('getCollections')
	},
	methods: {
        formatPrice(value) {
            let val = (value/1)
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    },
	template: `
	<div>
		<section class="section-name bg-light padding-y-sm">
		  <div class="container">
		    <header class="section-heading">
		      <h3 class="section-title">Collections</h3>
		    </header>
		  </div>
		</section>

		<section class="section-content padding-y">
			<div class="container">

				<div class="row">
				  	<aside class="col-md-3">
				    
						<div class="card">
						  <article class="filter-group">
						    <header class="card-header">
						        <h6 class="title">Filter</h6>
						    </header>
						    <div class="filter-content collapse show" id="collapse_1" style="">
						      <div class="card-body">

						        <form class="pb-3">
						        <div class="input-group shadow-sm">
						          <input type="text" name="keyword" v-model="keyword" class="form-control bg-light border-0 shadow-none" placeholder="Search">
						          <div class="input-group-append">
						            <div class="btn btn-light bg-light border-0 shadow-none"><i class="fa fa-search"></i></div>
						          </div>
						        </div>
						        </form>
						        
						      </div>
						    </div>
						  </article>
						</div>

				 	</aside>
				  	<main class="col-md-9">
					    <div class="row">

					      	<div v-for="collection in collections" class="col-md-4 mb-4">
								<div class="card">
									<div class="card-header p-0 bg-white border-0">
										<img :src=" 'images/collections/' +collection.image" class="w-100 mt-4">
									</div>
									<div class="card-body">
										<a href="#" class="text-dark">{{ collection.title }}</a>
										<div class="mt-2 mb-2">
											<span class="price">Rp{{ formatPrice(collection.price) }}</span>
										</div> 
										<router-link :to="'/collection/' + collection.id" class="btn btn-block btn-primary">Detail</router-link>
									</div>
						        </div>	
					      	</div> 

					    </div> 
					 </main> 

				</div>

			</div>
		</section>
	</div>
	`,
}