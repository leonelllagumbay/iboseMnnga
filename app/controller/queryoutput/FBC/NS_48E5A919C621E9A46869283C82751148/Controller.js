Ext.define('Form.controller.queryoutput.FBC.NS_48E5A919C621E9A46869283C82751148.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['queryoutput.FBC.NS_48E5A919C621E9A46869283C82751148.View'],
		   	models: ['queryoutput.FBC.NS_48E5A919C621E9A46869283C82751148.Model'],
		   	stores: ['queryoutput.FBC.NS_48E5A919C621E9A46869283C82751148.Store'],
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