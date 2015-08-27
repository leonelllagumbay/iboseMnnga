Ext.define('Form.controller.queryoutput.FBC.NS_48E70F48CE38988FAE729C963CBDA61C.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['queryoutput.FBC.NS_48E70F48CE38988FAE729C963CBDA61C.View'],
		   	models: ['queryoutput.FBC.NS_48E70F48CE38988FAE729C963CBDA61C.Model'],
		   	stores: ['queryoutput.FBC.NS_48E70F48CE38988FAE729C963CBDA61C.Store'],
		   		init: function() {
		   			this.control({
		   				'chart': {
		   					render: this.initChart
		   				}
		   			})
		   		},
		   		initChart: function(b) {
		   			console.log('init chart');
		   		}
		})