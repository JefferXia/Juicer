(function(){var a={version:"0.2.2"};this.__cache={};this.__escapehtml={__escapehash:{"<":"&lt;",">":"&gt;",'"':"&quot;","&":"&amp;"},__escapereplace:function(b){return __escapehtml.__escapehash[b];},__escape:function(b){return typeof(b)!=="string"?b:b.replace(/[&<>"]/igm,__escapehtml.__escapereplace);}};a.settings={forstart:/{@each\s*([\w\.]*?)\s*as\s*(\w*?)(,\w*?)?}/igm,forend:/{@\/each}/igm,ifstart:/{@if\s*([^}]*?)}/igm,ifend:/{@\/if}/igm,elsestart:/{@else}/igm,interpolate:/\${([\s\S]+?)}/igm,noneencode:/\$\${([\s\S]+?)}/igm};a.template=function(){var b=this;this.__interpolate=function(d,f){var c=d.split("|"),e="";if(c.length>1){d=c.shift();e=c.shift();}return"<%= "+(f?"__escapehtml.__escape":"")+"("+e+"("+d+")) %>";};this.__shell=function(c){var d=0;c=c.replace(a.settings.forstart,function(i,f,h,g){var h=h||"value",g=g&&g.substr(1);var e="i"+d++;return"<% for(var "+e+"=0,l="+f+".length;"+e+"<l;"+e+"++) {var "+h+"="+f+"["+e+"];"+(g?("var "+g+"="+e+";"):"")+" %>";}).replace(a.settings.forend,"<% } %>").replace(a.settings.ifstart,function(e,f){return"<% if("+f+") { %>";}).replace(a.settings.ifend,"<% } %>").replace(a.settings.elsestart,function(e){return"<% } else { %>";}).replace(a.settings.noneencode,function(f,e){return b.__interpolate(e,false);}).replace(a.settings.interpolate,function(f,e){return b.__interpolate(e,true);});return c;};this.__pure=function(d,c){if(c&&c.loose===true){buf=this.__looseconvert(d);}else{buf=this.__convert(d);}return buf;};this.__convert=function(d){var c=[].join("");c+="var data=data||{};";c+="var out='';out+='";c+=d.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';out+=$1;out+='").split("<%").join("';").split("%>").join("out+='")+"';return out;";return c;};this.__looseconvert=function(d){var c=[].join("");c+="var data=data||{};";c+="var p=[];";c+="with(data) {p.push('"+d.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');};return p.join('');";return c;};this.parse=function(d,c){d=this.__shell(d);d=this.__pure(d,c);this.render=new Function("data",d);return this;};};a.compile=function(c,b){var d=__cache[c]?__cache[c]:new this.template().parse(c,b);if(!b||b.cache!==false){__cache[c]=d;}return d;};a.to_html=function(c,d,b){return this.compile(c,b).render(d);};typeof(module)!=="undefined"&&module.exports?module.exports=a:this.juicer=a;})();