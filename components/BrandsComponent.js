var store = new Vuex.Store({
	strict: true,
	state: {
	  	brands: []
	},
	mutations: {
	  setBrands(state, brands){
		state.brands = brands
	  }
	},
	actions: {
	  getBrands ({ commit }) {
		return new Promise((resolve, reject) => {
		  var xhr = new XMLHttpRequest();
		  xhr.open("GET", "https://api.jsonbin.io/b/5ea5d1612940c704e1df069b");
		  xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
			  commit('setBrands', JSON.parse(xhr.response))
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
		brands: state => state.brands
	}
})

export const BrandsComponent = {
	store,
	computed: {
		brands(){
			return store.getters.brands
		}
	},
	created() {
	  store.dispatch('getBrands')
	},
	template: `
	<div>
		<section class="section-name bg-light padding-y-sm">
		  	<div class="container">
				<header class="section-heading">
					<h3 class="section-title">Brands</h3>
				</header>
			</div>
		</section>

		<section class="section-name bg-white padding-y-sm">
		  <div class="container">
		    <div class="row">

		      <div v-for="brand in brands" class="col-lg-3 col-6">
		        <router-link :to="'/brand/'+brand.id">
		          <figure class="box item-logo border-0 shadow-sm">
		            <img :src=" 'images/brands/' + brand.image">
		            <figcaption class="border-top pt-3 text-dark">{{ brand.name }}</figcaption>
		          </figure>
		        </router-link>
		      </div>
		      
		    </div>
		  </div>
		</section>

	</div>
	`,
}