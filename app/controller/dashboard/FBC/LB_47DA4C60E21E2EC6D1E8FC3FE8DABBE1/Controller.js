Ext.define('Form.controller.dashboard.FBC.LB_47DA4C60E21E2EC6D1E8FC3FE8DABBE1.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['dashboard.FBC.LB_47DA4C60E21E2EC6D1E8FC3FE8DABBE1.View'],
		   	models: ['dashboard.FBC.LB_47DA4C60E21E2EC6D1E8FC3FE8DABBE1.Model'],
		   	stores: ['dashboard.FBC.LB_47DA4C60E21E2EC6D1E8FC3FE8DABBE1.Store'],
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