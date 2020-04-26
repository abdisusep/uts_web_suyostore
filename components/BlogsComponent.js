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

export const BlogsComponent = {
    store,
    computed: {
		blogs(){
			return store.state.blogs
		}
	},
	created() {
	  store.dispatch('getBlogs')
	},
	methods: {
		truncate(value){
			return value.substring(0, 80) + '...';
		}
	},
	template: `
	<div>
	
		<section class="section-name bg-light padding-y-sm">
			<div class="container">
				<header class="section-heading">
					<h3 class="section-title">Blogs</h3>
				</header>
			</div>
		</section>

		<section class="section-name bg-white padding-y-sm">
			<div class="container">
				<div class="row">
				  <div  v-for="blog in blogs" class="col-lg-4 col-12">
				    <div class="card mb-4 border-0 shadow-sm">
				      <img :src=" 'images/blog/' + blog.image" class="card-img-top" alt="...">
				      <div class="card-body">
				        <h5 class="card-title">{{ blog.title }}</h5>
                        <p class="card-text text-justify">{{ truncate(blog.content) }}</p>
                        <router-link :to="'/blog/'+blog.id"  class="btn btn-light">Read more <i class="fa fa-angle-right"></i></router-link>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		</section>

	</div>
	`,
}