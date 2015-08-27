Ext.define('Form.controller.dashboard.FBC.LB_47DF26239039470AA25CD1E875045718.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['dashboard.FBC.LB_47DF26239039470AA25CD1E875045718.View'],
		   	models: ['dashboard.FBC.LB_47DF26239039470AA25CD1E875045718.Model'],
		   	stores: ['dashboard.FBC.LB_47DF26239039470AA25CD1E875045718.Store'],
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