new Vue({
	el: "#app",
	data: {
		totalMoney: 0,
		productList: [],
		checkAllFlag: false,
		deFlag: false,
		curProduct: ''
	},
	//局部过滤器
	filters: {
		formatMoney: function (value) {
			return "￥" + value.toFixed(2);
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.cartView();
		});
	},
	methods: {
		cartView: function () {
			// let _this = this; es6里函数内部this指向全局
			this.$http.get('data/cart.json', {"id": 123}).then(res => {    //res=>{} === function (res){}
				this.productList = res.body.result.productList;
				// console.log(this.productList)
			});
		},
		changeMoney: function (product,way) { //计算数量改变金额
			if (way > 0) {
				product.productQuentity++;
			} else {
				product.productQuentity--;
				if (product.productQuentity < 1) {
					product.productQuentity = 1;
				}
			}
			this.calcTotalPrice();
		},
		selectedProduct: function (item) { //单选
			if (typeof item.checked == 'undefined') {
				// Vue.set(item, "checked", true);
				this.$set(item, "checked", true);
			}else {
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
		},
		checkAll: function () {  //全选
			this.checkAllFlag = !this.checkAllFlag;
			var _this = this;
			this.productList.forEach(function (item,index) {
				if (typeof item.checked == 'undefined') {
					_this.$set(item, "checked", _this.checkAllFlag);
				}else {
					item.checked = _this.checkAllFlag;
				}
			});
			this.calcTotalPrice();
		},
		calcTotalPrice: function () {  //计算总金额
			var _this = this;
			this.totalMoney = 0;
			this.productList.forEach(function (item,index) {
				if(item.checked) {
					_this.totalMoney += item.productPrice * item.productQuentity;
				}
			});
		},
		//删除商品
		delConfirm: function (item) {
			this.deFlag = true;
			this.curProduct = item;
		},
		delProduct: function () {
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index, 1);
			this.deFlag = false;
		}
	}
});
//全局过滤器，插入到公共js文件
Vue.filter("money", function (value,type) {
	return "￥" + value.toFixed(2) + type;
});