Ext.define('Form.controller.dashboard.FBC.LB_47C95D7EBBAFB822F311290ABC6A9255.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['dashboard.FBC.LB_47C95D7EBBAFB822F311290ABC6A9255.View'],
		   	models: ['dashboard.FBC.LB_47C95D7EBBAFB822F311290ABC6A9255.Model'],
		   	stores: ['dashboard.FBC.LB_47C95D7EBBAFB822F311290ABC6A9255.Store'],
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