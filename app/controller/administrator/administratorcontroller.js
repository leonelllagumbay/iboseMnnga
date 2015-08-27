Ext.define('Form.controller.administrator.administratorcontroller', {
    extend: 'Ext.app.Controller',
	views: [
        'administrator.companyListView',
        'administrator.companyDetailView',
        'administrator.userListView',
        'administrator.userDetailView',
        'administrator.userRoleListView',
        'administrator.userRoleDetailView',
        'administrator.generalView',
        'administrator.organizationListView',
        'administrator.organizationDetailView',
        'administrator.userAppListView',
        'administrator.userMenuListView',
        'administrator.assignUser',
        'administrator.assignUserRole',
        'administrator.assignUserWin',
        'administrator.assignMenuUser',
        'administrator.assignMenuUserRole',
        'administrator.assignMenuUserWin',
        'administrator.userRoleMemberWin',
        'administrator.userRoleMember',
        'administrator.moreUsersWin',
        'administrator.moreUsersForm'
    ],
	models: [
	    'administrator.companyListModel',
	    'administrator.userListModel',
	    'administrator.userRoleListModel',
	    'administrator.organizationListModel',
	    'administrator.userAppListModel',
	    'administrator.userMenuListModel',
	    'administrator.assignUserModel'
	    
	],
	stores: [
	    'administrator.companyListStore',
	    'administrator.userListStore',
	    'administrator.userRoleListStore',
	    'administrator.organizationListStore',
	    'administrator.userAppListStore',
	    'administrator.userMenuListStore',
	    'file.userStore',
	    'form.rolestore',
	    'administrator.assignUserStore',
	    'administrator.assignUserRoleStore',
	    'administrator.assignMenuUserStore',
	    'administrator.assignMenuUserRoleStore',
	    'administrator.assignUserRoleMemberStore'
	],
	
	onLaunch: function() {
	    var ds = this.getAdministratorAssignUserStoreStore();
	    ds.on('beforeload', this.assignUserBeforeLoad);
	    
	    var ds = this.getAdministratorAssignUserRoleStoreStore();
	    ds.on('beforeload', this.assignUserBeforeLoad);
	    
	    var ds = this.getAdministratorAssignMenuUserStoreStore();
	    ds.on('beforeload', this.assignMenuUserBeforeLoad);
	    
	    var ds = this.getAdministratorAssignMenuUserRoleStoreStore();
	    ds.on('beforeload', this.assignMenuUserBeforeLoad);
	    
	    var ds = this.getAdministratorAssignUserRoleMemberStoreStore();
	    ds.on('beforeload', this.assignUserRoleMemberBeforeLoad);   
	},
	
	init: function() {
		this.control({
            'companylistview button[action=editcompany]': {  
            	click: this.editCompany
			},
			'companylistview button[action=addcompany]': {  
            	click: this.addCompany
			},
			'companylistview button[action=copycompany]': {  
            	click: this.copyCompany
			},
			'companylistview button[action=removecompany]': {  
            	click: this.removeCompany
			},
			'companydetailview button[action=backtocompanylist]': {
				click: this.backToCompanyList
			},
			'companydetailview button[action=cancel]': {
				click: this.backToCompanyList
			},
			'companydetailview button[action=save]': {
				click: this.submitCompanyData
			},
			'userdetailview button[action=backtouserlist]': {
				click: this.backToUserList
			},
			'userlistview button[action=edituser]': {  
            	click: this.editUser
			},
			'userlistview button[action=adduser]': {  
            	click: this.addUser
			},
			'userlistview button[action=copyuser]': {  
            	click: this.copyUser
			},
			'userlistview button[action=removeuser]': {  
            	click: this.removeUser
			},
			'userdetailview button[action=cancel]': {
				click: this.backToUserList
			},
			'userdetailview button[action=save]': {
				click: this.submitUserData
			},
			'userapplistview button[action=appuser]': {
				click: this.assignAppUser
			},
			'usermenulistview button[action=menuuser]': {
				click: this.assignMenuUser
			},
			'assignuser button[action=assign]': {
				click: this.assignUserToApp
			},
			'assignuserrole button[action=assign]': {
				click: this.assignUserToApp
			},
			'assignuser button[action=undoassign]': {
				click: this.removeUserFromApp
			},
			'assignuserrole button[action=undoassign]': {
				click: this.removeUserFromApp
			},
			'assignmenuuser button[action=assign]': {
				click: this.assignUserToMenu
			},
			'assignmenuuserrole button[action=assign]': {
				click: this.assignUserToMenu
			},
			'assignmenuuser button[action=undoassign]': {
				click: this.removeUserFromMenu
			},
			'assignmenuuserrole button[action=undoassign]': {
				click: this.removeUserFromMenu
			},
			'userrolelistview button[action=edituserrole]': {  
            	click: this.editUserRole
			},
			'userrolelistview button[action=adduserrole]': {  
            	click: this.addUserRole
			},
			'userrolelistview button[action=copyuserrole]': {  
            	click: this.copyUserRole
			},
			'userrolelistview button[action=deleteuserrole]': {  
            	click: this.removeUserRole
			},
			'userroledetailview button[action=cancel]': {
				click: this.backToUserRoleList
			},
			'userroledetailview button[action=backtouserrolelist]': {
				click: this.backToUserRoleList
			},
			'userroledetailview button[action=save]': {
				click: this.submitUserRoleData
			},
			'userrolemember button[action=assign]': {
				click: this.assignToUserRoleMember
			},
			'userrolemember button[action=undoassign]': {
				click: this.removeFromUserRoleMember
			},
			'userrolelistview button[action=userroleusers]': {
				click: this.assignUserRoleMember
			},
			'userdetailview textfield[name=A-PASSWORD]': {
				blur: this.convertToMD5
			},
			'userdetailview textfield[name=A-PASSANSWER]': {
				blur: this.convertToMD5
			}, 
			'userlistview button[action=insertmultipleuser]': {
				click: this.uploadMultipleUsersWin
			},
			'moreusersform button[action=uploadusers]': {
				click: this.addMultipleUsers
			}
		});
     },
     
     addMultipleUsers: function(b) {
    	var dform = b.up('form').getForm();
    	if(dform.isValid()) {
      		dform.submit({
  				waitMsg: 'Adding users, please wait...',
  				timeout: 300000,
  				reset: true,
  			  		//Failure see app-wide error handler
  			  		success: function(form, action){
  			  			Ext.Msg.show({
  			  				msg: 'Done!',
  			  				buttons: Ext.Msg.OK
  			  			});
  			  			Ext.ComponentQuery.query('userlistview')[0].getStore().load();
  					}
  			});	
      	 } 
     },
     
     uploadMultipleUsersWin: function(b) {
    	Ext.widget('moreuserswin').show();
     },
     
     convertToMD5: function(thisInput) {
    	var pvalue = thisInput.getValue(); 		
 		if(pvalue.length > 0) { 			
 			thisInput.getEl().mask('...'); 			
 			Ext.Ajax.request({ 			    
	 			url: './myapps/data/form/convertToMD5.cfm', 			    
	 			params: { 			        
		 			pvalue: pvalue 			    
		 		}, 			    
		 		success: function(response) { 			        
		 			var text = response.responseText; 			        
		 			thisInput.setValue(text); 			        
		 			thisInput.getEl().unmask(); 			    
		 		} 
 			});
 		}
     },
     
     assignUserRoleMemberBeforeLoad: function(s, a) {
    	 var qg = Ext.ComponentQuery.query('userrolelistview')[0];
    	 var ds = qg.getSelectionModel().getSelection()[0];
    	 s.proxy.extraParams.rolecode = ds.data.USERGRPID;
    	 return true;
     },
      
     assignUserRoleMember: function(b) {
    	 var gobj = b.up('grid');
		 if (gobj.getSelectionModel().hasSelection()) {
			 var aswin = Ext.widget('userrolememberwin');
			 aswin.down('userrolemember').getStore().load();
			 aswin.show();
		 } else {
			 Ext.Msg.alert('Please select a record first!');
             return false;
		 }
     },
     
     assignToUserRoleMember: function(btn) {
    	 
    	 var dgrid = btn.up('grid');
    	 var userpid = dgrid.down('combobox[name=USERNAME]');
    	 if (!userpid) return false;
    	 else userpid = dgrid.down('combobox[name=USERNAME]').getValue();
    	 
    	 var qView = Ext.ComponentQuery.query("userrolelistview")[0];
		 if (qView.getSelectionModel().hasSelection()) {
             var items = qView.getSelectionModel().getSelection();
             var fileids = [];
             for (var a = 0; a < items.length; a++) {
            	 fileids[a] = items[a].data.USERGRPID;
             }
             if (userpid.length > 0) {
	             Ext.administrator.Administrator.assignToUserRoleMember(fileids, userpid, function(result) {
	            	 var sg = dgrid.getStore();
	            	 sg.load();
	             });
             }
         } else {
             Ext.Msg.alert('Please select a role first.');
             return false;
         }
    	 
     },
     
     removeFromUserRoleMember: function(b) {
    	 var gobj = b.up("grid");
		 var gobjS = gobj.getStore();
		 if (gobj.getSelectionModel().hasSelection()) {
			 var r = gobj.getSelectionModel().getSelection();
			 if (r.length > 1) var us = "users.";
			 else var us = "user."
			 var cres = window.confirm("This action will unassign the selected " + us);
			 if (cres) gobjS.remove(r);
		 } else {
			 Ext.MessageBox.alert('No selection to remove!');
             return false;
		 }
	 },
     
     
     
     assignMenuUserBeforeLoad: function(s, a) {
    	 var qg = Ext.ComponentQuery.query('usermenulistview')[0];
    	 var ds = qg.getSelectionModel().getSelection()[0];
    	 s.proxy.extraParams.menucode = ds.data.MENUID;
    	 return true;
     },
     
     assignUserToMenu: function(btn) {
    	 
    	 var dgrid = btn.up('grid');
    	 var dtype = "user";
    	 var userpid = dgrid.down('combobox[name=USERNAME]');
    	 if (!userpid) {
    		 var userpid = dgrid.down('combobox[name=USERROLE]').getValue();
    		 dtype = "userrole";
    	 } else userpid = dgrid.down('combobox[name=USERNAME]').getValue();
    	 
    	 if (userpid.trim() == '') {
    		 return false;
    	 }	
    	 
    	 var qView = Ext.ComponentQuery.query("usermenulistview")[0];
		 if (qView.getSelectionModel().hasSelection()) {
             var items = qView.getSelectionModel().getSelection();
             var fileids = [];
             for (var a = 0; a < items.length; a++) {
            	 fileids[a] = items[a].data.MENUID;
             }
             if (userpid.length > 0) {
	             Ext.administrator.Administrator.assignUserToMenu(fileids, userpid, dtype, function(result) {
	            	 var sg = dgrid.getStore();
	            	 sg.load();
	             });
             }
         } else {
             Ext.Msg.alert('Please select a menu first.');
             return false;
         }
    	 
     },
     
     removeUserFromMenu: function(b) {
    	 var gobj = b.up("grid");
		 var gobjS = gobj.getStore();
		 if (gobj.getSelectionModel().hasSelection()) {
			 var r = gobj.getSelectionModel().getSelection();
			 if (r.length > 1) var us = "users.";
			 else var us = "user."
			 var cres = window.confirm("This action will unassign the selected " + us);
			 if (cres) gobjS.remove(r);
		 } else {
			 Ext.MessageBox.alert('No selection to remove!');
             return false;
		 }
	 },
     
     assignMenuUser: function(b) {
    	 var gobj = b.up('grid');
		 if (gobj.getSelectionModel().hasSelection()) {
			 var aswin = Ext.widget('assignmenuuserwin');
			 aswin.down('assignmenuuser').getStore().load();
			 aswin.down('assignmenuuserrole').getStore().load();
			 aswin.show();
		 } else {
			 Ext.Msg.alert('Please select a record first!');
             return false;
		 }
     },
     


     
     assignUserBeforeLoad: function(s, a) {
    	 var qg = Ext.ComponentQuery.query('userapplistview')[0];
    	 var ds = qg.getSelectionModel().getSelection()[0];
    	 s.proxy.extraParams.appcode = ds.data.APPID;
    	 return true;
     },
     
     assignUserToApp: function(btn) {
    	 
    	 var dgrid = btn.up('grid');
    	 var dtype = "user";
    	 var userpid = dgrid.down('combobox[name=USERNAME]');
    	 if (!userpid) {
    		 var userpid = dgrid.down('combobox[name=USERROLE]').getValue();
    		 dtype = "userrole";
    	 } else userpid = dgrid.down('combobox[name=USERNAME]').getValue();
    	 
    	 if (userpid.trim() == '') {
    		 return false;
    	 }	
    	 
    	 var qView = Ext.ComponentQuery.query("userapplistview")[0];
		 if (qView.getSelectionModel().hasSelection()) {
             var items = qView.getSelectionModel().getSelection();
             var fileids = [];
             for (var a = 0; a < items.length; a++) {
            	 fileids[a] = items[a].data.APPID;
             }
             if (userpid.length > 0) {
	             Ext.administrator.Administrator.assignUserToApp(fileids, userpid, dtype, function(result) {
	            	 var sg = dgrid.getStore();
	            	 sg.load();
	             });
             }
         } else {
             Ext.Msg.alert('Please select an app first.');
             return false;
         }
    	 
     },
     
     removeUserFromApp: function(b) {
    	 var gobj = b.up("grid");
		 var gobjS = gobj.getStore();
		 if (gobj.getSelectionModel().hasSelection()) {
			 var r = gobj.getSelectionModel().getSelection();
			 if (r.length > 1) var us = "users.";
			 else var us = "user."
			 var cres = window.confirm("This action will unassign the selected " + us);
			 if (cres) gobjS.remove(r);
		 } else {
			 Ext.MessageBox.alert('No selection to remove!');
             return false;
		 }
	 },
     
     assignAppUser: function(b) {
    	 var gobj = b.up('grid');
		 if (gobj.getSelectionModel().hasSelection()) {
			 var aswin = Ext.widget('assignuserwin');
			 aswin.down('assignuser').getStore().load();
			 aswin.down('assignuserrole').getStore().load();
			 aswin.show();
		 } else {
			 Ext.Msg.alert('Please select a record first!');
             return false;
		 }
     },
     
     submitUserData: function(btn) {
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
  			  			Ext.ComponentQuery.query('userlistview')[0].getStore().load();
  					}
  			});	
      	} else {
      		Ext.Msg.alert("Message", "Please correct form values.");
      	}
      },
     
     editUser: function(b) {
    	 var dgrid = b.up('grid');
    	 var selM = dgrid.getSelectionModel().getSelection()[0];
    	 if (selM) {
	    	 var tp = b.up('tabpanel');
	    	 var centerR = tp.items.items[1].getLayout().setActiveItem(1);
	    	 var aitem = Ext.ComponentQuery.query('userdetailview')[0];
	    	 aitem.setTitle(selM.data["B-FIRSTNAME"] + " " + selM.data["B-LASTNAME"]);
	    	 aitem.getForm().setValues(selM.data);
	    	 aitem.getForm().setValues({USERACTION: "EDIT"});
	    	 aitem.down('button[action=save]').setText('Save');
    	 } else {
    		 Ext.Msg.alert("No Selection to Edit");
    	 }
     },
     
     addUser: function(b) {
    	 var tp = b.up('tabpanel');
    	 var centerR = tp.items.items[1].getLayout().setActiveItem(1);
    	 var aitem = Ext.ComponentQuery.query('userdetailview')[0];
    	 aitem.setTitle("New User");
    	 aitem.getForm().setValues({USERACTION: "NEW"});
    	 aitem.down('button[action=save]').setText('Add');
     },
     
     copyUser: function(b) {
    	 var dgrid = b.up('grid');
    	 var selM = dgrid.getSelectionModel().getSelection()[0];
    	 if (selM) {
	    	 var tp = b.up('tabpanel');
	    	 var centerR = tp.items.items[1].getLayout().setActiveItem(1);
	    	 var aitem = Ext.ComponentQuery.query('userdetailview')[0];
	    	 aitem.setTitle(selM.data["B-FIRSTNAME"] + " " + selM.data["B-LASTNAME"]);
	    	 aitem.getForm().setValues(selM.data);
	    	 aitem.getForm().setValues({USERACTION: "COPY"});
	    	 aitem.down('button[action=save]').setText('Copy');
    	 } else {
    		 Ext.Msg.alert("No Selection to Copy");
    	 }
     },
     
     removeUser: function(b) {
    	 var dgrid = b.up('grid');
    	 var selM = dgrid.getSelectionModel().getSelection()[0];
    	 if (selM) {
	    	 var tp = b.up('tabpanel');
	    	 var centerR = tp.items.items[1].getLayout().setActiveItem(1);
	    	 var aitem = Ext.ComponentQuery.query('userdetailview')[0];
	    	 aitem.setTitle(selM.data["B-FIRSTNAME"] + " " + selM.data["B-LASTNAME"]);
	    	 aitem.getForm().setValues(selM.data);
	    	 aitem.getForm().setValues({USERACTION: "DELETE"});
	    	 aitem.down('button[action=save]').setText('Remove');
    	 } else {
    		 Ext.Msg.alert("No Selection to Delete");
    	 }
     },
     
     
     
     submitUserRoleData: function(btn) {
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
   			  			Ext.ComponentQuery.query('userrolelistview')[0].getStore().load();
   					}
   			});	
       	} else {
       		Ext.Msg.alert("Message", "Please correct form values.");
       	}
       },
      
      editUserRole: function(b) {
     	 var dgrid = b.up('grid');
     	 var selM = dgrid.getSelectionModel().getSelection()[0];
     	 if (selM) {
 	    	 var tp = b.up('tabpanel');
 	    	 var centerR = tp.items.items[2].getLayout().setActiveItem(1);
 	    	 var aitem = Ext.ComponentQuery.query('userroledetailview')[0];
 	    	 aitem.setTitle(selM.data["DESCRIPTION"]);
 	    	 aitem.getForm().setValues(selM.data);
 	    	 aitem.getForm().setValues({USERACTION: "EDIT"});
 	    	 aitem.down('button[action=save]').setText('Save');
     	 } else {
     		 Ext.Msg.alert("No Selection to Edit");
     	 }
      },
      
      addUserRole: function(b) {
     	 var tp = b.up('tabpanel');
     	 var centerR = tp.items.items[2].getLayout().setActiveItem(1);
     	 var aitem = Ext.ComponentQuery.query('userroledetailview')[0];
     	 aitem.setTitle("New User Role");
     	 aitem.getForm().setValues({USERACTION: "NEW", USERGRPID: Ext.Date.format(new Date(), 'YmdHis') });
     	 aitem.down('button[action=save]').setText('Add');
      },
      
      copyUserRole: function(b) {
     	 var dgrid = b.up('grid');
     	 var selM = dgrid.getSelectionModel().getSelection()[0];
     	 if (selM) {
 	    	 var tp = b.up('tabpanel');
 	    	 var centerR = tp.items.items[2].getLayout().setActiveItem(1);
 	    	 var aitem = Ext.ComponentQuery.query('userroledetailview')[0];
 	    	 aitem.setTitle(selM.data["DESCRIPTION"]);
 	    	 aitem.getForm().setValues(selM.data);
 	    	 aitem.getForm().setValues({USERACTION: "COPY", USERGRPID: Ext.Date.format(new Date(), 'YmdHis') });
 	    	 aitem.down('button[action=save]').setText('Copy');
     	 } else {
     		 Ext.Msg.alert("No Selection to Copy");
     	 }
      },
      
      removeUserRole: function(b) {
     	 var dgrid = b.up('grid');
     	 var selM = dgrid.getSelectionModel().getSelection()[0];
     	 if (selM) {
 	    	 var tp = b.up('tabpanel');
 	    	 var centerR = tp.items.items[2].getLayout().setActiveItem(1);
 	    	 var aitem = Ext.ComponentQuery.query('userroledetailview')[0];
 	    	 aitem.setTitle(selM.data["DESCRIPTION"]);
 	    	 aitem.getForm().setValues(selM.data);
 	    	 aitem.getForm().setValues({USERACTION: "DELETE"});
 	    	 aitem.down('button[action=save]').setText('Remove');
     	 } else {
     		 Ext.Msg.alert("No Selection to Delete");
     	 }
      },
      
     
      submitCompanyData: function(btn) {
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
 			  			Ext.ComponentQuery.query('companylistview')[0].getStore().load();
 					}
 			});	
     	} else {
     		Ext.Msg.alert("Message", "Please correct form values.");
     	}
     },
     
     addCompany: function(b) {
    	 var tp = b.up('tabpanel');
    	 var centerR = tp.items.items[0].getLayout().setActiveItem(1);
    	 var aitem = Ext.ComponentQuery.query('companydetailview')[0];
    	 aitem.setTitle("New Company");
    	 aitem.getForm().setValues({COMPANYACTION: "NEW"});
    	 aitem.down('button[action=save]').setText('Add');
     },
     
     copyCompany: function(b) {
    	 var dgrid = b.up('grid');
    	 var selM = dgrid.getSelectionModel().getSelection()[0];
    	 if (selM) {
	    	 var tp = b.up('tabpanel');
	    	 var centerR = tp.items.items[0].getLayout().setActiveItem(1);
	    	 var aitem = Ext.ComponentQuery.query('companydetailview')[0];
	    	 aitem.setTitle(selM.data["A-DESCRIPTION"]);
	    	 aitem.getForm().setValues(selM.data);
	    	 aitem.getForm().setValues({COMPANYACTION: "COPY"});
	    	 aitem.down('button[action=save]').setText('Copy');
    	 } else {
    		 Ext.Msg.alert("No Selection to Copy");
    	 }
     },
     
     editCompany: function(b) {
    	 var dgrid = b.up('grid');
    	 var selM = dgrid.getSelectionModel().getSelection()[0];
    	 if (selM) {
	    	 var tp = b.up('tabpanel');
	    	 var centerR = tp.items.items[0].getLayout().setActiveItem(1);
	    	 var aitem = Ext.ComponentQuery.query('companydetailview')[0];
	    	 aitem.setTitle(selM.data["A-DESCRIPTION"]);
	    	 aitem.getForm().setValues(selM.data);
	    	 aitem.getForm().setValues({COMPANYACTION: "EDIT"});
	    	 aitem.down('button[action=save]').setText('Save');
    	 } else {
    		 Ext.Msg.alert("No Selection to Edit");
    	 }
     },
     
     removeCompany: function(b) {
    	 var dgrid = b.up('grid');
    	 var selM = dgrid.getSelectionModel().getSelection()[0];
    	 if (selM) {
	    	 var tp = b.up('tabpanel');
	    	 var centerR = tp.items.items[0].getLayout().setActiveItem(1);
	    	 var aitem = Ext.ComponentQuery.query('companydetailview')[0];
	    	 aitem.setTitle(selM.data["A-DESCRIPTION"]);
	    	 aitem.getForm().setValues(selM.data);
	    	 aitem.getForm().setValues({COMPANYACTION: "DELETE"});
	    	 aitem.down('button[action=save]').setText('Remove');
    	 } else {
    		 Ext.Msg.alert("No Selection to Delete");
    	 }
     },
     
     backToCompanyList: function(b) {
    	 var tp = b.up('tabpanel');
    	 var centerR = tp.items.items[0].getLayout().setActiveItem(0);
     },
     
     backToUserList: function(b) {
    	 var tp = b.up('tabpanel');
    	 var centerR = tp.items.items[1].getLayout().setActiveItem(0);
     },
     
     backToUserRoleList: function(b) {
    	 var tp = b.up('tabpanel');
    	 var centerR = tp.items.items[2].getLayout().setActiveItem(0);
     }
});