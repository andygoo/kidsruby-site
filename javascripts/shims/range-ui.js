!function(t){var i=function(t){return"number"==typeof t||t&&t==1*t},e=function(t,i){return"number"==typeof t||t&&t==1*t?1*t:i},s=["step","min","max","readonly","title","disabled","tabindex"],n={_create:function(){var i;for(this.element.addClass("ws-range").attr({role:"slider"}).append('<span class="ws-range-min ws-range-progress" /><span class="ws-range-rail ws-range-track"><span class="ws-range-thumb" /></span>'),this.trail=t(".ws-range-track",this.element),this.range=t(".ws-range-progress ",this.element),this.thumb=t(".ws-range-thumb",this.trail),this.updateMetrics(),this.orig=this.options.orig,i=0;s.length>i;i++)this[s[i]](this.options[s[i]]);this.value=this._value,this.value(this.options.value),this.initDataList(),this.element.data("rangeUi",this),this.addBindings(),this._init=!0},value:t.noop,_value:function(i,e,s){var n,o,a=this.options,r=i,h={},l={};e||parseFloat(i,10)==i||(i=a.min+(a.max-a.min)/2),e||(i=this.normalizeVal(i)),n=100*((i-a.min)/(a.max-a.min)),this._init&&i==a.value&&r==i||(this.options.value=i,this.thumb.stop(),this.range.stop(),l[this.dirs.width]=n+"%",this.vertical&&(n=Math.abs(n-100)),h[this.dirs.left]=n+"%",s?(s="object"!=typeof s?{}:t.extend({},s),s.duration||(o=Math.abs(n-parseInt(this.thumb[0].style[this.dirs.left]||50,10)),s.duration=Math.max(Math.min(999,5*o),99)),this.thumb.animate(h,s),this.range.animate(l,s)):(this.thumb.css(h),this.range.css(l)),this.orig&&(r!=i||!this._init&&this.orig.value!=i)&&this.options._change(i),this.element.attr({"aria-valuenow":this.options.value,"aria-valuetext":this.options.textValue?this.options.textValue(this.options.value):this.options.options[this.options.value]||this.options.value}))},initDataList:function(){if(this.orig){var i,e=this,s=function(){t(e.orig).jProp("list").off("updateDatalist",s).on("updateDatalist",s),clearTimeout(i),i=setTimeout(function(){e.list&&e.list()},9)};t(this.orig).on("listdatalistchange",s),this.list()}},list:function(){var e=this.options,s=e.min,n=e.max,o=this.trail,a=this;this.element.attr({"aria-valuetext":e.options[e.value]||e.value}),t(".ws-range-ticks",o).remove(),t(this.orig).jProp("list").find("option:not([disabled])").each(function(){e.options[t.prop(this,"value")]=t.prop(this,"label")||""}),t.each(e.options,function(r,h){if(!(!i(r)||s>r||r>n)){var l=100*((r-s)/(n-s)),u=e.showLabels&&h?' title="'+h+'"':"";a.vertical&&(l=Math.abs(l-100)),a.posCenter(t('<span class="ws-range-ticks"'+u+' data-label="'+h+'" style="'+a.dirs.left+": "+l+'%;" />').appendTo(o))}})},readonly:function(t){t=!!t,this.options.readonly=t,this.element.attr("aria-readonly",""+t),this._init&&this.updateMetrics()},disabled:function(t){t=!!t,this.options.disabled=t,t?this.element.attr({tabindex:-1,"aria-disabled":"true"}):this.element.attr({tabindex:this.options.tabindex,"aria-disabled":"false"}),this._init&&this.updateMetrics()},tabindex:function(t){this.options.tabindex=t,this.options.disabled||this.element.attr({tabindex:t})},title:function(t){this.element.prop("title",t)},min:function(t){this.options.min=e(t,0),this.value(this.options.value,!0)},max:function(t){this.options.max=e(t,100),this.value(this.options.value,!0)},step:function(t){var i=this.options,s="any"==t?"any":e(t,1);i.stepping&&("any"!=s&&i.stepping%s?webshims.error("wrong stepping value for type range:"+i.stepping%s):s=i.stepping),i.step=s,this.value(this.options.value)},normalizeVal:function(t){var i,e,s,n=this.options;return n.min>=t?t=n.min:t>=n.max?t=n.max:"any"!=n.step&&(s=n.step,i=(t-n.min)%s,e=t-i,2*Math.abs(i)>=s&&(e+=i>0?s:-s),t=1*e.toFixed(5)),t},doStep:function(t,i){var s=e(this.options.step,1);"any"==this.options.step&&(s=Math.min(s,(this.options.max-this.options.min)/10)),this.value(this.options.value+s*t,!1,i)},getStepedValueFromPos:function(t){var i,e,s,n;return 0>=t?i=this.options[this.dirs.min]:t>100?i=this.options[this.dirs.max]:(this.vertical&&(t=Math.abs(t-100)),i=(this.options.max-this.options.min)*(t/100)+this.options.min,n=this.options.step,"any"!=n&&(e=(i-this.options.min)%n,s=i-e,2*Math.abs(e)>=n&&(s+=e>0?n:-n),i=1*s.toFixed(5))),i},addRemoveClass:function(t,i){var e,s=-1!=this.element.prop("className").indexOf(t);!i&&s?(e="removeClass",this.element.removeClass(t),this.updateMetrics()):i&&!s&&(e="addClass"),e&&(this.element[e](t),this._init&&this.updateMetrics())},addBindings:function(){var i,e,s,n,o=this,a=this.options,r=function(){var i={};return{init:function(e,s,n){i[e]||(i[e]={fn:n},o.orig&&t(o.orig).on(e,function(){i[e].val=t.prop(o.orig,"value")})),i[e].val=s},call:function(t,e){i[t].val!=e&&(clearTimeout(i[t].timer),i[t].val=e,i[t].timer=setTimeout(function(){i[t].fn(e,o)},0))}}}(),h=function(){var t={touchstart:1,touchend:1,touchmove:1},i=["pageX","pageY"];return function(e){if(t[e.type]&&e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length)for(var s=0;i.length>s;s++)e[i[s]]=e.originalEvent.touches[0][i[s]];return e}}(),l=function(t,s){"touchmove"==t.type&&(t.preventDefault(),h(t));var n=o.getStepedValueFromPos((t[o.dirs.mouse]-i)*e);n!=a.value&&(o.value(n,!1,s),r.call("input",n)),t&&"mousemove"==t.type&&t.preventDefault()},u=function(i){i&&"mouseup"==i.type&&(r.call("input",a.value),r.call("change",a.value)),o.addRemoveClass("ws-active"),t(document).off("mousemove touchmove",l).off("mouseup touchend",u),t(window).off("blur",p),n=!1},p=function(t){t.target==window&&u()},m=function(s){var r;if(!n&&("touchstart"!=s.type||s.originalEvent&&s.originalEvent.touches&&1==s.originalEvent.touches.length)&&(s.preventDefault(),t(document).off("mousemove touchmove",l).off("mouseup touchend",u),t(window).off("blur",p),!a.readonly&&!a.disabled)){if(h(s),o.element.focus(),o.addRemoveClass("ws-active",!0),i=o.element.focus().offset(),e=o.element[o.dirs.innerWidth](),!e||!i)return;r=o.thumb[o.dirs.outerWidth](),i=i[o.dirs.pos],e=100/e,l(s,a.animate),n=!0,t(document).on("touchstart"==s.type?{touchend:u,touchmove:l}:{mouseup:u,mousemove:l}),t(window).on("blur",p),s.stopPropagation()}},d={"touchstart mousedown":m,focus:function(){a.disabled||s||(r.init("input",a.value),r.init("change",a.value),o.addRemoveClass("ws-focus",!0),o.updateMetrics()),s=!0},blur:function(){o.element.removeClass("ws-focus ws-active"),o.updateMetrics(),s=!1,r.init("input",a.value),r.call("change",a.value)},keyup:function(){o.addRemoveClass("ws-active"),r.call("input",a.value),r.call("change",a.value)},keydown:function(t){var i=!0,e=t.keyCode;a.readonly||a.disabled||(39==e||38==e?o.doStep(1):37==e||40==e?o.doStep(-1):33==e?o.doStep(10,a.animate):34==e?o.doStep(-10,a.animate):36==e?o.value(o.options.max,!1,a.animate):35==e?o.value(o.options.min,!1,a.animate):i=!1,i&&(o.addRemoveClass("ws-active",!0),r.call("input",a.value),t.preventDefault()))}};r.init("input",a.value,this.options.input),r.init("change",a.value,this.options.change),d[t.fn.mwheelIntent?"mwheelIntent":"mousewheel"]=function(t,i){i&&s&&!a.readonly&&!a.disabled&&(o.doStep(i),t.preventDefault(),r.call("input",a.value))},this.element.on(d),this.thumb.on({mousedown:m}),this.orig&&t(this.orig).jProp("form").on("reset",function(){var i=t.prop(o.orig,"value");o.value(i),setTimeout(function(){var e=t.prop(o.orig,"value");i!=e&&o.value(e)},4)}),window.webshims&&webshims.ready("WINDOWLOAD",function(){webshims.ready("dom-support",function(){t.fn.onWSOff&&o.element.onWSOff("updateshadowdom",function(){o.updateMetrics()})}),!t.fn.onWSOff&&webshims._polyfill&&webshims._polyfill(["dom-support"])})},posCenter:function(t,i){var e;!this.options.calcCenter||this._init&&!this.element[0].offsetWidth||(t||(t=this.thumb),i||(i=t[this.dirs.outerWidth]()),i/=-2,t.css(this.dirs.marginLeft,i),this.options.calcTrail&&t[0]==this.thumb[0]&&(e=this.element[this.dirs.innerHeight](),t.css(this.dirs.marginTop,(t[this.dirs.outerHeight]()-e)/-2),this.range.css(this.dirs.marginTop,(this.range[this.dirs.outerHeight]()-e)/-2),i*=-1,this.trail.css(this.dirs.left,i).css(this.dirs.right,i)))},updateMetrics:function(){var t=this.element.innerWidth();this.vertical=t&&this.element.innerHeight()-t>10,this.dirs=this.vertical?{mouse:"pageY",pos:"top",min:"max",max:"min",left:"top",right:"bottom",width:"height",innerWidth:"innerHeight",innerHeight:"innerWidth",outerWidth:"outerHeight",outerHeight:"outerWidth",marginTop:"marginLeft",marginLeft:"marginTop"}:{mouse:"pageX",pos:"left",min:"min",max:"max",left:"left",right:"right",width:"width",innerWidth:"innerWidth",innerHeight:"innerHeight",outerWidth:"outerWidth",outerHeight:"outerHeight",marginTop:"marginTop",marginLeft:"marginLeft"},this.element[this.vertical?"addClass":"removeClass"]("vertical-range")[this.vertical?"addClass":"removeClass"]("horizontal-range"),this.posCenter()}},o=function(t){function i(){}return i.prototype=t,new i};t.fn.rangeUI=function(i){return i=t.extend({readonly:!1,disabled:!1,tabindex:0,min:0,step:1,max:100,value:50,input:t.noop,change:t.noop,_change:t.noop,showLabels:!0,options:{},calcCenter:!0,calcTrail:!0},i),this.each(function(){var e=t.extend(o(n),{element:t(this)});e.options=i,e._create.call(e)})},window.webshims&&webshims.isReady&&(webshims.ready("es5",function(){webshims.isReady("range-ui",!0)}),webshims._polyfill&&webshims._polyfill(["es5"]))}(window.webshims?webshims.$:jQuery);