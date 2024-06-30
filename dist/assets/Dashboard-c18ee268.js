import{u as jt,r as d,j as n,d as at,e as C,f as E,h as k,i as Ct,R as B,k as $,H as Nt,l as kt,L as st,m as H,n as _,E as it,o as lt,p as Dt,q as At,t as Bt,w as Ot,v as Lt}from"./index-20190e22.js";function Tt({game:t,setGame:e,details:r}){const o=jt(),[s,a]=d.useState(t.title),[i,l]=d.useState(t.colour),[u,p]=d.useState(!1);d.useEffect(()=>{g()},[]);const g=()=>{const h=localStorage.getItem("SAVED_GAMES");if(h===null)return;JSON.parse(h).map(c=>{c.game.id===t.id&&p(!0)})},f=()=>{let h=[];const y=localStorage.getItem("SAVED_GAMES");y!==null&&(h=JSON.parse(y)),h.push({game:t,blocks:r[0],folders:r[1],links:r[2],boards:r[3],placements:r[4]}),localStorage.setItem("SAVED_GAMES",JSON.stringify(h)),p(!0),alert(`Downloaded ${t.title}`)},v=()=>{if(!window.confirm("Remove this game from downloads?"))return;const h=localStorage.getItem("SAVED_GAMES");let y=JSON.parse(h);y=y.filter(c=>c.game.id!==t.id),localStorage.setItem("SAVED_GAMES",JSON.stringify(y)),p(!1)},j=async h=>{if(h.preventDefault(),s===""){alert("Please enter a title");return}e({...t,title:s,colour:i});try{await at(C(E,"Games",t.id),{title:s,colour:i})}catch(y){console.error(y)}},b=async()=>{if(window.confirm("Are you sure you want to delete this game?"))try{r.map((h,y)=>{switch(console.log(h),y){case 0:h.map(async c=>{await k(C(E,"Blocks",c.id)),console.log("Deleted block: "+c.title)});break;case 1:h.map(async c=>{await k(C(E,"Folders",c.id)),console.log("Deleted folder: "+c.title)});break;case 2:h.map(async c=>{await k(C(E,"Links",c.id)),console.log("Deleted link: "+c.id)});break;case 3:h.map(async c=>{await k(C(E,"Boards",c.id)),console.log("Deleted board: "+c.title)});break;case 4:h.map(async c=>{await k(C(E,"Placements",c.id)),console.log("Deleted placement: "+c.id)});break}}),await k(C(E,"Games",t.id)),console.log("Delete game: "+t.title),o("/")}catch(h){alert("there was a problem deleting this game try again later."),console.error(h)}},N=()=>{localStorage.setItem("SELECTED_BLOCKS",JSON.stringify(null)),localStorage.setItem("SELECTED_BOARD",JSON.stringify(null)),o("/")};return n.jsx("div",{className:"menu",children:n.jsxs("div",{className:"container details",children:[n.jsx("h1",{children:"Game Details"}),n.jsxs("form",{onSubmit:h=>j(h),children:[n.jsx("input",{value:s,onChange:h=>a(h.target.value),className:"form-input",placeholder:"Enter a title..."}),n.jsx("br",{}),n.jsxs("select",{onChange:h=>l(h.target.value),className:"form-input",value:i,children:[n.jsx("option",{disabled:!0,children:"Select a Colour"}),n.jsx("option",{value:"red",children:"Red"}),n.jsx("option",{value:"yellow",children:"Yellow"}),n.jsx("option",{value:"greenyellow",children:"Green"}),n.jsx("option",{value:"lightskyblue",children:"Blue"}),n.jsx("option",{value:"grey",children:"Grey"}),n.jsx("option",{value:"rgb(155, 3, 155)",children:"Purple"})]}),n.jsx("br",{}),n.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"},children:[n.jsx("button",{type:"submit",className:"form-btn",children:"Save Details"}),n.jsx("button",{className:"form-btn",onClick:()=>N(),children:"Exit Game"}),n.jsx("button",{className:"form-btn red",onClick:()=>b(),children:"Delete Game"}),u?n.jsx("button",{className:"form-btn",onClick:()=>v(),children:"Downloaded"}):n.jsx("button",{className:"form-btn",onClick:()=>f(),children:"Download Game"}),n.jsx("small",{children:"Download feature not yet fully functional."})]})]})]})})}function Rt({blocks:t,select:e}){return n.jsx("ul",{className:"block-snippets",children:t.map(r=>n.jsx("li",{onClick:()=>e(r),children:n.jsx("p",{children:r.title})},r.id))})}var ct={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(t){(function(){var e={}.hasOwnProperty;function r(){for(var o=[],s=0;s<arguments.length;s++){var a=arguments[s];if(a){var i=typeof a;if(i==="string"||i==="number")o.push(a);else if(Array.isArray(a)){if(a.length){var l=r.apply(null,a);l&&o.push(l)}}else if(i==="object"){if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]")){o.push(a.toString());continue}for(var u in a)e.call(a,u)&&a[u]&&o.push(u)}}}return o.join(" ")}t.exports?(r.default=r,t.exports=r):window.classNames=r})()})(ct);var It=ct.exports;const I=Ct(It);function q(){return q=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},q.apply(this,arguments)}function dt(t,e){if(t==null)return{};var r={},o=Object.keys(t),s,a;for(a=0;a<o.length;a++)s=o[a],!(e.indexOf(s)>=0)&&(r[s]=t[s]);return r}function et(t){return"default"+t.charAt(0).toUpperCase()+t.substr(1)}function Pt(t){var e=_t(t,"string");return typeof e=="symbol"?e:String(e)}function _t(t,e){if(typeof t!="object"||t===null)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var o=r.call(t,e||"default");if(typeof o!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Mt(t,e,r){var o=d.useRef(t!==void 0),s=d.useState(e),a=s[0],i=s[1],l=t!==void 0,u=o.current;return o.current=l,!l&&u&&a!==e&&i(e),[l?t:a,d.useCallback(function(p){for(var g=arguments.length,f=new Array(g>1?g-1:0),v=1;v<g;v++)f[v-1]=arguments[v];r&&r.apply(void 0,[p].concat(f)),i(p)},[r])]}function Ft(t,e){return Object.keys(e).reduce(function(r,o){var s,a=r,i=a[et(o)],l=a[o],u=dt(a,[et(o),o].map(Pt)),p=e[o],g=Mt(l,i,t[p]),f=g[0],v=g[1];return q({},u,(s={},s[o]=f,s[p]=v,s))},t)}function Y(t,e){return Y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,s){return o.__proto__=s,o},Y(t,e)}function Gt(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,Y(t,e)}const $t=["xxl","xl","lg","md","sm","xs"],Ut="xs",Ht=d.createContext({prefixes:{},breakpoints:$t,minBreakpoint:Ut});function M(t,e){const{prefixes:r}=d.useContext(Ht);return t||r[e]||e}function Vt(t){return t&&t.ownerDocument||document}function Jt(t){var e=Vt(t);return e&&e.defaultView||window}function Kt(t,e){return Jt(t).getComputedStyle(t,e)}var Wt=/([A-Z])/g;function Xt(t){return t.replace(Wt,"-$1").toLowerCase()}var zt=/^ms-/;function V(t){return Xt(t).replace(zt,"-ms-")}var qt=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;function Yt(t){return!!(t&&qt.test(t))}function K(t,e){var r="",o="";if(typeof e=="string")return t.style.getPropertyValue(V(e))||Kt(t).getPropertyValue(V(e));Object.keys(e).forEach(function(s){var a=e[s];!a&&a!==0?t.style.removeProperty(V(s)):Yt(s)?o+=s+"("+a+") ":r+=V(s)+": "+a+";"}),o&&(r+="transform: "+o+";"),t.style.cssText+=";"+r}const nt={disabled:!1},ut=B.createContext(null);var Zt=function(e){return e.scrollTop},U="unmounted",L="exited",T="entering",R="entered",W="exiting",O=function(t){Gt(e,t);function e(o,s){var a;a=t.call(this,o,s)||this;var i=s,l=i&&!i.isMounting?o.enter:o.appear,u;return a.appearStatus=null,o.in?l?(u=L,a.appearStatus=T):u=R:o.unmountOnExit||o.mountOnEnter?u=U:u=L,a.state={status:u},a.nextCallback=null,a}e.getDerivedStateFromProps=function(s,a){var i=s.in;return i&&a.status===U?{status:L}:null};var r=e.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(s){var a=null;if(s!==this.props){var i=this.state.status;this.props.in?i!==T&&i!==R&&(a=T):(i===T||i===R)&&(a=W)}this.updateStatus(!1,a)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var s=this.props.timeout,a,i,l;return a=i=l=s,s!=null&&typeof s!="number"&&(a=s.exit,i=s.enter,l=s.appear!==void 0?s.appear:i),{exit:a,enter:i,appear:l}},r.updateStatus=function(s,a){if(s===void 0&&(s=!1),a!==null)if(this.cancelNextCallback(),a===T){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:$.findDOMNode(this);i&&Zt(i)}this.performEnter(s)}else this.performExit();else this.props.unmountOnExit&&this.state.status===L&&this.setState({status:U})},r.performEnter=function(s){var a=this,i=this.props.enter,l=this.context?this.context.isMounting:s,u=this.props.nodeRef?[l]:[$.findDOMNode(this),l],p=u[0],g=u[1],f=this.getTimeouts(),v=l?f.appear:f.enter;if(!s&&!i||nt.disabled){this.safeSetState({status:R},function(){a.props.onEntered(p)});return}this.props.onEnter(p,g),this.safeSetState({status:T},function(){a.props.onEntering(p,g),a.onTransitionEnd(v,function(){a.safeSetState({status:R},function(){a.props.onEntered(p,g)})})})},r.performExit=function(){var s=this,a=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:$.findDOMNode(this);if(!a||nt.disabled){this.safeSetState({status:L},function(){s.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:W},function(){s.props.onExiting(l),s.onTransitionEnd(i.exit,function(){s.safeSetState({status:L},function(){s.props.onExited(l)})})})},r.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(s,a){a=this.setNextCallback(a),this.setState(s,a)},r.setNextCallback=function(s){var a=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,a.nextCallback=null,s(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},r.onTransitionEnd=function(s,a){this.setNextCallback(a);var i=this.props.nodeRef?this.props.nodeRef.current:$.findDOMNode(this),l=s==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var u=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],p=u[0],g=u[1];this.props.addEndListener(p,g)}s!=null&&setTimeout(this.nextCallback,s)},r.render=function(){var s=this.state.status;if(s===U)return null;var a=this.props,i=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=dt(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return B.createElement(ut.Provider,{value:null},typeof i=="function"?i(s,l):B.cloneElement(B.Children.only(i),l))},e}(B.Component);O.contextType=ut;O.propTypes={};function P(){}O.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:P,onEntering:P,onEntered:P,onExit:P,onExiting:P,onExited:P};O.UNMOUNTED=U;O.EXITED=L;O.ENTERING=T;O.ENTERED=R;O.EXITING=W;const Qt=O,te=!!(typeof window<"u"&&window.document&&window.document.createElement);var Z=!1,Q=!1;try{var z={get passive(){return Z=!0},get once(){return Q=Z=!0}};te&&(window.addEventListener("test",z,z),window.removeEventListener("test",z,!0))}catch{}function ee(t,e,r,o){if(o&&typeof o!="boolean"&&!Q){var s=o.once,a=o.capture,i=r;!Q&&s&&(i=r.__once||function l(u){this.removeEventListener(e,l,a),r.call(this,u)},r.__once=i),t.addEventListener(e,i,Z?o:a)}t.addEventListener(e,r,o)}function ne(t,e,r,o){var s=o&&typeof o!="boolean"?o.capture:o;t.removeEventListener(e,r,s),r.__once&&t.removeEventListener(e,r.__once,s)}function ft(t,e,r,o){return ee(t,e,r,o),function(){ne(t,e,r,o)}}function re(t,e,r,o){if(r===void 0&&(r=!1),o===void 0&&(o=!0),t){var s=document.createEvent("HTMLEvents");s.initEvent(e,r,o),t.dispatchEvent(s)}}function oe(t){var e=K(t,"transitionDuration")||"",r=e.indexOf("ms")===-1?1e3:1;return parseFloat(e)*r}function ae(t,e,r){r===void 0&&(r=5);var o=!1,s=setTimeout(function(){o||re(t,"transitionend",!0)},e+r),a=ft(t,"transitionend",function(){o=!0},{once:!0});return function(){clearTimeout(s),a()}}function se(t,e,r,o){r==null&&(r=oe(t)||0);var s=ae(t,r,o),a=ft(t,"transitionend",e);return function(){s(),a()}}function rt(t,e){const r=K(t,e)||"",o=r.indexOf("ms")===-1?1e3:1;return parseFloat(r)*o}function ie(t,e){const r=rt(t,"transitionDuration"),o=rt(t,"transitionDelay"),s=se(t,a=>{a.target===t&&(s(),e(a))},r+o)}function G(...t){return t.filter(e=>e!=null).reduce((e,r)=>{if(typeof r!="function")throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return e===null?r:function(...s){e.apply(this,s),r.apply(this,s)}},null)}function le(t){t.offsetHeight}const ot=t=>!t||typeof t=="function"?t:e=>{t.current=e};function ce(t,e){const r=ot(t),o=ot(e);return s=>{r&&r(s),o&&o(s)}}function de(t,e){return d.useMemo(()=>ce(t,e),[t,e])}function ue(t){return t&&"setState"in t?$.findDOMNode(t):t??null}const fe=B.forwardRef(({onEnter:t,onEntering:e,onEntered:r,onExit:o,onExiting:s,onExited:a,addEndListener:i,children:l,childRef:u,...p},g)=>{const f=d.useRef(null),v=de(f,u),j=m=>{v(ue(m))},b=m=>S=>{m&&f.current&&m(f.current,S)},N=d.useCallback(b(t),[t]),h=d.useCallback(b(e),[e]),y=d.useCallback(b(r),[r]),c=d.useCallback(b(o),[o]),x=d.useCallback(b(s),[s]),w=d.useCallback(b(a),[a]),A=d.useCallback(b(i),[i]);return n.jsx(Qt,{ref:g,...p,onEnter:N,onEntered:y,onEntering:h,onExit:c,onExited:w,onExiting:x,addEndListener:A,nodeRef:f,children:typeof l=="function"?(m,S)=>l(m,{...S,ref:j}):B.cloneElement(l,{ref:j})})}),he=fe,pe={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function me(t,e){const r=`offset${t[0].toUpperCase()}${t.slice(1)}`,o=e[r],s=pe[t];return o+parseInt(K(e,s[0]),10)+parseInt(K(e,s[1]),10)}const xe={[L]:"collapse",[W]:"collapsing",[T]:"collapsing",[R]:"collapse show"},ve=B.forwardRef(({onEnter:t,onEntering:e,onEntered:r,onExit:o,onExiting:s,className:a,children:i,dimension:l="height",in:u=!1,timeout:p=300,mountOnEnter:g=!1,unmountOnExit:f=!1,appear:v=!1,getDimensionValue:j=me,...b},N)=>{const h=typeof l=="function"?l():l,y=d.useMemo(()=>G(m=>{m.style[h]="0"},t),[h,t]),c=d.useMemo(()=>G(m=>{const S=`scroll${h[0].toUpperCase()}${h.slice(1)}`;m.style[h]=`${m[S]}px`},e),[h,e]),x=d.useMemo(()=>G(m=>{m.style[h]=null},r),[h,r]),w=d.useMemo(()=>G(m=>{m.style[h]=`${j(h,m)}px`,le(m)},o),[o,j,h]),A=d.useMemo(()=>G(m=>{m.style[h]=null},s),[h,s]);return n.jsx(he,{ref:N,addEndListener:ie,...b,"aria-expanded":b.role?u:null,onEnter:y,onEntering:c,onEntered:x,onExit:w,onExiting:A,childRef:i.ref,in:u,timeout:p,mountOnEnter:g,unmountOnExit:f,appear:v,children:(m,S)=>B.cloneElement(i,{...S,className:I(a,i.props.className,xe[m],h==="width"&&"collapse-horizontal")})})}),ge=ve;function ht(t,e){return Array.isArray(t)?t.includes(e):t===e}const pt=d.createContext({});pt.displayName="AccordionContext";const X=pt,mt=d.forwardRef(({as:t="div",bsPrefix:e,className:r,children:o,eventKey:s,...a},i)=>{const{activeEventKey:l}=d.useContext(X);return e=M(e,"accordion-collapse"),n.jsx(ge,{ref:i,in:ht(l,s),...a,className:I(r,e),children:n.jsx(t,{children:d.Children.only(o)})})});mt.displayName="AccordionCollapse";const xt=mt,vt=d.createContext({eventKey:""});vt.displayName="AccordionItemContext";const tt=vt,gt=d.forwardRef(({as:t="div",bsPrefix:e,className:r,onEnter:o,onEntering:s,onEntered:a,onExit:i,onExiting:l,onExited:u,...p},g)=>{e=M(e,"accordion-body");const{eventKey:f}=d.useContext(tt);return n.jsx(xt,{eventKey:f,onEnter:o,onEntering:s,onEntered:a,onExit:i,onExiting:l,onExited:u,children:n.jsx(t,{ref:g,...p,className:I(r,e)})})});gt.displayName="AccordionBody";const be=gt;function ye(t,e){const{activeEventKey:r,onSelect:o,alwaysOpen:s}=d.useContext(X);return a=>{let i=t===r?null:t;s&&(Array.isArray(r)?r.includes(t)?i=r.filter(l=>l!==t):i=[...r,t]:i=[t]),o==null||o(i,a),e==null||e(a)}}const bt=d.forwardRef(({as:t="button",bsPrefix:e,className:r,onClick:o,...s},a)=>{e=M(e,"accordion-button");const{eventKey:i}=d.useContext(tt),l=ye(i,o),{activeEventKey:u}=d.useContext(X);return t==="button"&&(s.type="button"),n.jsx(t,{ref:a,onClick:l,...s,"aria-expanded":Array.isArray(u)?u.includes(i):i===u,className:I(r,e,!ht(u,i)&&"collapsed")})});bt.displayName="AccordionButton";const yt=bt,St=d.forwardRef(({as:t="h2",bsPrefix:e,className:r,children:o,onClick:s,...a},i)=>(e=M(e,"accordion-header"),n.jsx(t,{ref:i,...a,className:I(r,e),children:n.jsx(yt,{onClick:s,children:o})})));St.displayName="AccordionHeader";const Se=St,Et=d.forwardRef(({as:t="div",bsPrefix:e,className:r,eventKey:o,...s},a)=>{e=M(e,"accordion-item");const i=d.useMemo(()=>({eventKey:o}),[o]);return n.jsx(tt.Provider,{value:i,children:n.jsx(t,{ref:a,...s,className:I(r,e)})})});Et.displayName="AccordionItem";const Ee=Et,wt=d.forwardRef((t,e)=>{const{as:r="div",activeKey:o,bsPrefix:s,className:a,onSelect:i,flush:l,alwaysOpen:u,...p}=Ft(t,{activeKey:"onSelect"}),g=M(s,"accordion"),f=d.useMemo(()=>({activeEventKey:o,onSelect:i,alwaysOpen:u}),[o,i,u]);return n.jsx(X.Provider,{value:f,children:n.jsx(r,{ref:e,...p,className:I(a,g,l&&`${g}-flush`)})})});wt.displayName="Accordion";const J=Object.assign(wt,{Button:yt,Collapse:xt,Item:Ee,Header:Se,Body:be});function we({folders:t,blocks:e,select:r,newBlock:o,setFolders:s,gameId:a}){async function i(l){if(!navigator.onLine){alert("Cannot delete folders while offline");return}if(!window.confirm("Are you sure want to delete this folder & its blocks?"))return;const u=e.filter(p=>p.folderid===l.id);try{u.map(async p=>{await k(C(E,"Blocks",p.id))}),await k(C(E,"Folders",l.id)),s(t.filter(p=>p.id!==l.id))}catch(p){console.error(p),alert("Failed to delete this folder, try again later.")}}return n.jsx(J,{className:"accordion-container",children:t.map(l=>n.jsxs(J.Item,{id:l.id,eventKey:l.id,style:{border:"1px solid grey"},children:[n.jsx(J.Header,{children:l.title}),n.jsxs(J.Body,{style:{paddingTop:"20px",paddingLeft:"8px",paddingRight:"8px"},children:[n.jsx(Rt,{blocks:e.filter(u=>u.folderid===l.id),select:r}),n.jsxs("span",{className:"folder-btn",children:[n.jsx("button",{onClick:()=>o(l.id),children:"New Block"}),n.jsx("button",{style:{backgroundColor:"red"},onClick:()=>i(l),children:"Delete Folder"})]})]})]},l.id))})}const je=`
<h2>Creature name</h2>
<small>Medium Humanoid (Elf), Neutral</small>
<hr/>
<p>
    Armour Class: 10<br/>
    Hip Points: 10<br/>
    Speed: 30ft
</p>
<hr/>
<table>
    <tr>
        <th>STR</th>
        <th>DEX</th>
        <th>CON</th>
        <th>INT</th>
        <th>WIS</th>
        <th>CHA</th>
    </tr>
    <tr>
        <td>+0</td>
        <td>+0</td>
        <td>+0</td>
        <td>+0</td>
        <td>+0</td>
        <td>+0</td>
    </tr>
</table>
<hr/>
<p>
    Saving Throws: STR +2, DEX +2<br/>
    Skills: Athletics +2, History +2<br/>
    Senses: darkvision 60 ft, passive Perception 11<br/>
    Languages: common, other<br/>
    Proficiency Bonus: +2
</p>
<hr/>
<h3>Actions</h3>
<p>
    Dagger. Melee or Ranged Weapon Attack: +2 to hit, reach 5 ft 
    or range 20/60 ft, one target. Hit: 2 (1d4) piercing damage.
</p>
<hr/>
<h3>Features</h3>
<p>
    Fey Ancestry. Has advantage on saving throws against 
    being charmed, and can't be put to sleep by magic.
</p>
`,Ce=`
<h2>Encounter Title</h2>
<small>Difficulty Estimate: </small>
<hr/>
<h3>Description</h3>
<p></p>
<hr/>
<h3>Active Creatures</h3>
<table>
    <tr>
        <th>Creature Name</th>
        <th>Number of Creatures</th>
        <th>Unique modifier</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
`,Ne=`
<p>
    <b>Name:</b> name    <b>Class:</b> class, subclass    <b>Race:</b> race<br/>
    <b>Level:</b> 1    <b>Background:</b> background    <b>Alignment:</b> alignment
</p>
<hr/>
<h3>Abilities</h3>
<table>
    <tr>
        <th>STR</th>
        <th>DEX</th>
        <th>CON</th>
        <th>INT</th>
        <th>WIS</th>
        <th>CHA</th>
    </tr>
    <tr>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
    </tr>
</table>
<hr/>
<h3>Saving Throws</h3>
<table>
    <tr>
        <th>STR</th>
        <th>DEX</th>
        <th>CON</th>
        <th>INT</th>
        <th>WIS</th>
        <th>CHA</th>
    </tr>
    <tr>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
        <td>10 (+0)</td>
    </tr>
</table>
<table>
<tr>
<td>
    <table>
        <tr>
            <th>Skill</th>
            <th>Score</th>
            <th>Prof</th>
        </tr>
        <tr>
            <td>Acrobatics</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Animal Handling</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Arcana</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Athletics</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Deception</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>History</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Insight</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Athletics</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Intimidation</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Investigation</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Medicine</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Nature</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Perception</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Persuasion</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Religion</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Sleight of Hand</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Stealth</td>
            <td>+0</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Survival</td>
            <td>+0</td>
            <td>no</td>
        </tr>
    </table>
</td>
<td>
    <table>
        <tr>
            <td>Armour Class</td>
            <td>10</td>
        </tr>
        <tr>
            <td>Initiative</td>
            <td>+0</td>
        </tr>
        <tr>
            <td>Speed</td>
            <td>30</td>
        </tr>
        <tr>
            <td>Proficiency Bonus</td>
            <td>+2</td>
        </tr>
        <tr>
            <td>HP</td>
            <td>10/10</td>
        </tr>
        <tr>
            <td>Temp HP</td>
            <td></td>
        </tr>
        <tr>
            <td>Death Saves Success'</td>
            <td>0/3</td>
        </tr>
        <tr>
            <td>Death Saves Failures</td>
            <td>0/3</td>
        </tr>
        <tr>
            <td>Defences</td>
            <td>resistances, immunities, vulnerabilities</td>
        </tr>
    </table>
    <p>
        <b>Proficiencies and Languages</b><br/>
        Armour<br/>
        None</br><hr/>
        Weapons<br/>
        None</br><hr/>
        Tools<br/>
        None</br><hr/>
        Languages<br/>
        Common
    </p>
</td>
</tr>
</table>
<hr/>
<h3>Actions</h3>
<b>Attacks</b><br/>
<table>
    <tr>
        <th>Attack/Spell</th>
        <th>Bonus/DC</th>
        <th>Damage/Effects</th>
    </tr>
    <tr>
        <td>Unarmed Strike</td>
        <td>+2</td>
        <td>1 Bludgeoning</td>
    </tr>
    <tr>
        <td>Acid Splash</td>
        <td>DC 10</td>
        <td>1d6 Acid</td>
    </tr>
</table>
<p>
    <b>Other Actions</b><br/>
</p>
<hr/>
<h3>Features</h3>
<p></p>
<hr/>
<h3>Inventory</h3>
<table>
    <tr>
        <th>Equipped</th>
        <th>Stored</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
    </tr>
</table>
<hr/>
<h3>Notes</h3>
<p><b>Misc</b><br/><br/></p>
<p><b>Backstory</b><br/><br/></p>
<p><b>Allies</b><br/><br/></p>
`;function ke({content:t,close:e}){return n.jsxs("li",{children:[n.jsx("label",{children:"Use Template: "}),n.jsxs("select",{className:"option-select",defaultValue:"defualt",onChange:r=>{t[1](t[0]+r.target.value),e()},children:[n.jsx("option",{value:"defualt",disabled:!0,children:"None"}),n.jsx("option",{value:je,children:"Stat Block"}),n.jsx("option",{value:Ce,children:"Encounter Plan"}),n.jsx("option",{value:Ne,children:"Character Sheet"})]})]})}function De({colour:t,gameId:e,data:r,blocks:o,links:s,closeBlock:a,blockLinks:i,block:l,placements:u,boards:p,content:g}){const[f,v]=d.useState(!1),j=async c=>{if(c.preventDefault(),v(!1),!navigator.onLine){alert("Cannot save blocks while offline");return}try{let x=l;x.title=r[0],x.content=r[1],l.new?(delete x.new,await H(_(E,"Blocks"),x).then(w=>{x.id=w.id,o[1]([...o[0],x])})):(await at(C(E,"Blocks",l.id),{title:r[0],content:r[1]}),o[1](o[0].map(w=>w.id===x.id?x:w))),alert("Block saved successfuly!")}catch(x){console.error(x),alert("Failed to save this block, try again later.")}},b=async()=>{if(!navigator.onLine){alert("Cannot delete blocks while offline");return}if(window.confirm("Are you sure you want to delete this block?"))try{await k(C(E,"Blocks",l.id)),o[1](o[0].filter(x=>x.id!=l.id));let c=[...s[0]];i.map(async x=>{await k(C(E,"Links",x.linkId)).then(c=c.filter(w=>w.id!==x.linkId))}),s[1](c),u.map(async x=>{x.blockid===l.id&&await k(C(E,"Placements",x.id))}),u[1]([...u[0].filter(x=>x.blockid!==l.id)]),a()}catch(c){console.error(c),alert("Something went wrong, try again later.")}},N=async c=>{if(!navigator.onLine){alert("Cannot link blocks while offline");return}if(c===l.id){alert("Cannot link a block to itself");return}let x=!1;if(i.map(w=>{w.id===c&&(x=!0)}),x){alert("Selected block is already linked to this one");return}try{let w={block1:l.id,block2:c,gameid:e};await H(_(E,"Links"),w).then(A=>{w.id=A.id,s[1]([...s[0],w])})}catch(w){console.error(w),alert("Something went wrong, try again later.")}},h=async c=>{if(!navigator.onLine){alert("Cannot add to boards while offline");return}try{let x={blockid:l.id,boardid:c,gameid:e};await H(_(E,"Placements"),x).then(w=>{x.id=w.id}),u[1]([...u[0],x]),alert("Block added to selected board.")}catch(x){console.error(x),alert("Something went wrong, try again later.")}},y=()=>v(!1);return n.jsxs("div",{style:{display:"inline"},onMouseLeave:()=>v(!1),children:[n.jsx("button",{className:"options-btn",onMouseOver:()=>v(!0),style:{backgroundColor:`${t}`},children:"Options"}),n.jsx(Nt,{message:kt}),f&&n.jsxs("ul",{className:"options-collapse",children:[n.jsx("li",{onClick:y,children:"Close Options"}),n.jsx("li",{onClick:c=>j(c),children:"Save"}),n.jsx(ke,{content:g,close:y}),!l.new&&n.jsxs(n.Fragment,{children:[n.jsxs("li",{children:[n.jsx("label",{children:"Link to: "}),n.jsxs("select",{className:"option-select",defaultValue:"defualt",onChange:c=>{N(c.target.value),y()},children:[n.jsx("option",{value:"defualt",disabled:!0,children:"Select Block"}),o[0].map(c=>n.jsx("option",{value:c.id,children:c.title},c.id))]})]}),n.jsxs("li",{children:[n.jsx("label",{children:"Add to Board: "}),n.jsxs("select",{className:"option-select",defaultValue:"defualt",onChange:c=>{h(c.target.value),y()},children:[n.jsx("option",{value:"defualt",disabled:!0,children:"Select Board"}),p.map(c=>n.jsx("option",{value:c.id,children:c.title},c.id))]})]}),n.jsx("li",{children:n.jsx(st,{to:"../share/"+l.id,target:"_blank",children:"Share"})}),n.jsx("li",{onClick:b,style:{color:"red"},children:"Delete"})]})]})]})}function Ae({content:t,setContent:e}){return n.jsx(it,{apiKey:"c70a4j85ev1e4q1dopyxbpw772r0lz047pef9umlig63xfdh",value:t,onEditorChange:(r,o)=>e(o.getContent()),init:{height:360,menubar:!1,browser_spellcheck:!0,resize:!1,plugins:["table","lists"],toolbar:"undo redo | blocks | bold italic forecolor | bullist numlist outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"}})}function Be({block:t,setBlocks:e,close:r,blocks:o,colour:s,gameId:a,links:i,setLinks:l,select:u,setPlacements:p,boards:g,placements:f}){const[v,j]=d.useState(""),[b,N]=d.useState(""),[h,y]=d.useState([]);d.useEffect(()=>{j(t.title),N(t.content),y(c())},[t]),d.useEffect(()=>{y(c())},[i]),d.useEffect(()=>{let m=JSON.parse(localStorage.getItem("SELECTED_BLOCKS"));if(!(m===null||m.length<1)){for(let S=0;S<m.length;S++)if(m[S].id===t.id){m[S].title=v,m[S].content=b,localStorage.setItem("SELECTED_BLOCKS",JSON.stringify(m));return}}},[v,b]);const c=()=>{let m=[];return i.map(S=>{if(S.block1===t.id){let D=o.filter(F=>F.id===S.block2)[0];D.linkId=S.id,m.push(D)}else if(S.block2===t.id){let D=o.filter(F=>F.id===S.block1)[0];D.linkId=S.id,m.push(D)}}),m},x=()=>{b!==t.content&&!window.confirm("Unsaved changes detected, are you sure you want to continue?")||r()},w=async(m,S)=>{if(!navigator.onLine){alert("Cannot delete links while offline");return}if(window.confirm(`Are you sure you want to delete the link to "${S}"?`))try{await k(C(E,"Links",m));let D=[...i].filter(F=>F.id!==m);l(D),A(D)}catch(D){console.error(D),alert("Something went wrong, try again later.")}},A=m=>{let S=JSON.parse(localStorage.getItem("SAVED_GAMES"));S!==null&&(S.map(D=>(D.game.id===a&&(D.links=m),D)),localStorage.setItem("SAVED_GAMES",JSON.stringify(S)))};return n.jsxs("div",{className:"block",children:[n.jsx(De,{colour:s,gameId:a,data:[v,b],content:[b,N],blocks:[o,e],boards:g,links:[i,l],closeBlock:r,blockLinks:h,block:t,placements:[f,p]}),n.jsx("button",{className:"x-btn",onClick:x,children:"X"}),n.jsx("input",{value:v,className:"block-title",onChange:m=>j(m.target.value)}),n.jsx("br",{}),navigator.onLine?n.jsx(Ae,{content:b,setContent:N}):n.jsx("textarea",{value:lt(b,{wordwrap:80}),className:"block-content"}),n.jsx("p",{className:"related-blocks",children:h.map(m=>n.jsxs("span",{children:[n.jsx("span",{onClick:()=>u(m),children:m.title}),n.jsx("label",{onClick:()=>w(m.linkId,m.title),children:"X"})]},m.id))})]})}function Oe({setFolders:t,folders:e,gameId:r}){const[o,s]=d.useState(""),[a,i]=d.useState(!1);async function l(u){if(u.preventDefault(),!navigator.onLine){alert("Cannot create folders while offline");return}if(o===""){alert("Enter a title for your new folder first.");return}if(o.length>25){alert("Folder titles cannot be longer than 25 digits long.");return}try{await H(_(E,"Folders"),{title:o,gameid:r}).then(p=>{t([...e,{id:p.id,title:o,gameid:r}])}),s(""),i(!1)}catch(p){console.error(p),alert("Something went wrong and we coudlnt create your folder, please try again later")}}return n.jsxs(n.Fragment,{children:[a&&n.jsxs("form",{onSubmit:u=>l(u),className:"new-folder",children:[n.jsx("input",{placeholder:"Folder title...",className:"form-input",value:o,onChange:u=>s(u.target.value)}),n.jsx("br",{}),n.jsx("button",{type:"submit",className:"form-btn",children:"Create Folder"}),n.jsx("br",{}),n.jsx("button",{onClick:()=>i(!1),className:"form-btn",style:{backgroundColor:"red"},children:"Cancel"})]}),n.jsx("button",{className:"form-btn",onClick:()=>i(!0),children:"New Folder"})]})}function Le({select:t,blocks:e}){const[r,o]=d.useState([]);function s(a){if(a===""){o([]);return}o(e.filter(i=>i.title.toLowerCase().includes(a.toLowerCase())))}return n.jsxs(n.Fragment,{children:[n.jsx("input",{placeholder:"Search...",className:"search-bar",onChange:a=>s(a.target.value),onClick:a=>s(a.target.value)}),n.jsx("ul",{className:"search-results",children:r.map(a=>n.jsx("li",{onClick:()=>{t(a),s("")},children:a.title}))})]})}function Te({blocks:t,gameId:e,setBlocks:r,folders:o,setFolders:s,colour:a,links:i,setLinks:l,setPlacements:u,boards:p,placements:g}){const[f,v]=d.useState(()=>{const h=localStorage.getItem("SELECTED_BLOCKS");return JSON.parse(h)===null?[]:JSON.parse(h)});d.useEffect(()=>{localStorage.setItem("SELECTED_BLOCKS",JSON.stringify(f))},[f]);const j=h=>{b({title:"New Block",content:"",gameid:e,folderid:h,new:!0})},b=h=>{f.includes(h)||v([...f,h])},N=h=>v([...f].filter(y=>y.id!==h));return n.jsxs("div",{style:{display:"flex"},className:"blocks-container",children:[n.jsxs("div",{className:"folderList",children:[n.jsx(Le,{select:b,blocks:t}),o.length>0&&n.jsx(we,{folders:o,blocks:t,select:b,newBlock:j,setFolders:s,gameId:e}),n.jsx(Oe,{setFolders:s,folders:o,gameId:e})]}),n.jsx("div",{className:"block-list",children:f.map(h=>n.jsx(Be,{block:h,blocks:t,colour:a,gameId:e,setLinks:l,setBlocks:r,close:()=>N(h.id),links:i,select:b,setPlacements:u,boards:p,placements:g},h.id))})]})}const Re="/assets/YlWC-82c90721.gif";function Ie(){const[t,e]=d.useState(null),[r,o]=d.useState(20),s=()=>{e(Math.floor(Math.random()*r)+1);var a=document.getElementById("result");a.style.fontSize="1.4em",setTimeout(()=>a.style.fontSize="1.3em",200)};return n.jsxs("span",{style:{marginTop:"10px",marginLeft:"auto"},children:[n.jsxs("select",{style:{padding:"3px"},onChange:a=>{o(a.target.value),s()},children:[n.jsx("option",{value:20,default:!0,children:"d20"}),n.jsx("option",{value:12,children:"d12"}),n.jsx("option",{value:10,children:"d10"}),n.jsx("option",{value:8,children:"d8"}),n.jsx("option",{value:6,children:"d6"}),n.jsx("option",{value:4,children:"d4"}),n.jsx("option",{value:100,children:"d100"})]}),n.jsx("button",{onClick:s,style:{border:"none",padding:"2px"},children:"Roll!"}),n.jsx("div",{className:"roll-result",children:t&&n.jsx("div",{id:"result",children:t})})]})}function Pe({selected:t,setSelected:e,game:r}){return n.jsxs("div",{className:"nav-bar",style:{backgroundColor:`${r.colour}`},children:[n.jsx("h1",{className:"nav-title",children:r.title}),r.title==="Loading"&&n.jsx("img",{src:Re,className:"loading-icon"}),t==="blocks"?n.jsx("button",{className:"nav-item",style:{textDecoration:"underline"},children:"Blocks"}):n.jsx("button",{className:"nav-item",onClick:()=>e("blocks"),children:"Blocks"}),t==="boards"?n.jsx("button",{className:"nav-item",style:{textDecoration:"underline"},children:"Boards"}):n.jsx("button",{className:"nav-item",onClick:()=>e("boards"),children:"Boards"}),t==="details"?n.jsx("button",{className:"nav-item",style:{textDecoration:"underline"},children:"Details"}):n.jsx("button",{className:"nav-item",onClick:()=>e("details"),children:"Details"}),n.jsx(Ie,{})]})}function _e({blocks:t,setPlacements:e,placements:r}){const[o,s]=d.useState([]);d.useEffect(()=>{s(t.sort((i,l)=>l.content.length-i.content.length))},[t]);const a=async i=>{if(window.confirm(`Are you sure you want to delete "${i.title}" from this board?`))try{await k(C(E,"Placements",i.placement)),e([...r].filter(l=>l.id!==i.placement))}catch(l){console.log(l),alert("something went wrong, try again later")}};return n.jsx("div",{className:"board-blocks",children:o.map(i=>n.jsxs("div",{children:[n.jsx("button",{className:"x-btn",onClick:()=>a(i),children:"X"}),n.jsx("h2",{children:i.title}),n.jsx("span",{children:navigator.onLine?n.jsx(it,{apiKey:"c70a4j85ev1e4q1dopyxbpw772r0lz047pef9umlig63xfdh",value:i.content,disabled:!0,inline:!0,init:{menubar:!1,toolbar:!1,resize:!1}}):n.jsx("textarea",{value:lt(i.content,{wordwrap:80})})})]},i.id))})}function Me({boards:t,select:e,gameId:r,setBoards:o,placements:s,setPlacements:a,selected:i}){const[l,u]=d.useState(""),p=async()=>{if(!navigator.onLine){alert("Cannot create board while offline");return}try{let f={title:l,gameid:r};await H(_(E,"Boards"),f).then(v=>f.id=v.id),o([...t,f]),e(f.id),u(""),alert("New Board Created!")}catch(f){console.log(f),alert("Something went wrong, try again later.")}},g=async()=>{if(!i){alert("Select a board to delete.");return}if(!navigator.onLine){alert("Cannot delete boards while offline");return}if(window.confirm("Are you sure you want to delete this board?"))try{s.map(async f=>{f.boardid===i&&await k(C(E,"Placements",f.id))}),a([...s].filter(f=>f.boardid!==i)),await k(C(E,"Boards",i)),e(null)}catch(f){console.log(f),alert("Something went wrong, try again later.")}};return n.jsxs("div",{className:"board-control",children:[n.jsxs("div",{children:[n.jsxs("select",{defaultValue:"default",className:"form-input",style:{padding:"6px"},onChange:f=>e(f.target.value),children:[n.jsx("option",{value:"default",disabled:!0,children:"Select a Board"}),t.map(f=>n.jsx("option",{value:f.id,children:f.title},f.id))]}),n.jsx("br",{}),n.jsx("button",{className:"form-btn",style:{backgroundColor:"red"},onClick:()=>g(),children:"Delete Board"})]}),n.jsxs("div",{children:[n.jsx("input",{placeholder:"Board Title...",className:"form-input",value:l,onChange:f=>u(f.target.value)}),n.jsx("br",{}),n.jsx("button",{className:"form-btn",onClick:()=>p(),children:"Create Board"})]})]})}function Fe({boards:t,placements:e,blocks:r,gameId:o,setBoards:s,setPlacements:a}){const[i,l]=d.useState(()=>{const f=localStorage.getItem("SELECTED_BOARD");return JSON.parse(f)}),[u,p]=d.useState([]);d.useEffect(()=>{localStorage.setItem("SELECTED_BOARD",JSON.stringify(i))},[i]),d.useEffect(()=>{let f=[];e.filter(v=>v.boardid===i).map(v=>{let j=r.find(b=>b.id===v.blockid);j.placement=v.id,f.push(j)}),p(f)},[i,e]);const g=f=>f==null?"":t.filter(v=>v.id==f)[0].title;return n.jsxs("div",{className:"boards-container",children:[n.jsx("h1",{style:{fontWeight:"bold"},children:g(i)}),n.jsx(_e,{blocks:u,setPlacements:a,placements:e,gameId:o}),n.jsx(Me,{boards:t,select:l,gameId:o,setBoards:s,placements:e,setPlacements:a,selected:i}),n.jsx("p",{className:"board-control",children:"Boards allow you to create custom collections of information from your blocks. Use this tool to gather all the info you would need for a session. Select a board to view the blocks within. You can click on a block to expand or minimise it. Click the X button to remove it from that board."})]})}function $e({user:t}){const e=Dt(),[r,o]=d.useState("blocks"),[s,a]=d.useState({title:"Loading",colour:"red"}),[i,l]=d.useState([]),[u,p]=d.useState([]),[g,f]=d.useState([]),[v,j]=d.useState([]),[b,N]=d.useState([]);d.useEffect(()=>{h(),y("Blocks").then(c=>l(c)),y("Folders").then(c=>N(c)),y("Links").then(c=>p(c)),y("Boards").then(c=>f(c)),y("Placements").then(c=>j(c))},[]);const h=d.useCallback(async()=>{try{const c=await At(C(E,"Games",e==null?void 0:e.state.gameid)),x={...c.data(),id:c.id};a(x)}catch(c){console.error(c)}}),y=d.useCallback(async c=>{try{const x=Bt(_(E,c),Ot("gameid","==",e==null?void 0:e.state.gameid));return(await Lt(x)).docs.map(A=>({...A.data(),id:A.id}))}catch(x){console.error(x)}});return n.jsx(n.Fragment,{children:t?n.jsxs(n.Fragment,{children:[n.jsx(Pe,{selected:r,setSelected:o,game:s}),n.jsx("div",{children:s.title!=="Loading..."&&n.jsxs(n.Fragment,{children:[r==="details"&&n.jsx(Tt,{game:s,setGame:a,details:[i,b,u,g,v]}),r==="blocks"&&n.jsx(Te,{blocks:i,setBlocks:l,colour:s.colour,setLinks:p,boards:g,gameId:s.id,folders:b,setFolders:N,links:u,setPlacements:j,placements:v}),r==="boards"&&n.jsx(Fe,{boards:g,setBoards:f,placements:v,blocks:i,gameId:s.id,setPlacements:j})]})})]}):n.jsxs("h1",{className:"menu",children:["You must first ",n.jsx(st,{to:"/login",children:"login"})," to access this page"]})})}export{$e as default};
