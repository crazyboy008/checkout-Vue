new Vue({
	el: '.container',
	data: {
		addressList: [],
		limitNum: 3,
		currentIndex: 0,
		shippingMethod: 1
	},
	mounted: function () {
		this.$nextTick(function() {
			this.getAddressList();
		});
	},
	computed: {
		filterAddress: function () {
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods: {
		getAddressList: function () {
			var _this = this;
			this.$http.get("data/address.json").then(function(response) {
				var res = response.data;
				if (res.status == "1") {
					_this.addressList = res.result;
				}
			});
		},
		// loadMore: function () { 给more添加@click="loadMore()" 也行
		// 	this.limitNum = this.addressList.length;
		// 	// console.log(this.addressList.length)
		// }
		setDefault: function (addressId) {
			this.addressList.forEach(function(address,index) {
				if (address.addressId == addressId) {
					address.isDefault = true;
				} else {
					address.isDefault = false;
				}
			});
		},
		delProduct: function (item) {
			var index = this.addressList.indexOf(item);
			this.addressList.splice(index, 1);
		}
	}
});