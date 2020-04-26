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

export const CollectionComponent = {
	store,
	props:['id'],
	computed: {
		collection(){
			return this.$store.state.collections.filter((collection)=>{
				return collection.id === parseInt(this.id)
			})[0]
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
	<div v-if="collection">
		<section class="section-name bg-light padding-y-sm">
		  <div class="container">
		    <header class="section-heading">
		      <h3 class="section-title">Detail Collection</h3>
		    </header>
		  </div>
		</section>

		<section class="section-name bg-white padding-y-sm">
			<div class="container">
				<div class="row mb-4">
					<div class="col-12">
						<router-link to="/collections" class="btn shadow-sm"><i class="fa fa-angle-left"></i> Back</router-link>
				  	</div>
				</div>
				<div class="row">
				
					<div class="col-lg-4 col-12">
						<div class="card">
							<div class="card-body">
								<img :src=" 'images/collections/' + collection.image" class="w-100">
							</div>
						</div>
					</div>	

					<div class="col-lg-8 col-12">
						<h3>{{ collection.title }}</h3>
						<p class="mt-3"><b>Specification : </b> <br> {{ collection.description }}</p>
						<div class="mt-4">
							<span><b>Rp{{ formatPrice(collection.price) }}</b></span> <br>	
							<div class="mt-2">
								<router-link :to="'/checkout/' + collection.id" class="btn btn-dark p-2">Simulasi Pembayaran <i class="fa fa-angle-right"></i></router-link>
							</div>
						</div>
					</div> 

					
					
				</div>
				
			</div>	
		</section>

	</div>
	`,
}