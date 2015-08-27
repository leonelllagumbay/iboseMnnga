Ext.define('Form.controller.liveboard.liveboardcontroller', {
    extend: 'Ext.app.Controller',
	views: [
        'liveboard.liveboardlistView',
        'liveboard.liveboardlistdetailView',
        'liveboard.liveboarditemView',
        'liveboard.liveboarditemdetailView'
    ],
	models: [
	    'liveboard.liveboardlistModel',
	    'liveboard.liveboarditemModel',
	    'liveboard.queryLookupModel'
	],
	stores: [
	    'liveboard.liveboardlistStore',
	    'liveboard.liveboarditemStore',
	    'query.yesno',
	    'liveboard.queryLookupStore'
	],
	
	onLaunch: function() {
	    var ds = this.getLiveboardLiveboarditemStoreStore();
	    ds.on('beforeload', this.liveboardStoreBeforeLoad);
	},
	
	init: function() {
		
        this.control({
            
        	'button[action=lbactivate]': {  
        		click: this.liveboardActivate
			},
			'button[action=lbdeactivate]': {  
        		click: this.liveboardDeactivate
			},
			'button[action=lbpreview]': {  
        		click: this.previewLiveboard
			},
			'button[action=lblist]': {  
        		click: this.liveboardList
			},
			'liveboardlistview button[action=lbeditdetails]': {  
        		click: this.liveboardListDetails
			},
			'liveboardlistview button[action=lbnewliveboard]': {  
        		click: this.newLiveboard
			},
			'liveboardlistview button[action=lbcopyliveboard]': {  
        		click: this.copyLiveboard
			},
			'liveboardlistview button[action=lbviewliveboard]': {  
        		click: this.viewLiveboardItems
			},
			'liveboardlistview button[action=lbdelete]': {  
        		click: this.deleteLiveboard
			},
			'liveboarditemdetailview button[action=lbitems]': {  
        		click: this.viewLiveboardItems
			},
			'liveboardlistdetailview button[action=lbcancel]': {
				click: this.liveboardList
			},
			'liveboardlistdetailview button[action=lbsave]': {
				click: this.saveLiveboard
			},
			'liveboarditemview button[action=newliveboarditem]': {  
        		click: this.newLiveboardItem
			},
			'liveboarditemview button[action=editliveboarditem]': {  
        		click: this.editLiveboardItem
			},
			'liveboarditemview button[action=copyliveboarditem]': {
				click: this.copyLiveboardItem
			},
			'liveboarditemview button[action=deleteliveboarditem]': {  
        		click: this.deleteLiveboardItem
			},
			'liveboarditemdetailview button[action=lbitemsave]': {
				click: this.saveLiveboardItem
			},
			'liveboarditemdetailview button[action=lbitemcancel]': {
				click: this.viewLiveboardItems
			}
		});
     },
     
     saveLiveboard: function(btn) {
     	var dform = btn.up('form').getForm();
     	if(dform.isValid()) {
     		dform.submit({
 				waitMsg: 'Submitting...',
 				timeout: 300000,
 				reset: true,
 			  		//Failure see app-wide error handler
 			  		success: function(form, action){
 			  			Ext.Msg.show({
 			  				msg: 'Done!',
 			  				buttons: Ext.Msg.OK
 			  			});
 			  			Ext.ComponentQuery.query('liveboardlistview')[0].getStore().load();
 					}
 			});	
     	} else {
     		Ext.Msg.alert("Message", "Please correct form values.");
     	}
     },
     
     saveLiveboardItem: function(btn) {
      	var dform = btn.up('form').getForm();
      	if(dform.isValid()) {
      		dform.submit({
  				waitMsg: 'Submitting...',
  				timeout: 300000,
  				reset: true,
  			  		//Failure see app-wide error handler
  			  		success: function(form, action){
  			  			Ext.Msg.show({
  			  				msg: 'Done!',
  			  				buttons: Ext.Msg.OK
  			  			});
  			  			Ext.ComponentQuery.query('liveboarditemview')[0].getStore().load();
  					}
  			});	
      	} else {
      		Ext.Msg.alert("Message", "Please correct form values.");
      	}
     },
     
     liveboardStoreBeforeLoad: function(s, a) {
    	 var lg = Ext.ComponentQuery.query('liveboardlistview')[0];
    	 var ds = lg.getSelectionModel().getSelection()[0];
    	 s.proxy.extraParams.liveboardcode = ds.data.LIVEBOARDCODE;
    	 return true;
     },
     
     liveboardDeactivate: function(b) {
    	 Ext.Msg.show({
    	     title:'Deactivate Liveboard',
    	     msg: 'Deactivating this liveboard will stop the user from using it. Would you like to continue?',
    	     buttons: Ext.Msg.YESNOCANCEL,
    	     icon: Ext.Msg.QUESTION,
    	     fn: function(res, txt) {
        		 if (res == "yes") {
	    			 var g = Ext.ComponentQuery.query('liveboardlistview')[0];
	    	    	 var ds = g.getSelectionModel().getSelection()[0];
	    	    	 if (ds) {
	    	    		 var myMask = Ext.create('Ext.LoadMask',{
	    		 				target: g,
	    		 				msg: "Deactivating, please wait..."
	    		 		 });
	    		    	 myMask.show();
	    		    	 Ext.liveboard.Liveboard.DeactivateNow(ds.data.LIVEBOARDCODE, function(res) {
	    		    		 if (!res["success"]) {
	    		    			 Ext.Msg.alert("Result", "Failed: " + res["message"]);
	    		    		 } else {
	    		    			 Ext.Msg.alert("Result", "Successful!");
	    		    			 g.getStore().load();
	    		    		 }
	    		    		 myMask.hide();
	    		    	 });
	    	    	 } else {
	    	    		 Ext.Msg.alert("Message", "Please select a liveboard to deactivate.");
	    	    	 }
        		 }
        	 }
    	 });
     },
     
     liveboardActivate: function(b) {
    	 var g = Ext.ComponentQuery.query('liveboardlistview')[0];
    	 var ds = g.getSelectionModel().getSelection()[0];
    	 if (ds) {
    		 var myMask = Ext.create('Ext.LoadMask',{
	 			target: g,
	 			msg: "Please wait..."
	 		 });
	    	 myMask.show();
	    	 Ext.liveboard.Liveboard.ActivateNow(ds.data.LIVEBOARDCODE, function(res) {
	    		 if (!res["success"]) {
	    			 Ext.Msg.alert("Result", "Failed: " + res["message"]);
	    		 } else {
	    			 Ext.Msg.alert("Result", "Successful!");
	    			 g.getStore().load();
	    		 }
	    		 myMask.hide();
	    	 });
    	 } else {
    		 Ext.Msg.alert("Message", "Please select a liveboard to activate.");
    	 }
     },
     
     liveboardList: function(b) {    	 
    	 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
		 centerR.getLayout().setActiveItem(0);
     },
     
     previewLiveboard: function(b) {
    	 var lbgrid = Ext.ComponentQuery.query('liveboardlistview')[0];
		 var lbcode = lbgrid.getSelectionModel().getSelection()[0];
		 if(lbcode) {
			 var openloc = "./myapps/dashboard/" + GLOBAL_VARS_DIRECT["COMPANYCODE"].toUpperCase() + "/LB_" + lbcode.data.LIVEBOARDCODE.toUpperCase().replace(/-/g, "") + "/index.cfm";
			 window.open(openloc, "iBOS/e Liveboard Preview", "fullscreen=yes, channelmode=yes", "true");
	     } else {
	    	 Ext.Msg.alert("Message", "No liveboard to preview.");
		 }
     },
     
     liveboardListDetails: function(b) {
    	 var lbgrid = Ext.ComponentQuery.query('liveboardlistview')[0];
		 var lbcode = lbgrid.getSelectionModel().getSelection()[0];
		 
		 if(lbcode) {
			 var Ldetails = Ext.ComponentQuery.query('liveboardlistdetailview')[0];
			 Ldetails.setTitle("Liveboard List Details - " + lbcode.data.LBTITLE);
			 var dform = Ldetails.getForm();
			 dform.reset();
			 dform.load({
				 params: {
					 liveboardcode: lbcode.data.LIVEBOARDCODE
				 }
			 });
			 var formval = {
				LBTYPE: 'EDIT'
			 };
			 dform.setValues(formval);
			 
			 var dbutton = Ext.ComponentQuery.query("liveboardlistdetailview button[action=lbsave]")[0];
			 dbutton.setText("Update");
			 
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(1);
		 } else {
			 Ext.Msg.alert("Message", "No liveboard to edit.");
		 }
     },
     editLiveboardItem: function(b) {
    	 var lbitemgrid = Ext.ComponentQuery.query('liveboarditemview')[0];
		 var lbitemcode = lbitemgrid.getSelectionModel().getSelection()[0];
		 
		 if(lbitemcode) {
			 var Ldetails = Ext.ComponentQuery.query('liveboarditemdetailview')[0];
			 Ldetails.setTitle("Liveboard Item Details - " + lbitemcode.data.XTYPETITLE);
			 var dform = Ldetails.getForm();
			 dform.reset();
			 
			 var formval = {
				LBITEMTYPE: 'EDIT'
			 };
			 dform.setValues(lbitemcode.data);
			 dform.setValues(formval);
			 
			 var dbutton = Ext.ComponentQuery.query("liveboarditemdetailview button[action=lbitemsave]")[0];
			 dbutton.setText("Update");
			 
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(3);
		 } else {
			 Ext.Msg.alert("Message", "No liveboard item to edit.");
		 }
     },
     newLiveboard: function(b) {
    	 var Ldetails = Ext.ComponentQuery.query('liveboardlistdetailview')[0];
		 var dform = Ldetails.getForm();
		 dform.reset();
		 var formval = {
			LBSTATUS: 'NOTACTIVE',
			LBTYPE: 'NEW'
		 };
		 dform.setValues(formval);
		 
		 var dbutton = Ext.ComponentQuery.query("liveboardlistdetailview button[action=lbsave]")[0];
		 dbutton.setText("Add");
		 
		 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
		 centerR.getLayout().setActiveItem(1);
     },
     newLiveboardItem: function(b) {
    	 var lbgrid = Ext.ComponentQuery.query('liveboardlistview')[0];
		 var lbcode = lbgrid.getSelectionModel().getSelection()[0];
		 
    	 var idetails = Ext.ComponentQuery.query('liveboarditemdetailview')[0];
		 var dform = idetails.getForm();
		 dform.reset();
		 var formval = {
			LBITEMTYPE: 'NEW',
			LIVEBOARDCODE: lbcode.data.LIVEBOARDCODE
		 };
		 dform.setValues(formval);
		 
		 var dbutton = Ext.ComponentQuery.query("liveboarditemdetailview button[action=lbitemsave]")[0];
		 dbutton.setText("Add");
		 
		 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
		 centerR.getLayout().setActiveItem(3);
     },
     copyLiveboard: function(b) {
    	 var lbgrid = Ext.ComponentQuery.query('liveboardlistview')[0];
		 var lbcode = lbgrid.getSelectionModel().getSelection()[0];
		 
		 if(lbcode) {
			 var Ldetails = Ext.ComponentQuery.query('liveboardlistdetailview')[0];
			 Ldetails.setTitle("Liveboard List Details - " + lbcode.data.LBTITLE);
			 var dform = Ldetails.getForm();
			 dform.reset();
			 
			 var formval = {
				LBTYPE: 'COPY'
			 };
			 dform.setValues(formval);
			 
			 var dbutton = Ext.ComponentQuery.query("liveboardlistdetailview button[action=lbsave]")[0];
			 dbutton.setText("Copy");
			 
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(1);
		 } else {
			 Ext.Msg.alert("Message", "No liveboard to copy.");
		 }
     },
     copyLiveboardItem: function(b) {
    	 var lbitemgrid = Ext.ComponentQuery.query('liveboarditemview')[0];
		 var lbitemcode = lbitemgrid.getSelectionModel().getSelection()[0];
		 
		 if(lbitemcode) {
			 var Ldetails = Ext.ComponentQuery.query('liveboarditemdetailview')[0];
			 Ldetails.setTitle("Liveboard Item Details - " + lbitemcode.data.XTYPETITLE);
			 var dform = Ldetails.getForm();
			 dform.reset();
			 
			 var formval = {
				LBITEMTYPE: 'COPY'
			 };
			 dform.setValues(lbitemcode.data);
			 dform.setValues(formval);
			 
			 var dbutton = Ext.ComponentQuery.query("liveboarditemdetailview button[action=lbitemsave]")[0];
			 dbutton.setText("Copy");
			 
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(3);
		 } else {
			 Ext.Msg.alert("Message", "Please select an item first to continue.");
		 }
     },
     viewLiveboardItems: function(b) {
    	 
		 var lbGrid = Ext.ComponentQuery.query('liveboardlistview')[0];
		 var lbcode = lbGrid.getSelectionModel().getSelection()[0];
		 if(lbcode) {
			 
			 liveboardcode = lbcode.data.LIVEBOARDCODE;
			 var clistStore = Ext.ComponentQuery.query('liveboarditemview')[0].getStore();
			 // clistStore.removeAll(); // remove
			 // clistStore.currentPage = 1; // back to page one -> resolves unreachable page
			 clistStore.load({
				 params: {
					 liveboardcode: liveboardcode
				 }
			 });
			 clistStore.proxy.extraParams.liveboardcode = liveboardcode;
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(2);
		 } else {
			 Ext.Msg.alert("Message", "Please select first a liveboard.");
		 }
     },
     deleteLiveboard: function(b) {
    	 var lbgrid = Ext.ComponentQuery.query('liveboardlistview')[0];
		 var lbcode = lbgrid.getSelectionModel().getSelection()[0];
		 
		 if(lbcode) {
			 var Ldetails = Ext.ComponentQuery.query('liveboardlistdetailview')[0];
			 Ldetails.setTitle("Liveboard List to Delete - " + lbcode.data.LBTITLE);
			 var dform = Ldetails.getForm();
			 dform.reset();
			 dform.load({
				 params: {
					 liveboardcode: lbcode.data.LIVEBOARDCODE
				 }
			 });
			 var formval = {
				LBTYPE: 'DELETE'
			 };
			 dform.setValues(formval);
			 
			 var dbutton = Ext.ComponentQuery.query("liveboardlistdetailview button[action=lbsave]")[0];
			 dbutton.setText("Delete Now");
			 
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(1);
		 } else {
			 Ext.Msg.alert("Message", "No liveboard to delete.");
		 }
     },
     deleteLiveboardItem: function(b) {
    	 var lbitemgrid = Ext.ComponentQuery.query('liveboarditemview')[0];
		 var lbitemcode = lbitemgrid.getSelectionModel().getSelection()[0];
		 
		 if(lbitemcode) {
			 var Ldetails = Ext.ComponentQuery.query('liveboarditemdetailview')[0];
			 Ldetails.setTitle("Liveboard Item to Delete - " + lbitemcode.data.XTYPETITLE);
			 var dform = Ldetails.getForm();
			 dform.reset();
			 
			 var formval = {
				LBITEMTYPE: 'DELETE'
			 };
			 dform.setValues(lbitemcode.data);
			 dform.setValues(formval);
			 
			 var dbutton = Ext.ComponentQuery.query("liveboarditemdetailview button[action=lbitemsave]")[0];
			 dbutton.setText("Delete Now");
			 
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(3);
		 } else {
			 Ext.Msg.alert("Message", "No liveboard item to delete.");
		 }
     }
     
});