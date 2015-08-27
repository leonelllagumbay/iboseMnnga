Ext.define('Form.controller.file.filecontroller', {
    extend: 'Ext.app.Controller',
	views: [
        'file.fileView',
        'file.fileGrid',
        'file.topFolderWindow',
        'file.moveFolder',
        'file.renameFolderView',
        'file.searchFolderView',
        'file.uploadFileWindow',
        'file.uploadFileForm',
        'file.copyWin',
        'file.copyForm',
        'file.shareWin',
        'file.shareForm',
        'file.shareGrid'
    ],
	models: [
	    'file.folderModel',
	    'file.folderDestinationModel',
	    'file.fileModel',
	    'form.userModel',
	    'form.rolemodel',
	    'file.shareModel'
	],
	stores: [
	    'file.folderStore',
	    'file.folderDestinationStore',
	    'file.fileStore',
	    'file.folderOrderStore',
	    'file.orderDir',
	    'file.userStore',
	    'form.rolestore',
	    'file.shareStore',
	    'file.shareUserRoleStore'
	],
	
	onLaunch: function() {
	    var fileStore = this.getFileFileStoreStore();
	    fileStore.on('load', this.treeVAfterLoad);
	    
	    var ds = this.getFileShareStoreStore();
	    ds.on('beforeload', this.assignUserBeforeLoad);
	    
	    var ds = this.getFileShareUserRoleStoreStore();
	    ds.on('beforeload', this.assignUserBeforeLoad);
	},
	
	init: function() {
		this.control({
            'fileview': { 
				select: this.treeSelected,
				containercontextmenu: this.myFolderContextMenu,
				itemcontextmenu: this.myFolderItemRightClicked
			},
			'topfolderwindow button[action=addfolder]': {
				click: this.addTopFolder
			},
			'movefolder button[action=movefolder]': {
				click: this.moveTheFolder
			},
			'renamefolderview button[action=renamefolder]': {
				click: this.renameTheFolder
			},
			'searchfolderview button[action=searchfolder]': {
				click: this.searchTheFolder
			},
			'filegrid button[action=uploadfile]': {
				click: this.uploadFile
			},
			
			'filegrid button[action=share]': {
				click: this.shareFile
			},
			
			'filegrid button[action=copy]': {
				click: this.copyFile
			},
			
			'filegrid button[action=move]': {
				click: this.moveFile
			},
			
			'filegrid button[action=delete]': {
				click: this.deleteFile
			},
			
			'uploadfileform button[action=insertfileinput]': {  
				click: this.insertFileInput
			},
			'uploadfileform button[action=upload]': {
				click: this.uploadTheFiles
			},
			'uploadfileform button[action=cancel]': {
				click: this.cancelPopupWindow
			},
			'copyform button[action=copy]': {
				click: this.copyTheFile
			},
			'copyform button[action=cancel]': {
				click: this.cancelTheFile
			},
			'sharegrid button[action=share]': {
				click: this.shareTheFile
			},
			'shareform button[action=share]': {
				click: this.shareTheFile
			},
			'sharegrid button[action=undoshare]': {
				click: this.deleteSharedFile
			},
			'shareform button[action=undoshare]': {
				click: this.deleteSharedFile
			}
		});
     },
     
     assignUserBeforeLoad: function(s, a) {
    	 var qg = Ext.ComponentQuery.query('filegrid')[0];
    	 var ds = qg.getSelectionModel().getSelection()[0];
    	 s.proxy.extraParams.fileid = ds.data.FILEID;
    	 return true;
     },

     
     treeVAfterLoad: function(s, r) {
    	 var treeView = Ext.ComponentQuery.query("fileview")[0];
		 if (!treeView.getSelectionModel().hasSelection()) treeView.getSelectionModel().select(0);
     },
     
     cancelPopupWindow: function(b) {
     	b.up('window').close(); 
     },
      
     insertFileInput: function(btn) {
     	 var form = btn.up('form');
     	 if(typeof form.fcount === 'undefined') {
     		 form.fcount = 2;
      	 } else {
      	 	form.fcount += 1;
      	 }
     	 var hiddenCmp = form.down('hiddenfield[name=fileCount]');
     	 hiddenCmp.setValue(hiddenCmp.getValue() + 1);
     	 form.insert(form.fcount + 2,[{
     		 xtype: 'container',
     		 name: 'cont' + form.fcount,
     		 layout: 'hbox',
     		 width: '100%', 
     		 items: [{
 				xtype: 'filefield',
 				padding: 10,
 				width: 350,
 				name: 'file' + form.fcount,
 				fieldLabel: 'File ' + form.fcount
 			 }]	
     	}]);
     },
     
     
     shareTheFile: function(btn) {
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
    	 
    	 var treeView = Ext.ComponentQuery.query("filegrid")[0];
		 if (treeView.getSelectionModel().hasSelection()) {
             var items = treeView.getSelectionModel().getSelection();
             var fileids = [];
             for (var a = 0; a < items.length; a++) {
            	 fileids[a] = items[a].data.FILEID;
             }
             if (userpid.length > 0 || userrolecode.length > 0) {
	             Ext.file.FileDefinition.shareUserFile(fileids, userpid, dtype, function(result) {
	            	 var sg = dgrid.getStore();
	            	 sg.load();
	             });
             }
         } else {
             Ext.MessageBox.alert('No file selection!');
             return false;
         }
    	 
     },
     
     
     uploadTheFiles: function(btn) {
     	 if(btn.up('form').getForm().isValid()) {
 	    	 btn.up('form').getForm().submit({
 	    		    submitEmptyText: true,
 					timeout: 300000,
 					waitMsg: 'Uploading, please wait',
 			  		reset: true,
 			  		failure: function(form, action) {
 			  			Ext.MessageBox.alert("Cannot upload the file!", action.result.message);
 			  		},
 			  		success: function(form, action){
 			  			btn.up("window").close();
 			  			var filestore = Ext.ComponentQuery.query('filegrid')[0].getStore();
	 			  		filestore.load();
 					}
 	    	 });
     	 }
     },
     
     copyTheFile: function(btn) {
     	 if(btn.up('form').getForm().isValid()) {
 	    	 btn.up('form').getForm().submit({
 	    		    submitEmptyText: true,
 					timeout: 300000,
 					waitMsg: 'Copying, please wait',
 			  		reset: true,
 			  		success: function(form, action){
 			  			btn.up("window").close();
 			  			var filestore = Ext.ComponentQuery.query('filegrid')[0].getStore();
	 			  		filestore.load();
 					}
 	    	 });
     	 }
     },
     
     cancelTheFile: function(b) {
    	 b.up('window').close();
     },
     
     treeSelected: function(disrow, rec, ind) {
		 var fg = Ext.ComponentQuery.query('filegrid')[0];
		 if (rec.data.FOLDERID == "SHAREDFILES") { // hide upload, share, move, and delete buttons
			 fg.down('button[action=uploadfile]').setVisible(false);
			 fg.down('button[action=copy]').setVisible(false);
			 fg.down('button[action=share]').setVisible(false);
			 fg.down('button[action=move]').setVisible(false);
			 fg.down('button[action=delete]').setVisible(false);
		 } else {
			 fg.down('button[action=uploadfile]').setVisible(true);
			 fg.down('button[action=copy]').setVisible(true);
			 fg.down('button[action=share]').setVisible(true);
			 fg.down('button[action=move]').setVisible(true);
			 fg.down('button[action=delete]').setVisible(true);
		 }
		 var filestore = fg.getStore();
		 filestore.load({
			 params: {
			 	folderid: rec.data.FOLDERID
			 }
		 });
		 filestore.proxy.extraParams.folderid = rec.data.FOLDERID;
     },
     
     searchTheFolder: function(b) {
    	 var thiscontroller = this;
    	 var wn = b.up('window');
    	 var fr = wn.down('form').getForm();
    	 
    	 var formRecord = fr.getValues();
    	 var dquery = formRecord["FOLDERQUERY"];
    	 var dorder = formRecord["FOLDERORDER"];
    	 var dorderdirection = formRecord["FOLDERORDERDIRECTION"];
    	 var nodeStore = Ext.ComponentQuery.query('fileview')[0].getStore();
		 nodeStore.getRootNode().removeAll();
		 
		 nodeStore.load({
			 params: {
				 dquery: dquery,
				 dorder: dorder,
				 dorderdirection: dorderdirection
			 }
		 });
		 
     },
     
     renameTheFolder: function(b) {
    	 var thiscontroller = this;
    	 var wn = b.up('window');
    	 var fr = wn.down('form').getForm();
    	 if(fr.isValid()){
 			fr.submit({
 				waitMsg: 'Renaming folder, please wait...',
 				reset: true,
		  		success: function(form, action){
		  			var folderid = thiscontroller.folderid;
		  			
		  			var nodeStore = Ext.ComponentQuery.query('fileview')[0].getStore();
		  			nodeStore.getRootNode().removeAll();
		  			nodeStore.load();
		  			wn.close();
		  		}
 			});	
 		}
     },
     
     moveTheFolder: function(b) {
    	 var thiscontroller = this;
    	 var wn = b.up('window');
    	 var fr = wn.down('form').getForm();
    	 if(fr.isValid()){
 			fr.submit({
 				waitMsg: 'Moving, please wait...',
 				reset: true,
		  		success: function(form, action){
		  			var folderid = thiscontroller.folderid;
		  			var nodeStore = Ext.ComponentQuery.query('fileview')[0].getStore();
		  			nodeStore.getRootNode().removeAll();
		  			nodeStore.load();
		  			Ext.ComponentQuery.query('filegrid')[0].getStore().load();
		  			wn.close();
		  		}
 			});	
 		}
     },
     
     addTopFolder: function(b) {
    	 var thiscontroller = this;
    	 var wn = b.up('window');
    	 var fr = wn.down('form').getForm();
    	 if(fr.isValid()){
 			fr.submit({
 				waitMsg: 'Adding folder, please wait...',
 				reset: true,
		  		success: function(form, action){
		  			var folderid = thiscontroller.folderid;
		  			
		  			var nodeStore = Ext.ComponentQuery.query('fileview')[0].getStore();
		  			if(folderid) var rootNode = nodeStore.getNodeById(folderid);
		  			else var rootNode = nodeStore.getRootNode();
		  			
		  			rootNode.insertChild(0, action.result.newfolder); 
		  			if(folderid) rootNode.expand(rootNode.data);
		  			wn.close();
		  		}
 			});	
 		}
     },
     
     myFolderItemRightClicked: function(thisitem, record, item, index, re) {
    	 var thiscontroller = this;
    	 thiscontroller.folderid = record.data.FOLDERID;
    	 if (record.data.FOLDERID == "SHAREDFILES") {
    		 return true;
    	 }
    	 re.stopEvent();
         Ext.create('Ext.menu.Menu', {
         	listeners: {
 			    hide: function(dmenu) {
 			        Ext.destroy(dmenu);
 			    }
 			},
             items : [{
            	 text: 'Refresh',
            	 handler : function() {
            		 thiscontroller.refreshFolder(record);
                 }
             },{
                 text : 'Add',
                 handler : function(b) {
                	 var tfw = Ext.widget('topfolderwindow');
                     tfw.show();
                     var folderData = {
                    	FOLDERTYPE: 'CHILD',
                    	PARENTFOLDERID: record.data.FOLDERID,
                     	FOLDERDEPTH: record.data.FOLDERDEPTH
                     }
                     tfw.down('form').getForm().setValues(folderData);
                 }
             },{
            	 text: 'Move',
            	 handler : function() {
            		 thiscontroller.moveFolder(record);
                 }
             },{
            	 text: 'Delete',
            	 handler : function() {
            		 thiscontroller.deleteTopFolder(record);
                 }
             },{
            	 text: 'Rename',
            	 handler : function() {
            		 thiscontroller.renameFolder(record);
                 }
             },{
            	 text: 'Search',
            	 handler : function() {
            		 thiscontroller.searchFolder(record);
                 }
             }]
         }).showAt(re.getXY());
     },
     
     searchFolder: function(record) {
    	 var sfwin = Ext.widget('searchfolderview');
    	 sfwin.show();
     },
     
     refreshFolder: function(rec) {
    	 Ext.file.File.refreshMyFolder(rec.data.FOLDERID, rec.data.FOLDERDEPTH, function(result) {
    		 var treeStore = Ext.ComponentQuery.query('fileview')[0].getStore();
        	 treeStore.getRootNode().removeAll();
    		 treeStore.load();
    	 });
     },
     
     renameFolder: function(rec) {
    	 var rfwin = Ext.widget('renamefolderview');
    	 rfwin.show();
    	 var folderData = {
				 FOLDERID: rec.data.FOLDERID,
				 FOLDERNAME: rec.data.FOLDERNAME
         }
    	 rfwin.down('form').getForm().setValues(folderData);
     },
     
     moveFolder: function(rec) {
    	 var mfwin = Ext.widget('movefolder');
    	 mfwin.show();
    	 var folderData = {
				 FOLDERID: rec.data.FOLDERID,
				 FOLDERDEPTH: rec.data.FOLDERDEPTH
         }
    	 mfwin.down('form').getForm().setValues(folderData);
     },
     
     deleteTopFolder: function(record) {
    	 var res = window.confirm('This action may lose important data. Continue?');
    	 if(res) {
	    	 var dfolderid = record.data['FOLDERID'];
	    	 Ext.file.File.destroyMyFolder(dfolderid, function(result) {
	    		var treeStore = Ext.ComponentQuery.query('fileview')[0].getStore();
	  			treeStore.getRootNode().removeAll();
	  			treeStore.load(); 
	    	 });
    	 }
     },
     
     myFolderContextMenu: function(thisview, rawevent, eOpts) {
    	 var thiscontroller = this;
    	 thiscontroller.folderid = '';
    	 rawevent.stopEvent();
         Ext.create('Ext.menu.Menu', {
         	listeners: {
 			    hide: function(dmenu) {
 			        Ext.destroy(dmenu);
 			    }
 			},
             items : [{
                 text : 'New folder',
                 handler : function() {
                     var tfw = Ext.widget('topfolderwindow');
                     tfw.show();
                     var folderData = {
                    		FOLDERTYPE: 'PARENT',
                         	PARENTFOLDERID: '',
                          	FOLDERDEPTH: ''
                          }
                     tfw.down('form').getForm().setValues(folderData);
                 }
             },{
            	 text: 'Refresh',
            	 action: 'refresh',
            	 handler: function() {
            		 thiscontroller.refreshTree(thisview);
            	 }
             }]
         }).showAt(rawevent.getXY());


         return false;
     },
     
     refreshTree: function(thisview) {
		 var treeStore = thisview.up('panel').getStore();
		 treeStore.getRootNode().removeAll();
		 treeStore.load();
	 },
	 
	 uploadFile: function(b) {
		 var fuw = Ext.widget('uploadfilewindow');
		 var treeView = Ext.ComponentQuery.query("fileview")[0];
		 if (treeView.getSelectionModel().hasSelection()) {
             var selectedNode = treeView.getSelectionModel().getSelection();
             var folderid = selectedNode[0].data.FOLDERID;
             var folderData = {
          		FOLDERID: folderid
 		     }
         } else {
             Ext.MessageBox.alert('No selected folder!');
             return false;
         }
		 
		 fuw.down('form').getForm().setValues(folderData);
		 fuw.show();
	 },
	 
	 shareFile: function(b) {
		 var gobj = Ext.ComponentQuery.query("filegrid")[0];
		 if (gobj.getSelectionModel().hasSelection()) {
			 var swin = Ext.widget('sharewin');
			 swin.down('sharegrid').getStore().load();
			 swin.down('shareform').getStore().load();
			 swin.show();
		 } else {
			 Ext.MessageBox.alert('No selection to share!');
             return false;
		 }
	 },
	 
	 copyFile: function(b) {
		 
		 var gobj = Ext.ComponentQuery.query("filegrid")[0];
		 if (gobj.getSelectionModel().hasSelection()) {
			 var r = gobj.getSelectionModel().getSelection();
			 var folderData = {
					 FILEID: r[0].data.FILEID,
					 FILENAME: r[0].data.FILENAME + ' c' + new Date().toString().substr(0,24)
	         };
	    	 var cwin = Ext.widget('copywin');
	    	 cwin.down('form').getForm().setValues(folderData);
	    	 cwin.show();
		 } else {
			 Ext.MessageBox.alert('No selection to copy!');
             return false;
		 }
	 },
	 
	 moveFile: function(b) {
		 var gobj = Ext.ComponentQuery.query("filegrid")[0];
		 var gobjS = Ext.ComponentQuery.query("filegrid")[0].getStore();
		 if (gobj.getSelectionModel().hasSelection()) {
			 var r = gobj.getSelectionModel().getSelection();
			 var fileids = {};
			 for (var b = 0; b < r.length; b++) {
				 fileids[b] = r[b].data.FILEID;
			 }
			 var folderData = {
					 FILEID: JSON.stringify(fileids),
					 FOLDERID: r[0].data.FOLDERIDFK
	         };
	    	 var mfwin = Ext.widget('movefolder');
	    	 mfwin.down('form').getForm().setValues(folderData);
	    	 mfwin.show();
		 } else {
			 Ext.MessageBox.alert('No selection to move!');
             return false;
		 }
	 },
	 
	 deleteFile: function(b) {
		 var gobj = Ext.ComponentQuery.query("filegrid")[0];
		 var gobjS = Ext.ComponentQuery.query("filegrid")[0].getStore();
		 if (gobj.getSelectionModel().hasSelection()) {
			 var r = gobj.getSelectionModel().getSelection();
			 if (r.length > 1) var file = "files.";
			 else var file = "file."
			 var cres = window.confirm("This action will remove permanently the selected " + file);
			 if (cres) gobjS.remove(r);
		 } else {
			 Ext.MessageBox.alert('No selection to delete!');
             return false;
		 }
	 },
	 
	 
	 deleteSharedFile: function(b) {
		 var gobj = b.up("grid");
		 var gobjS = gobj.getStore();
		 if (gobj.getSelectionModel().hasSelection()) {
			 var r = gobj.getSelectionModel().getSelection();
			 if (r.length > 1) var file = "files.";
			 else var file = "file."
			 var cres = window.confirm("This action will remove shared " + file);
			 if (cres) gobjS.remove(r);
		 } else {
			 Ext.MessageBox.alert('No selection to remove!');
             return false;
		 }
	 }
});