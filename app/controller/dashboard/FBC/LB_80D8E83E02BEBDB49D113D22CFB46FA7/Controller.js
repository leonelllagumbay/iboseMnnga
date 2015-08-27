Ext.define('Form.controller.dashboard.FBC.LB_80D8E83E02BEBDB49D113D22CFB46FA7.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['dashboard.FBC.LB_80D8E83E02BEBDB49D113D22CFB46FA7.View'],
		   	models: ['dashboard.FBC.LB_80D8E83E02BEBDB49D113D22CFB46FA7.Model'],
		   	stores: ['dashboard.FBC.LB_80D8E83E02BEBDB49D113D22CFB46FA7.Store'],
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