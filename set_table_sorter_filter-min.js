var trans={"à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ě":"e","ę":"e","ð":"d","ì":"i","í":"i","î":"i","ï":"i","ł":"l","ñ":"n","ń":"n","ň":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ş":"s","š":"s","ý":"y","ÿ":"y","ž":"z","þ":"th","ß":"ss","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ě":"E","Ę":"E","Ð":"D","Ì":"I","Í":"I","Î":"I","Ï":"I","Ł":"L","Ñ":"N","Ń":"N","Ň":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ş":"S","Š":"S","Ý":"Y","Ÿ":"Y","Ž":"Z","Þ":"TH"};function set_to_lower_case_no_accents(d){var e;var a="";var b;for(b=0;b<d.length;b=b+1){e=d.substr(b,1);if(trans[e]){a+=trans[e]}else{a+=e}}return a.toLowerCase()}function SET_OverviewTable(a){var c=this;var b;this.myDebug=true;this.$myTable=a;a.find("thead tr.filter").each(function(){$(this).css("display","table-row")});this.myColumnHandlers=[];var d=0;a.find("thead tr.header").find("th").each(function(f,i){var e;var g;var h;c.myColumnHandlers[d]=null;e=$(i).attr("class");g=e.split(" ");for(b=0;b<g.length;b=b+1){if(g[b].substr(0,10)==="data-type-"){var j=g[b].substr(10);if(SET_OverviewTable.ourColumnTypeHandlers[j]){c.myColumnHandlers[d]=new SET_OverviewTable.ourColumnTypeHandlers[j]()}}}if(!c.myColumnHandlers[d]){c.myColumnHandlers[d]=new SET_NoneColumnTypeHandler()}c.myColumnHandlers[d].initFilter(c,a,f);c.myColumnHandlers[d].initSort(c,a,f,d);h=$(this).attr("colspan");if(h){d=d+parseFloat(h)}else{d=d+1}})}SET_OverviewTable.prototype.mergeInfo=function(b,a){if(b.length===0){a.sort_order=1;b[0]=a}else{if(a.sort_order!==false&&b[a.sort_order-1]){b[a.sort_order-1].sort_direction=a.sort_direction}else{a.sort_order=b.length;b[b.length]=a}}return b};SET_OverviewTable.prototype.getSortOrder=function(c,d){var b;var f;var g;var e;var a=false;b=c.attr("class");f=b.split(" ");for(e=0;e<f.length;e=e+1){g="sort-order"+d;if(f[e].substr(0,g.length)===g){a=parseInt(f[e].substr(g.length),10)}}return a};SET_OverviewTable.prototype.getSortDirection=function(a,b){if(a.hasClass("sorted"+b+"desc")){return"desc"}if(a.hasClass("sorted"+b+"asc")){return"asc"}return""};SET_OverviewTable.prototype.sort=function(b,a,i,f,e){var c;var g;var d;var h;if(this.myDebug){SET_OverviewTable.log("Start sort:");d=new Date();h=d}c=this.getSortInfo();if(this.myDebug){SET_OverviewTable.benchmark("Get all sort info - ",d);d=new Date()}g=this.getColumnSortInfo(b,a,f,e);if(this.myDebug){SET_OverviewTable.benchmark("Get info about current column - ",d);d=new Date()}this.cleanSortClasses();if(this.myDebug){SET_OverviewTable.benchmark("Reset column headers - ",d);d=new Date()}if(!b.ctrlKey){c=this.mergeInfo([],g);if(this.myDebug){SET_OverviewTable.benchmark("Merge info - ",d);d=new Date()}this.sortSingleColumn(c[0],i);if(this.myDebug){SET_OverviewTable.benchmark("Sorted by one column - ",d);d=new Date()}}else{c=this.mergeInfo(c,g);if(this.myDebug){SET_OverviewTable.benchmark("Merge info - ",d);d=new Date()}if(c.length===1){this.sortSingleColumn(c[0],i);if(this.myDebug){SET_OverviewTable.benchmark("Sorted by one column - ",d);d=new Date()}}else{this.sortMultiColumn(c);if(this.myDebug){SET_OverviewTable.benchmark("Sorted by "+c.length+" column - ",d);d=new Date()}}}this.addSortInfo(c);if(this.myDebug){SET_OverviewTable.benchmark("Added info to table head - ",d);d=new Date()}this.applyZebraTheme();if(this.myDebug){SET_OverviewTable.benchmark("Apply zebra theme - ",d);SET_OverviewTable.benchmark("Finished for - ",h)}};SET_OverviewTable.prototype.getSortInfo=function(){var f=0;var b=[];var c;var a;var e;var d=this;var g;this.$myTable.find("thead tr.header").find("th").each(function(h,j){var i=$(j);c=$(this).attr("colspan");if(!c||c==="1"){a=d.getSortOrder(i,"-");if(a){b[a-1]={column_index:f,header_index:h,sort_order:a,sort_direction:d.getSortDirection(i,"-"),infix:"-",colspan:1,offset:0}}}else{if(c==="2"){if(i.hasClass("sort-1")){a=d.getSortOrder(i,"-1-");if(a){b[a-1]={column_index:f,header_index:h,sort_order:a,sort_direction:d.getSortDirection(i,"-1-"),infix:"-1-",colspan:2,offset:0}}}if(i.hasClass("sort-2")){a=d.getSortOrder(i,"-2-");if(a){b[a-1]={column_index:f,header_index:h,sort_order:d.getSortDirection(i,"-2-"),sort_direction:e,infix:"-2-",colspan:2,offset:1}}}}}if(c){f=f+parseFloat(c)}else{f=f+1}});return b};SET_OverviewTable.prototype.getColumnSortInfo=function(b,a,e,d){var l;var c={};var i;var h;var g;var m=this.$myTable;var k;var j;function f(p,n,o){var q;q=p.getSortDirection(n,o);if(q==="desc"||q===""){return"asc"}return"desc"}c.column_index=d;c.header_index=e;l=a.attr("colspan");if(!l||l==="1"){c.infix="-";c.colspan=1;c.offset=0;c.sort_order=this.getSortOrder(a,c.infix);c.sort_direction=f(this,a,c.infix)}else{if(l==="2"){if(a.hasClass("sort-1")&&a.hasClass("sort-2")){j=b.pageX-a.offset().left;i=m.find("tbody > tr:visible:first > td:eq("+d+")").outerWidth();h=m.find("tbody > tr:visible:first > td:eq("+(d+1)+")").outerWidth();g=a.outerWidth();k=g-i-h;if(j<((2*i-k)/2)){c.infix="-1-";c.colspan=2;c.offset=0;c.sort_order=this.getSortOrder(a,c.infix);c.sort_direction=f(this,a,c.infix)}else{if(j>((2*i+k)/2)){c.infix="-2-";c.colspan=2;c.offset=1;c.sort_order=this.getSortOrder(a,c.infix);c.sort_direction=f(this,a,c.infix)}}}else{if(a.hasClass("sort-1")){c.infix="-1-";c.colspan=2;c.offset=0;c.sort_order=this.getSortOrder(a,c.infix);c.sort_direction=f(this,a,c.infix)}else{if(a.hasClass("sort-2")){c.infix="-2-";c.colspan=2;c.offset=1;c.sort_order=this.getSortOrder(a,c.infix);c.sort_direction=f(this,a,c.infix)}}}}}return c};SET_OverviewTable.prototype.cleanSortClasses=function(){var b=this;var a;for(a=0;a<b.myColumnHandlers.length;a=a+1){b.$myTable.children("thead").find("th").removeClass("sort-order-"+a)}b.$myTable.children("thead").find("th").removeClass("sorted-asc").removeClass("sorted-desc");b.$myTable.children("thead").find("th > span").removeClass("sorted-asc").removeClass("sorted-desc")};SET_OverviewTable.prototype.addSortInfo=function(d){var a;var b;var c;for(c=0;c<d.length;c=c+1){a=c+1;b=this.$myTable.children("thead").find("tr.header").find("th").eq(d[c].header_index);b.addClass("sort-order"+d[c].infix+a);b.addClass("sorted"+d[c].infix+d[c].sort_direction)}};SET_OverviewTable.prototype.applyZebraTheme=function(){var a=true;this.$myTable.children("tbody").children("tr").each(function(){var b=$(this);if(this.style.display!=="none"){if(a===true){b.removeClass("odd").addClass("even")}else{b.removeClass("even").addClass("odd")}a=!a}})};SET_OverviewTable.prototype.sortSingleColumn=function(b,e){var h;var g;var f;var d;var c;if(!b.infix){return}if(b.sort_direction==="asc"){f=1}else{f=-1}h=b.column_index+b.offset;g=this.$myTable.children("tbody").children("tr").get();for(d=0;d<g.length;d=d+1){var a=g[d].cells[h];g[d].sortKey=e.getSortKey(a)}g.sort(function(j,i){return f*e.compareSortKeys(j.sortKey,i.sortKey)});c=this.$myTable.children("tbody")[0];for(d=0;d<g.length;d=d+1){g[d].sortKey=null;c.appendChild(g[d])}};SET_OverviewTable.prototype.sortMultiColumn=function(sorting_info){var dir;var cmp;var i,j;var sort_func="";var rows;var cell;var column_handler;var tbody;var that=this;var multi_cmp=null;sort_func+="multi_cmp = function (row1, row2) {\n";sort_func+="  var cmp;\n";for(i=0;i<sorting_info.length;i=i+1){dir=1;if(sorting_info[i].sort_direction==="desc"){dir=-1}sort_func+="  cmp = that.myColumnHandlers["+sorting_info[i].column_index+"].compareSortKeys(row1.sortKey["+i+"], row2.sortKey["+i+"]);\n";sort_func+="  if (cmp !== 0) {\n";sort_func+="    return cmp * "+dir+";\n";sort_func+="  }\n"}sort_func+="  return 0;\n";sort_func+="};\n";rows=this.$myTable.children("tbody").children("tr").get();for(i=0;i<rows.length;i=i+1){rows[i].sortKey=[];for(j=0;j<sorting_info.length;j=j+1){column_handler=this.myColumnHandlers[sorting_info[j].column_index];cell=rows[i].cells[sorting_info[j].column_index];rows[i].sortKey[j]=column_handler.getSortKey(cell)}}eval(sort_func);rows.sort(multi_cmp);tbody=this.$myTable.children("tbody")[0];for(i=0;i<rows.length;i=i+1){rows[i].sortKey=null;tbody.appendChild(rows[i])}};SET_OverviewTable.prototype.filter=function(){var c=[];var a;var b=this;for(a=0;a<this.myColumnHandlers.length;a=a+1){if(this.myColumnHandlers[a]&&this.myColumnHandlers[a].startFilter()){c[a]=this.myColumnHandlers[a]}else{c[a]=null}}if(c.length===0){this.$myTable.children("tbody").children("tr").show();b.applyZebraTheme()}else{this.$myTable.children("tbody").children("tr").hide();this.$myTable.children("tbody").children("tr").each(function(){var e;var d=1;var f=$(this);for(e=0;e<c.length;e+=1){if(c[e]&&!c[e].simpleFilter(this.cells[e])){d=0;break}}if(d===1){f.show();b.applyZebraTheme()}})}};SET_OverviewTable.registerColumnTypeHandler=function(b,a){SET_OverviewTable.ourColumnTypeHandlers[b]=a};SET_OverviewTable.filterTrigger=function(a){a.data.table.filter(a,a.data.element)};SET_OverviewTable.benchmark=function(a,b){SET_OverviewTable.log(a+(new Date().getTime()-b.getTime())+"ms")};SET_OverviewTable.log=function(a){if(console!=="undefined"&&console.debug!=="undefined"){console.log(a)}else{alert(a)}};SET_OverviewTable.ourTables=[];SET_OverviewTable.ourColumnTypeHandlers={};SET_OverviewTable.registerTable=function(a){$(a).each(function(){var b=$(this);if(b.is("table")){SET_OverviewTable.ourTables[SET_OverviewTable.ourTables.length]=new SET_OverviewTable(b)}else{b.find("table").each(function(){SET_OverviewTable.ourTables[SET_OverviewTable.ourTables.length]=new SET_OverviewTable($(this))})}})};function SET_NoneColumnTypeHandler(){}SET_NoneColumnTypeHandler.prototype.startFilter=function(){return false};SET_NoneColumnTypeHandler.prototype.initSort=function(a,c,b,d){return false};SET_NoneColumnTypeHandler.prototype.initFilter=function(a,c,b,e){var d;d=c.children("thead").find("tr.filter").find("td").eq(b);d.html("");d.width(d.css("width"))};SET_OverviewTable.registerColumnTypeHandler("none",SET_NoneColumnTypeHandler);function SET_TextColumnTypeHandler(){this.$myInput=null;this.myFilterValue=null}SET_TextColumnTypeHandler.prototype.startFilter=function(){this.myFilterValue=this.$myInput.val();return(this.myFilterValue!=="")};SET_TextColumnTypeHandler.prototype.simpleFilter=function(b){var a;a=this.extractForFilter(b);return(a.indexOf(this.myFilterValue)!==-1)};SET_TextColumnTypeHandler.prototype.initSort=function(a,d,c,f){var e=this;var b;b=d.children("thead").find("tr.header").find("th").eq(c);if(b.hasClass("sort")||b.hasClass("sort-1")||b.hasClass("sort-2")){b.click(function(g){a.sort(g,b,e,c,f)})}};SET_TextColumnTypeHandler.prototype.initFilter=function(a,c,b){var d=this;this.$myInput=c.children("thead").find("tr.filter").find("td").eq(b).find("input");this.$myInput.val("");this.$myInput.keyup(function(e){if(e.keyCode===27){d.$myInput.val("")}});this.$myInput.keyup({table:a,element:this.$myInput},SET_OverviewTable.filterTrigger);this.$myInput.width(this.$myInput.closest("td").width()-parseInt(this.$myInput.css("margin-left"),10)-parseInt(this.$myInput.css("border-left-width"),10)-parseInt(this.$myInput.css("border-right-width"),10)-parseInt(this.$myInput.css("margin-right"),10));this.$myInput.css("visibility","visible")};SET_TextColumnTypeHandler.prototype.extractForFilter=function(a){return set_to_lower_case_no_accents($(a).text())};SET_TextColumnTypeHandler.prototype.getSortKey=function(a){return set_to_lower_case_no_accents($(a).text())};SET_TextColumnTypeHandler.prototype.compareSortKeys=function(b,a){if(b<a){return -1}if(b>a){return 1}return 0};SET_OverviewTable.registerColumnTypeHandler("text",SET_TextColumnTypeHandler);SET_OverviewTable.registerColumnTypeHandler("email",SET_TextColumnTypeHandler);function SET_NumericColumnTypeHandler(){}SET_NumericColumnTypeHandler.prototype=Object.create(SET_TextColumnTypeHandler.prototype);SET_NumericColumnTypeHandler.constructor=SET_NumericColumnTypeHandler;SET_NumericColumnTypeHandler.prototype.getSortKey=function(c){var a;var b;a=/[\d\.,\-\+]*/;b=a.exec($(c).text());return parseInt(b[0].replace(",","."),10)};SET_NumericColumnTypeHandler.prototype.compareSortKeys=function(b,a){if(b===a){return 0}if(b===""&&!isNaN(a)){return -1}if(a===""&&!isNaN(b)){return 1}return b-a};SET_OverviewTable.registerColumnTypeHandler("numeric",SET_NumericColumnTypeHandler);