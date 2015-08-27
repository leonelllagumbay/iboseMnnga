Ext.define('Form.controller.theme.themecontroller', {
    extend: 'Ext.app.Controller',
	views: [
        'theme.themeView'
    ],
	models: [
	],
	stores: [
	],
	init: function() {
		
        this.control({
            
			'themeview button[action=x]': {  
			}
		});
     }	
});