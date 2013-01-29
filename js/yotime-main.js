//===============================初始化界面========================================
$(function(){
	Begin_LeftMenu();//初始化左侧菜单
	Begin_Tabs();//初始化tabs选项卡
	Begin_CenterMenu();//初始化主体区域右键菜单
	//绑定折叠顶部事件
	$("#closeHead").live('click',function(){
		resizePanel('auto',10,'north');
	});
});
//=================================左侧菜单========================================
//初始化左侧菜单
function Begin_LeftMenu(){
	$("#LeftAccordion").accordion({animate:true,fit:true,border:false});
	var selectMenu="";
	var _menus=[{"menuID":"0","menuName":"本地地址伸缩面板","icon":"icon-reload",
				 "child":[{"name":"弹窗功能","href":"demo-massger.html"},
						  {"name":"panel-window","href":"demo-panel.html"}]
				},
				{"menuID":"1","menuName":"远程地址伸缩面板","icon":"icon-reload",
				 "child":[{"name":"yotime","href":"http://www.yotime.com"},
						  {"name":"baidu","href":"http://www.baidu.com"}]
				},
				{"menuID":"2","menuName":"远程地址伸缩面板","icon":"icon-reload",
				 "child":[{"name":"163","href":"http://www.163.com"},
						  {"name":"sohu","href":"http://www.sohu.com"}]
				}];
	$.each(_menus,function(i){
		var _acCon="";
		$.each(_menus[i]["child"],function(j){
			_acCon+="<a href=\"javascript:void(0);\" onClick=\"ui_CreatTabs('"+_menus[i]["child"][j]["name"]+"','"+_menus[i]["child"][j]["href"]+"');\">"+_menus[i]["child"][j]["name"]+"</a>"
		});
		ui_CreatAccordion(_menus[i]["menuName"],_acCon,_menus[i]["icon"]);
		if(_menus[i]["menuID"]=="0")
		{
			selectMenu=_menus[i]["menuName"];
		}
	});
	$('#LeftAccordion').accordion('select',selectMenu);
}
//==========================tabs选项卡================================
//初始化选项卡设置
function Begin_Tabs(){
	//设置选项卡自动填充,无边框
	$("#MainTabs").tabs({fit:true,border:false});
	//双击关闭选项卡事件
	$(".tabs-inner").live('dblclick',function(){
		var _title=$(this).find("span.tabs-title").text();
		closeTabs(_title);
	});
}
//========================================鼠标右键menu=====================================
//初始化主体区域右键菜单事件
function Begin_CenterMenu(){
	//绑定右键菜单事件
	$(".tabs-inner").live("contextmenu",function(e){
		$("#centerMenu").menu('show',{
			left:e.pageX,
			top:e.pageY
		});
		var _tabsTitle=$(this).find(".tabs-title").text();
		$("#MainTabs").tabs('select',_tabsTitle);
		return false;
	});
	$("#centerMenu").menu({
		onClick:function(item){
			centerMenu_click(item.id);
		}
	});
}
//选项卡右键菜单单击事件
function centerMenu_click(action){
	var _selectedTabs=$("#MainTabs").tabs('getSelected');
	var _selectedTitle=_selectedTabs.panel('options').title;
	var _alltabs=$("#MainTabs").tabs('tabs');
	var _alltabsTitle=[];
	$.each(_alltabs,function(i){
		_alltabsTitle.push(_alltabs[i].panel('options').title);
	});
	switch(action){
		case "menu_ThisClose"://关闭当前选项卡
			closeTabs(_selectedTitle);
		break;
		case "menu_AllClose"://关闭所有选项卡
			for(var i=0;i<_alltabsTitle.length;i++)
			{closeTabs(_alltabsTitle[i]);}
		break;
		case "menu_OtherClose"://关闭其它选项卡
			for(var i=0;i<_alltabsTitle.length;i++)
			{	
				if(_alltabsTitle[i]!=_selectedTitle)
				{closeTabs(_alltabsTitle[i]);}
			}
		break;
		case "menu_ThisRefresh"://刷新选中的选项卡
			refreshTabs();
		break;
	}
}