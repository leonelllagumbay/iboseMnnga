Ext.define('Form.controller.dashboard.FBC.LB_47819023E09D8001CA86F5D183B3ADA8.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['dashboard.FBC.LB_47819023E09D8001CA86F5D183B3ADA8.View'],
		   	models: ['dashboard.FBC.LB_47819023E09D8001CA86F5D183B3ADA8.Model'],
		   	stores: ['dashboard.FBC.LB_47819023E09D8001CA86F5D183B3ADA8.Store'],
		   		init: function() {
		   			this.control({
		   				'panel': {
		   					render: this.initPanel
		   				}
		   			})
		   		},
		   		initPanel: function(b) {
		   			console.log('init panel');
		   		}
		})