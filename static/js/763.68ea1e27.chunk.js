"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[763],{3206:function(t,e,s){s.r(e),s.d(e,{default:function(){return v}});var n=s(8683),A=s(5671),u=s(3144),o=s(136),a=s(7277),r=s(2791),l={item:"Profile_item__j3Pq5"},p="ProfileInfo_avatar__jpOAr",i="ProfileInfo_descriptionBlock__aGnXK",c=s.p+"static/media/logo_1.4c139ac6a8744deb9f72.png",S=s(3035),d=s(885),h=s(184),K=function(t){var e=(0,r.useState)(!1),s=(0,d.Z)(e,2),n=s[0],A=s[1],u=(0,r.useState)(""),o=(0,d.Z)(u,2),a=o[0],l=o[1];return(0,r.useEffect)((function(){l(t.status)}),[t.status]),n?(0,h.jsx)("div",{children:(0,h.jsx)("input",{onChange:function(t){l(t.currentTarget.value)},onBlur:function(){A(!1),t.updateStatus(a)},value:a,autoFocus:!0})}):(0,h.jsx)("div",{children:(0,h.jsx)("span",{onDoubleClick:function(){A(!0)},children:t.status||"Status is not defined"})})},U=function(t){var e=t.profile,s=t.status,n=t.updateStatus;if(null===e)return(0,h.jsx)(S.p,{});var A=e.photos.large?e.photos.large:c;return(0,h.jsx)("div",{children:(0,h.jsxs)("div",{className:i,children:[(0,h.jsx)("div",{children:(0,h.jsx)("img",{className:p,src:A,alt:""})}),(0,h.jsx)("span",{children:(0,h.jsx)("strong",{children:null===e||void 0===e?void 0:e.fullName})}),(0,h.jsx)(K,{status:s,updateStatus:n})]})})},f=s(658),g="MyPosts_content__C+XWJ",j="MyPosts_textareaBlock__Pr2uP",P=s(6554),k="Post_item__lcRuh",Q=function(t){return(0,h.jsxs)("div",{className:k,children:[(0,h.jsx)("img",{src:"data:image/jpeg;base64,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",alt:""}),t.message,(0,h.jsx)("div",{children:(0,h.jsxs)("span",{children:[t.likesCount," like"]})})]})},b=s(5705),I=s(132),O=r.memo((function(t){var e=t.postsData.map((function(t){return(0,h.jsx)(Q,{message:t.message,likesCount:t.likesCount},t.id)}));return(0,h.jsxs)("div",{className:g,children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("h3",{children:"My posts"}),(0,h.jsx)("div",{className:j,children:(0,h.jsx)(C,{addNewPost:function(e){""!==e.newPostBody.trim()&&t.addPost(e.newPostBody)}})})]}),e]})})),C=function(t){var e=t.addNewPost,s=(0,b.TA)({initialValues:{newPost:""},validationSchema:I.Ry({newPost:I.Z_().max(30,"Must be 30 characters or less")}),onSubmit:function(t){e({newPostBody:t.newPost}),s.resetForm()}});return(0,h.jsxs)("form",{onSubmit:s.handleSubmit,children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("textarea",(0,n.Z)({id:"newPost",placeholder:"Enter your text"},s.getFieldProps("newPost"))),s.errors.newPost&&s.touched.newPost&&(0,h.jsx)("div",{className:P.Z.commonErrorMessage,children:s.errors.newPost})]}),(0,h.jsx)("div",{children:(0,h.jsx)("button",{type:"submit",children:"New post"})})]})},J=s(8687),W=(0,J.$j)((function(t){return{postsData:t.profilePage.posts}}),(function(t){return{addPost:function(e){t((0,f.Pi)(e))}}}))(O),x=function(t){return(0,h.jsxs)("div",{className:l.content,children:[(0,h.jsx)(U,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),(0,h.jsx)(W,{})]})},m=s(9271),y=s(7781),D=s(2932),E=function(t){(0,o.Z)(s,t);var e=(0,a.Z)(s);function s(){return(0,A.Z)(this,s),e.apply(this,arguments)}return(0,u.Z)(s,[{key:"componentDidMount",value:function(){var t="",e=this.props.match.params.userId;this.props.authorizedUserID&&(t=e||this.props.authorizedUserID),this.props.getProfile(t),this.props.getUserStatus(t)}},{key:"render",value:function(){return(0,h.jsx)(x,(0,n.Z)((0,n.Z)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateUserStatus}))}}]),s}(r.Component),v=(0,y.qC)((0,J.$j)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserID:t.auth.id,isAuth:t.auth.isAuth}}),{getProfile:f.Ai,getUserStatus:f.Tq,updateUserStatus:f.OL}),m.EN,D.D)(E)},2932:function(t,e,s){s.d(e,{D:function(){return p}});var n=s(8683),A=s(5987),u=(s(2791),s(9271)),o=s(8687),a=s(184),r=["isAuth"],l=function(t){return{isAuth:t.auth.isAuth}};function p(t){return(0,o.$j)(l)((function(e){var s=e.isAuth,o=(0,A.Z)(e,r);return s?(0,a.jsx)(t,(0,n.Z)({},o)):(0,a.jsx)(u.l_,{to:"/login"})}))}},5987:function(t,e,s){s.d(e,{Z:function(){return A}});var n=s(3366);function A(t,e){if(null==t)return{};var s,A,u=(0,n.Z)(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(A=0;A<o.length;A++)s=o[A],e.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(t,s)&&(u[s]=t[s])}return u}}}]);
//# sourceMappingURL=763.68ea1e27.chunk.js.map