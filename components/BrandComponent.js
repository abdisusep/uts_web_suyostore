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

export const BrandComponent = {
	store,
	props:['id'],
	computed: {
		brand(){
			return this.$store.state.brands.filter((brand)=>{
				return brand.id === parseInt(this.id)
			})[0]
		}
	},
	created() {
	  store.dispatch('getBrands')
	},
	template: `
	<div v-if="brand">

		<section class="section-name bg-light padding-y-sm">
		  <div class="container">
		    <header class="section-heading">
			  <h3 class="section-title">{{ brand.name }}</h3>
		    </header>
		  </div>
		</section>

		<section class="section-name bg-white padding-y-sm">
			<div class="container">
				<div class="row mb-4">
					<div class="col-12">
						<router-link to="/brands" class="btn shadow-sm"><i class="fa fa-angle-left"></i> Back</router-link>
				  	</div>
				</div>
				<div class="row">
						
					<div class="col-lg-4 col-12">
						<figure class="box item-logo border-0 shadow-sm">
							<img :src=" 'images/brands/' + brand.image">
						</figure>
					</div>

					<div class="col-lg-8 col-12">
						<p>{{ brand.description }}</p>
					</div> 
					
				</div>
			</div>	
		</section>
		
	</div>
	`,
}