var store = new Vuex.Store({
	strict: true,
	state: {
	  	blogs: []
	},
	mutations: {
		setBlogs(state, blogs){
		state.blogs = blogs
	  }
	},
	actions: {
		getBlogs ({ commit }) {
		return new Promise((resolve, reject) => {
		  var xhr = new XMLHttpRequest();
		  xhr.open("GET", "https://api.jsonbin.io/b/5ea5dadf2940c704e1df0c9a");
		  xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
			  commit('setBlogs', JSON.parse(xhr.response))
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
		collections: state => state.blogs
	}
})

export const BlogComponent = {
	store,
	props:['id'],
    computed: {
		blog(){
			return this.$store.state.blogs.filter((blog)=>{
				return blog.id === parseInt(this.id)
			})[0]
		}
	},
	created() {
	  store.dispatch('getBlogs')
	},
	template: `
	<div v-if="blog">
	
		<section class="section-name bg-light padding-y-sm">
			<div class="container">
				<header class="section-heading">
					<h3 class="section-title">Blog Detail</h3>
				</header>
			</div>
		</section>

		<section class="section-name bg-white padding-y-sm">
			<div class="container">
				<div class="row mb-4">
					<div class="col-12">
						<router-link to="/blogs" class="btn shadow-sm"><i class="fa fa-angle-left"></i> Back</router-link>
				  	</div>
				</div>
				<div class="row">
				
					<div class="col-lg-4 col-12">
						<img :src=" 'images/blog/' + blog.image " class="rounded w-100">
					</div>	
					<div class="col-lg-8 col-12">
						<h3 class="text-justify">{{ blog.title }}</h3>
						<p class="text-justify">{{ blog.content }}</p>
					</div>	

				</div>
				
			</div>	
		</section>

	</div>
	`,
}