(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{249:function(t,e,r){"use strict";r(25);var n=r(1),o=r(0);e.a=o.a.extend({name:"measurable",props:{height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},computed:{measurableStyles:function(){var t={},e=Object(n.a)(this.height),r=Object(n.a)(this.minHeight),o=Object(n.a)(this.minWidth),c=Object(n.a)(this.maxHeight),l=Object(n.a)(this.maxWidth),d=Object(n.a)(this.width);return e&&(t.height=e),r&&(t.minHeight=r),o&&(t.minWidth=o),c&&(t.maxHeight=c),l&&(t.maxWidth=l),d&&(t.width=d),t}}})},250:function(t,e,r){"use strict";r(2),r(251),r(253);var n=r(16);r(25);var o=r(0).a.extend({name:"elevatable",props:{elevation:[Number,String]},computed:{computedElevation:function(){return this.elevation},elevationClasses:function(){return this.computedElevation?(t={},e="elevation-"+this.computedElevation,r=!0,e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t):{};var t,e,r}}}),c=r(249),l=r(10),d=r(3),v=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var e in source)Object.prototype.hasOwnProperty.call(source,e)&&(t[e]=source[e])}return t},h=Object(d.a)(n.a,o,c.a,l.a).extend({name:"v-sheet",props:{tag:{type:String,default:"div"},tile:Boolean},computed:{classes:function(){return v({"v-sheet":!0,"v-sheet--tile":this.tile},this.themeClasses,this.elevationClasses)},styles:function(){return this.measurableStyles}},render:function(t){var data={class:this.classes,style:this.styles,on:this.$listeners};return t(this.tag,this.setBackgroundColor(this.color,data),this.$slots.default)}}),m=r(59),f=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var e in source)Object.prototype.hasOwnProperty.call(source,e)&&(t[e]=source[e])}return t};e.a=Object(d.a)(m.a,h).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,raised:Boolean},computed:{classes:function(){return f({"v-card":!0,"v-card--flat":this.flat,"v-card--hover":this.hover},h.options.computed.classes.call(this))},styles:function(){var style=f({},h.options.computed.styles.call(this));return this.img&&(style.background='url("'+this.img+'") center center / cover no-repeat'),style}},render:function(t){var e=this.generateRouteLink(this.classes),r=e.tag,data=e.data;return data.style=this.styles,t(r,this.setBackgroundColor(this.color,data),this.$slots.default)}})},251:function(t,e,r){var content=r(252);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("be70614c",content,!0,{sourceMap:!1})},252:function(t,e,r){(t.exports=r(12)(!1)).push([t.i,".v-card-fw .v-list--dense,.v-card-fw .v-list--dense .v-list__tile{height:auto}.v-card-fw .v-card__title{padding-bottom:0}.v-card-fw .v-card-head{padding-bottom:16px}.v-card-fw .v-card-head .v-card__title{justify-content:flex-start}.v-card-fw .v-card-head i{color:#757575}.v-card-actions--bottom{position:absolute;left:0;bottom:0}.v-btn-home{text-transform:lowercase;font-family:monospace}.v-btn-home.v-btn--active:before{background-color:transparent}.theme--light.v-card{background-color:#fff;border-color:#fff;color:rgba(0,0,0,.87)}.theme--dark.v-card{background-color:#424242;border-color:#424242;color:#fff}.v-card{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);text-decoration:none}.v-card>:first-child:not(.v-btn):not(.v-chip){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.v-card--hover{cursor:pointer;transition:all .4s cubic-bezier(.25,.8,.25,1);transition-property:box-shadow}.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;padding:16px}.v-card__title--primary{padding-top:24px}.v-card__text{padding:16px;width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions .v-btn,.v-card__actions>*{margin:0}.v-card__actions .v-btn+.v-btn{margin-left:8px}",""])},253:function(t,e,r){var content=r(254);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("74d835da",content,!0,{sourceMap:!1})},254:function(t,e,r){(t.exports=r(12)(!1)).push([t.i,".v-card-fw .v-list--dense,.v-card-fw .v-list--dense .v-list__tile{height:auto}.v-card-fw .v-card__title{padding-bottom:0}.v-card-fw .v-card-head{padding-bottom:16px}.v-card-fw .v-card-head .v-card__title{justify-content:flex-start}.v-card-fw .v-card-head i{color:#757575}.v-card-actions--bottom{position:absolute;left:0;bottom:0}.v-btn-home{text-transform:lowercase;font-family:monospace}.v-btn-home.v-btn--active:before{background-color:transparent}.theme--light.v-sheet{background-color:#fff;border-color:#fff;color:rgba(0,0,0,.87)}.theme--dark.v-sheet{background-color:#424242;border-color:#424242;color:#fff}.v-sheet{display:block;border-radius:2px;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-sheet--tile{border-radius:0}",""])},255:function(t,e,r){var content=r(256);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("5470a08c",content,!0,{sourceMap:!1})},256:function(t,e,r){(t.exports=r(12)(!1)).push([t.i,".v-card-fw .v-list--dense,.v-card-fw .v-list--dense .v-list__tile{height:auto}.v-card-fw .v-card__title{padding-bottom:0}.v-card-fw .v-card-head{padding-bottom:16px}.v-card-fw .v-card-head .v-card__title{justify-content:flex-start}.v-card-fw .v-card-head i{color:#757575}.v-card-actions--bottom{position:absolute;left:0;bottom:0}.v-btn-home{text-transform:lowercase;font-family:monospace}.v-btn-home.v-btn--active:before{background-color:transparent}.v-image{z-index:0}.v-image__image,.v-image__placeholder{z-index:-1;position:absolute;top:0;left:0;width:100%;height:100%}.v-image__image{background-repeat:no-repeat}.v-image__image--preload{-webkit-filter:blur(2px);filter:blur(2px)}.v-image__image--contain{background-size:contain}.v-image__image--cover{background-size:cover}",""])},257:function(t,e,r){var content=r(258);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("27f0eb42",content,!0,{sourceMap:!1})},258:function(t,e,r){(t.exports=r(12)(!1)).push([t.i,".v-card-fw .v-list--dense,.v-card-fw .v-list--dense .v-list__tile{height:auto}.v-card-fw .v-card__title{padding-bottom:0}.v-card-fw .v-card-head{padding-bottom:16px}.v-card-fw .v-card-head .v-card__title{justify-content:flex-start}.v-card-fw .v-card-head i{color:#757575}.v-card-actions--bottom{position:absolute;left:0;bottom:0}.v-btn-home{text-transform:lowercase;font-family:monospace}.v-btn-home.v-btn--active:before{background-color:transparent}.v-responsive{position:relative;overflow:hidden;flex:1 0 auto;display:flex}.v-responsive__content{flex:1 0 0px}.v-responsive__sizer{transition:padding-bottom .2s cubic-bezier(.25,.8,.5,1);flex:0 0 0px}",""])},259:function(t,e,r){"use strict";var n=r(0);e.a=n.a.extend({name:"v-card-title",functional:!0,props:{primaryTitle:Boolean},render:function(t,e){var data=e.data,r=e.props,n=e.children;return data.staticClass=("v-card__title "+(data.staticClass||"")).trim(),r.primaryTitle&&(data.staticClass+=" v-card__title--primary"),t("div",data,n)}})},260:function(t,e,r){"use strict";r(25),r(255),r(257);var n=r(249),o=r(3),c=Object(o.a)(n.a).extend({name:"v-responsive",props:{aspectRatio:[String,Number]},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content"},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),l=r(9);e.a=c.extend({name:"v-img",props:{alt:String,contain:Boolean,src:{type:[String,Object],default:""},gradient:String,lazySrc:String,srcset:String,sizes:String,position:{type:String,default:"center center"},transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0}},computed:{computedAspectRatio:function(){return this.normalisedSrc.aspect},normalisedSrc:function(){return"string"==typeof this.src?{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||this.calculatedAspectRatio)}:{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect||this.calculatedAspectRatio)}},__cachedImage:function(){if(!this.normalisedSrc.src&&!this.normalisedSrc.lazySrc)return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient("+this.gradient+")"),e&&t.push('url("'+e+'")');var image=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[image]):image}},watch:{src:function(){this.isLoading?this.loadImage():this.init()},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(){if(this.normalisedSrc.lazySrc){var t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src)},onError:function(){Object(l.a)("Image load failed\n\nsrc: "+this.normalisedSrc.src,this),this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,image=new Image;this.image=image,image.onload=function(){image.decode?image.decode().catch(function(e){Object(l.b)("Failed to decode image, trying to render anyway\n\nsrc: "+t.normalisedSrc.src+(e.message?"\nOriginal error: "+e.message:""),t)}).then(t.onLoad):t.onLoad()},image.onerror=this.onError,image.src=this.normalisedSrc.src,this.sizes&&(image.sizes=this.sizes),this.normalisedSrc.srcset&&(image.srcset=this.normalisedSrc.srcset),this.aspectRatio||this.pollForSize(image),this.getSrc()},pollForSize:function(img){var t=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;!function r(){var n=img.naturalHeight,o=img.naturalWidth;n||o?t.calculatedAspectRatio=o/n:null!=e&&setTimeout(r,e)}()},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{attrs:{name:this.transition}},t):t[0]}}},render:function(t){var e=c.options.render.call(this,t);return e.data.staticClass+=" v-image",e.data.attrs={role:this.alt?"img":void 0,"aria-label":this.alt},e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,e.data,e.children)}})},264:function(t,e,r){"use strict";var n=r(1),o=r(250),c=r(260),l=r(9),d=c.a.extend({name:"v-card-media",mounted:function(){Object(l.c)("v-card-media",this.src?"v-img":"v-responsive",this)}}),v=r(259);r.d(e,"a",function(){return h}),r.d(e,"b",function(){return m});var h=Object(n.c)("v-card__actions"),m=Object(n.c)("v-card__text");o.a,v.a},268:function(t,e,r){"use strict";r.r(e);var n=r(42),o=r(113),c=r.n(o),l=r(106),d=r(250),v=r(264),h=r(259),m=r(99),f=r(104),_=r(105),x=r(101),y=r(102),S=r(244),component=Object(n.a)({},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-layout",[r("v-flex",{attrs:{xs12:"",sm8:"",md10:"","offset-md1":""}},[r("v-container",{attrs:{"grid-list-md":"",fluid:""}},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:"",md4:""}},[r("v-card",{staticClass:"v-card-fw",attrs:{tile:"","min-height":"260px"}},[r("div",{staticClass:"v-card-head"},[r("v-card-title",{staticClass:"headline"},[t._v("\n        VerbalCarnage\n      ")]),t._v(" "),r("v-list",{attrs:{dense:""}},[r("v-list-tile",{staticClass:"grow"},[r("v-layout",{attrs:{"align-center":"","justify-start":""}},[r("i",{staticClass:"mr-1",staticStyle:{"font-size":"12px"}},[t._v("Javascript")])])],1)],1)],1),t._v(" "),r("v-card-text",[t._v("\n          Typing of the dead, in space!"),r("br"),t._v("\n          (Technically on a small moon)"),r("br")]),t._v(" "),r("v-card-actions",{staticClass:"v-card-actions--bottom"},[r("v-btn",{staticClass:"hidden-xs-only",attrs:{color:"secondary",flat:"",target:"_blank",href:"/carnage"}},[t._v("\n              Try it out\n            ")]),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"primary",flat:"",href:"https://github.com/thordurk91/VerbalCarnage"}},[t._v("\n              Github\n            ")])],1)],1)],1),t._v(" "),r("v-flex",{attrs:{xs12:"",md4:""}},[r("v-card",{staticClass:"v-card-fw",attrs:{tile:"","min-height":"260px"}},[r("div",{staticClass:"v-card-head"},[r("v-card-title",{staticClass:"headline"},[t._v("\n        PokéKort\n      ")]),t._v(" "),r("v-list",{attrs:{dense:""}},[r("v-list-tile",{staticClass:"grow"},[r("v-layout",{attrs:{"align-center":"","justify-start":""}},[r("i",{staticClass:"mr-1",staticStyle:{"font-size":"12px"}},[t._v("Python")]),t._v(" "),r("span",{staticClass:"mr-1",staticStyle:{"font-size":"12px"}},[t._v("·")]),t._v(" "),r("i",{staticClass:"mr-1",staticStyle:{"font-size":"12px"}},[t._v("Javascript")]),t._v(" "),r("span",{staticClass:"mr-1",staticStyle:{"font-size":"12px"}},[t._v("·")]),t._v(" "),r("i",{staticClass:"mr-1",staticStyle:{"font-size":"12px"}},[t._v("Postgres")])])],1)],1)],1),t._v(" "),r("v-card-text",[t._v("\n          Live Pokemon GO map of Reykjavik"),r("br"),t._v("\n          Down since May 2018 due to API deprecation"),r("br")]),t._v(" "),r("v-card-actions",{staticClass:"v-card-actions--bottom"},[r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"primary",flat:"",href:"https://github.com/thordurk91/Monocle"}},[t._v("\n          GitHub\n        ")])],1)],1)],1),t._v(" "),r("v-flex",{attrs:{xs12:"",md4:""}},[r("v-card",{staticClass:"v-card-fw",attrs:{tile:"","min-height":"260px"}},[r("div",{staticClass:"v-card-head"},[r("v-card-title",{staticClass:"headline"},[t._v("\n        Bíómyndavefurinn\n      ")]),t._v(" "),r("v-list",{attrs:{dense:""}},[r("v-list-tile",{staticClass:"grow"},[r("v-layout",{attrs:{"align-center":"","justify-start":""}},[r("i",{staticClass:"mr-1"},[t._v("PHP")]),t._v(" "),r("i",{staticClass:"mr-1"},[t._v("·")]),t._v(" "),r("i",{staticClass:"mr-1"},[t._v("Bootstrap")])])],1)],1)],1),t._v(" "),r("v-card-text",[t._v("\n          Cinema showings in Iceland"),r("br"),t._v("\n          Down since May 2016 due to API deprecation.\n          "),r("br"),t._v("\n          Checkout biomynd.is instead!\n      ")]),t._v(" "),r("v-card-actions")],1)],1)],1)],1)],1)],1)},[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:l.a,VCard:d.a,VCardActions:v.a,VCardText:v.b,VCardTitle:h.a,VContainer:m.a,VFlex:f.a,VLayout:_.a,VList:x.a,VListTile:y.a,VSpacer:S.a})}}]);