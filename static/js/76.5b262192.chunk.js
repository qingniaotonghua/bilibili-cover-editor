(this["webpackJsonpbanner-editor"]=this["webpackJsonpbanner-editor"]||[]).push([[76],{768:function(e,n,t){"use strict";t.r(n),t.d(n,"setupMode",(function(){return Pe}));var r,i,o,a,s,u,c,d,f,g,l,h,p,v,m,_,w,y,b,k,C,E,x,I,A,S,T=t(246),R=function(){function e(e){var n=this;this._defaults=e,this._worker=null,this._idleCheckInterval=window.setInterval((function(){return n._checkIfIdle()}),3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange((function(){return n._stopWorker()}))}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},e.prototype._checkIfIdle=function(){this._worker&&(Date.now()-this._lastUsedTime>12e4&&this._stopWorker())},e.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=T.editor.createWebWorker({moduleId:"vs/language/css/cssWorker",label:this._defaults.languageId,createData:{options:this._defaults.options,languageId:this._defaults.languageId}}),this._client=this._worker.getProxy()),this._client},e.prototype.getLanguageServiceWorker=function(){for(var e,n=this,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return this._getClient().then((function(n){e=n})).then((function(e){return n._worker.withSyncedResources(t)})).then((function(n){return e}))},e}();!function(e){e.MIN_VALUE=-2147483648,e.MAX_VALUE=2147483647}(r||(r={})),function(e){e.MIN_VALUE=0,e.MAX_VALUE=2147483647}(i||(i={})),function(e){e.create=function(e,n){return e===Number.MAX_VALUE&&(e=i.MAX_VALUE),n===Number.MAX_VALUE&&(n=i.MAX_VALUE),{line:e,character:n}},e.is=function(e){var n=e;return de.objectLiteral(n)&&de.uinteger(n.line)&&de.uinteger(n.character)}}(o||(o={})),function(e){e.create=function(e,n,t,r){if(de.uinteger(e)&&de.uinteger(n)&&de.uinteger(t)&&de.uinteger(r))return{start:o.create(e,n),end:o.create(t,r)};if(o.is(e)&&o.is(n))return{start:e,end:n};throw new Error("Range#create called with invalid arguments["+e+", "+n+", "+t+", "+r+"]")},e.is=function(e){var n=e;return de.objectLiteral(n)&&o.is(n.start)&&o.is(n.end)}}(a||(a={})),function(e){e.create=function(e,n){return{uri:e,range:n}},e.is=function(e){var n=e;return de.defined(n)&&a.is(n.range)&&(de.string(n.uri)||de.undefined(n.uri))}}(s||(s={})),function(e){e.create=function(e,n,t,r){return{targetUri:e,targetRange:n,targetSelectionRange:t,originSelectionRange:r}},e.is=function(e){var n=e;return de.defined(n)&&a.is(n.targetRange)&&de.string(n.targetUri)&&(a.is(n.targetSelectionRange)||de.undefined(n.targetSelectionRange))&&(a.is(n.originSelectionRange)||de.undefined(n.originSelectionRange))}}(u||(u={})),function(e){e.create=function(e,n,t,r){return{red:e,green:n,blue:t,alpha:r}},e.is=function(e){var n=e;return de.numberRange(n.red,0,1)&&de.numberRange(n.green,0,1)&&de.numberRange(n.blue,0,1)&&de.numberRange(n.alpha,0,1)}}(c||(c={})),function(e){e.create=function(e,n){return{range:e,color:n}},e.is=function(e){var n=e;return a.is(n.range)&&c.is(n.color)}}(d||(d={})),function(e){e.create=function(e,n,t){return{label:e,textEdit:n,additionalTextEdits:t}},e.is=function(e){var n=e;return de.string(n.label)&&(de.undefined(n.textEdit)||y.is(n))&&(de.undefined(n.additionalTextEdits)||de.typedArray(n.additionalTextEdits,y.is))}}(f||(f={})),function(e){e.Comment="comment",e.Imports="imports",e.Region="region"}(g||(g={})),function(e){e.create=function(e,n,t,r,i){var o={startLine:e,endLine:n};return de.defined(t)&&(o.startCharacter=t),de.defined(r)&&(o.endCharacter=r),de.defined(i)&&(o.kind=i),o},e.is=function(e){var n=e;return de.uinteger(n.startLine)&&de.uinteger(n.startLine)&&(de.undefined(n.startCharacter)||de.uinteger(n.startCharacter))&&(de.undefined(n.endCharacter)||de.uinteger(n.endCharacter))&&(de.undefined(n.kind)||de.string(n.kind))}}(l||(l={})),function(e){e.create=function(e,n){return{location:e,message:n}},e.is=function(e){var n=e;return de.defined(n)&&s.is(n.location)&&de.string(n.message)}}(h||(h={})),function(e){e.Error=1,e.Warning=2,e.Information=3,e.Hint=4}(p||(p={})),function(e){e.Unnecessary=1,e.Deprecated=2}(v||(v={})),function(e){e.is=function(e){var n=e;return void 0!==n&&null!==n&&de.string(n.href)}}(m||(m={})),function(e){e.create=function(e,n,t,r,i,o){var a={range:e,message:n};return de.defined(t)&&(a.severity=t),de.defined(r)&&(a.code=r),de.defined(i)&&(a.source=i),de.defined(o)&&(a.relatedInformation=o),a},e.is=function(e){var n,t=e;return de.defined(t)&&a.is(t.range)&&de.string(t.message)&&(de.number(t.severity)||de.undefined(t.severity))&&(de.integer(t.code)||de.string(t.code)||de.undefined(t.code))&&(de.undefined(t.codeDescription)||de.string(null===(n=t.codeDescription)||void 0===n?void 0:n.href))&&(de.string(t.source)||de.undefined(t.source))&&(de.undefined(t.relatedInformation)||de.typedArray(t.relatedInformation,h.is))}}(_||(_={})),function(e){e.create=function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var i={title:e,command:n};return de.defined(t)&&t.length>0&&(i.arguments=t),i},e.is=function(e){var n=e;return de.defined(n)&&de.string(n.title)&&de.string(n.command)}}(w||(w={})),function(e){e.replace=function(e,n){return{range:e,newText:n}},e.insert=function(e,n){return{range:{start:e,end:e},newText:n}},e.del=function(e){return{range:e,newText:""}},e.is=function(e){var n=e;return de.objectLiteral(n)&&de.string(n.newText)&&a.is(n.range)}}(y||(y={})),function(e){e.create=function(e,n,t){var r={label:e};return void 0!==n&&(r.needsConfirmation=n),void 0!==t&&(r.description=t),r},e.is=function(e){var n=e;return void 0!==n&&de.objectLiteral(n)&&de.string(n.label)&&(de.boolean(n.needsConfirmation)||void 0===n.needsConfirmation)&&(de.string(n.description)||void 0===n.description)}}(b||(b={})),function(e){e.is=function(e){return"string"===typeof e}}(k||(k={})),function(e){e.replace=function(e,n,t){return{range:e,newText:n,annotationId:t}},e.insert=function(e,n,t){return{range:{start:e,end:e},newText:n,annotationId:t}},e.del=function(e,n){return{range:e,newText:"",annotationId:n}},e.is=function(e){var n=e;return y.is(n)&&(b.is(n.annotationId)||k.is(n.annotationId))}}(C||(C={})),function(e){e.create=function(e,n){return{textDocument:e,edits:n}},e.is=function(e){var n=e;return de.defined(n)&&P.is(n.textDocument)&&Array.isArray(n.edits)}}(E||(E={})),function(e){e.create=function(e,n,t){var r={kind:"create",uri:e};return void 0===n||void 0===n.overwrite&&void 0===n.ignoreIfExists||(r.options=n),void 0!==t&&(r.annotationId=t),r},e.is=function(e){var n=e;return n&&"create"===n.kind&&de.string(n.uri)&&(void 0===n.options||(void 0===n.options.overwrite||de.boolean(n.options.overwrite))&&(void 0===n.options.ignoreIfExists||de.boolean(n.options.ignoreIfExists)))&&(void 0===n.annotationId||k.is(n.annotationId))}}(x||(x={})),function(e){e.create=function(e,n,t,r){var i={kind:"rename",oldUri:e,newUri:n};return void 0===t||void 0===t.overwrite&&void 0===t.ignoreIfExists||(i.options=t),void 0!==r&&(i.annotationId=r),i},e.is=function(e){var n=e;return n&&"rename"===n.kind&&de.string(n.oldUri)&&de.string(n.newUri)&&(void 0===n.options||(void 0===n.options.overwrite||de.boolean(n.options.overwrite))&&(void 0===n.options.ignoreIfExists||de.boolean(n.options.ignoreIfExists)))&&(void 0===n.annotationId||k.is(n.annotationId))}}(I||(I={})),function(e){e.create=function(e,n,t){var r={kind:"delete",uri:e};return void 0===n||void 0===n.recursive&&void 0===n.ignoreIfNotExists||(r.options=n),void 0!==t&&(r.annotationId=t),r},e.is=function(e){var n=e;return n&&"delete"===n.kind&&de.string(n.uri)&&(void 0===n.options||(void 0===n.options.recursive||de.boolean(n.options.recursive))&&(void 0===n.options.ignoreIfNotExists||de.boolean(n.options.ignoreIfNotExists)))&&(void 0===n.annotationId||k.is(n.annotationId))}}(A||(A={})),function(e){e.is=function(e){var n=e;return n&&(void 0!==n.changes||void 0!==n.documentChanges)&&(void 0===n.documentChanges||n.documentChanges.every((function(e){return de.string(e.kind)?x.is(e)||I.is(e)||A.is(e):E.is(e)})))}}(S||(S={}));var M,D,P,L,F,j,N,O,U,W,V,H,K,z,X,B,J,$,q,Q,G,Y,Z,ee,ne,te,re,ie,oe,ae,se=function(){function e(e,n){this.edits=e,this.changeAnnotations=n}return e.prototype.insert=function(e,n,t){var r,i;if(void 0===t?r=y.insert(e,n):k.is(t)?(i=t,r=C.insert(e,n,t)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(t),r=C.insert(e,n,i)),this.edits.push(r),void 0!==i)return i},e.prototype.replace=function(e,n,t){var r,i;if(void 0===t?r=y.replace(e,n):k.is(t)?(i=t,r=C.replace(e,n,t)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(t),r=C.replace(e,n,i)),this.edits.push(r),void 0!==i)return i},e.prototype.delete=function(e,n){var t,r;if(void 0===n?t=y.del(e):k.is(n)?(r=n,t=C.del(e,n)):(this.assertChangeAnnotations(this.changeAnnotations),r=this.changeAnnotations.manage(n),t=C.del(e,r)),this.edits.push(t),void 0!==r)return r},e.prototype.add=function(e){this.edits.push(e)},e.prototype.all=function(){return this.edits},e.prototype.clear=function(){this.edits.splice(0,this.edits.length)},e.prototype.assertChangeAnnotations=function(e){if(void 0===e)throw new Error("Text edit change is not configured to manage change annotations.")},e}(),ue=function(){function e(e){this._annotations=void 0===e?Object.create(null):e,this._counter=0,this._size=0}return e.prototype.all=function(){return this._annotations},Object.defineProperty(e.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),e.prototype.manage=function(e,n){var t;if(k.is(e)?t=e:(t=this.nextId(),n=e),void 0!==this._annotations[t])throw new Error("Id "+t+" is already in use.");if(void 0===n)throw new Error("No annotation provided for id "+t);return this._annotations[t]=n,this._size++,t},e.prototype.nextId=function(){return this._counter++,this._counter.toString()},e}();!function(){function e(e){var n=this;this._textEditChanges=Object.create(null),void 0!==e?(this._workspaceEdit=e,e.documentChanges?(this._changeAnnotations=new ue(e.changeAnnotations),e.changeAnnotations=this._changeAnnotations.all(),e.documentChanges.forEach((function(e){if(E.is(e)){var t=new se(e.edits,n._changeAnnotations);n._textEditChanges[e.textDocument.uri]=t}}))):e.changes&&Object.keys(e.changes).forEach((function(t){var r=new se(e.changes[t]);n._textEditChanges[t]=r}))):this._workspaceEdit={}}Object.defineProperty(e.prototype,"edit",{get:function(){return this.initDocumentChanges(),void 0!==this._changeAnnotations&&(0===this._changeAnnotations.size?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),e.prototype.getTextEditChange=function(e){if(P.is(e)){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var n={uri:e.uri,version:e.version};if(!(r=this._textEditChanges[n.uri])){var t={textDocument:n,edits:i=[]};this._workspaceEdit.documentChanges.push(t),r=new se(i,this._changeAnnotations),this._textEditChanges[n.uri]=r}return r}if(this.initChanges(),void 0===this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var r;if(!(r=this._textEditChanges[e])){var i=[];this._workspaceEdit.changes[e]=i,r=new se(i),this._textEditChanges[e]=r}return r},e.prototype.initDocumentChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._changeAnnotations=new ue,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},e.prototype.initChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._workspaceEdit.changes=Object.create(null))},e.prototype.createFile=function(e,n,t){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(b.is(n)||k.is(n)?r=n:t=n,void 0===r?i=x.create(e,t):(o=k.is(r)?r:this._changeAnnotations.manage(r),i=x.create(e,t,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o},e.prototype.renameFile=function(e,n,t,r){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var i,o,a;if(b.is(t)||k.is(t)?i=t:r=t,void 0===i?o=I.create(e,n,r):(a=k.is(i)?i:this._changeAnnotations.manage(i),o=I.create(e,n,r,a)),this._workspaceEdit.documentChanges.push(o),void 0!==a)return a},e.prototype.deleteFile=function(e,n,t){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(b.is(n)||k.is(n)?r=n:t=n,void 0===r?i=A.create(e,t):(o=k.is(r)?r:this._changeAnnotations.manage(r),i=A.create(e,t,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o}}();!function(e){e.create=function(e){return{uri:e}},e.is=function(e){var n=e;return de.defined(n)&&de.string(n.uri)}}(M||(M={})),function(e){e.create=function(e,n){return{uri:e,version:n}},e.is=function(e){var n=e;return de.defined(n)&&de.string(n.uri)&&de.integer(n.version)}}(D||(D={})),function(e){e.create=function(e,n){return{uri:e,version:n}},e.is=function(e){var n=e;return de.defined(n)&&de.string(n.uri)&&(null===n.version||de.integer(n.version))}}(P||(P={})),function(e){e.create=function(e,n,t,r){return{uri:e,languageId:n,version:t,text:r}},e.is=function(e){var n=e;return de.defined(n)&&de.string(n.uri)&&de.string(n.languageId)&&de.integer(n.version)&&de.string(n.text)}}(L||(L={})),function(e){e.PlainText="plaintext",e.Markdown="markdown"}(F||(F={})),function(e){e.is=function(n){var t=n;return t===e.PlainText||t===e.Markdown}}(F||(F={})),function(e){e.is=function(e){var n=e;return de.objectLiteral(e)&&F.is(n.kind)&&de.string(n.value)}}(j||(j={})),function(e){e.Text=1,e.Method=2,e.Function=3,e.Constructor=4,e.Field=5,e.Variable=6,e.Class=7,e.Interface=8,e.Module=9,e.Property=10,e.Unit=11,e.Value=12,e.Enum=13,e.Keyword=14,e.Snippet=15,e.Color=16,e.File=17,e.Reference=18,e.Folder=19,e.EnumMember=20,e.Constant=21,e.Struct=22,e.Event=23,e.Operator=24,e.TypeParameter=25}(N||(N={})),function(e){e.PlainText=1,e.Snippet=2}(O||(O={})),function(e){e.Deprecated=1}(U||(U={})),function(e){e.create=function(e,n,t){return{newText:e,insert:n,replace:t}},e.is=function(e){var n=e;return n&&de.string(n.newText)&&a.is(n.insert)&&a.is(n.replace)}}(W||(W={})),function(e){e.asIs=1,e.adjustIndentation=2}(V||(V={})),function(e){e.create=function(e){return{label:e}}}(H||(H={})),function(e){e.create=function(e,n){return{items:e||[],isIncomplete:!!n}}}(K||(K={})),function(e){e.fromPlainText=function(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")},e.is=function(e){var n=e;return de.string(n)||de.objectLiteral(n)&&de.string(n.language)&&de.string(n.value)}}(z||(z={})),function(e){e.is=function(e){var n=e;return!!n&&de.objectLiteral(n)&&(j.is(n.contents)||z.is(n.contents)||de.typedArray(n.contents,z.is))&&(void 0===e.range||a.is(e.range))}}(X||(X={})),function(e){e.create=function(e,n){return n?{label:e,documentation:n}:{label:e}}}(B||(B={})),function(e){e.create=function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var i={label:e};return de.defined(n)&&(i.documentation=n),de.defined(t)?i.parameters=t:i.parameters=[],i}}(J||(J={})),function(e){e.Text=1,e.Read=2,e.Write=3}($||($={})),function(e){e.create=function(e,n){var t={range:e};return de.number(n)&&(t.kind=n),t}}(q||(q={})),function(e){e.File=1,e.Module=2,e.Namespace=3,e.Package=4,e.Class=5,e.Method=6,e.Property=7,e.Field=8,e.Constructor=9,e.Enum=10,e.Interface=11,e.Function=12,e.Variable=13,e.Constant=14,e.String=15,e.Number=16,e.Boolean=17,e.Array=18,e.Object=19,e.Key=20,e.Null=21,e.EnumMember=22,e.Struct=23,e.Event=24,e.Operator=25,e.TypeParameter=26}(Q||(Q={})),function(e){e.Deprecated=1}(G||(G={})),function(e){e.create=function(e,n,t,r,i){var o={name:e,kind:n,location:{uri:r,range:t}};return i&&(o.containerName=i),o}}(Y||(Y={})),function(e){e.create=function(e,n,t,r,i,o){var a={name:e,detail:n,kind:t,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a},e.is=function(e){var n=e;return n&&de.string(n.name)&&de.number(n.kind)&&a.is(n.range)&&a.is(n.selectionRange)&&(void 0===n.detail||de.string(n.detail))&&(void 0===n.deprecated||de.boolean(n.deprecated))&&(void 0===n.children||Array.isArray(n.children))&&(void 0===n.tags||Array.isArray(n.tags))}}(Z||(Z={})),function(e){e.Empty="",e.QuickFix="quickfix",e.Refactor="refactor",e.RefactorExtract="refactor.extract",e.RefactorInline="refactor.inline",e.RefactorRewrite="refactor.rewrite",e.Source="source",e.SourceOrganizeImports="source.organizeImports",e.SourceFixAll="source.fixAll"}(ee||(ee={})),function(e){e.create=function(e,n){var t={diagnostics:e};return void 0!==n&&null!==n&&(t.only=n),t},e.is=function(e){var n=e;return de.defined(n)&&de.typedArray(n.diagnostics,_.is)&&(void 0===n.only||de.typedArray(n.only,de.string))}}(ne||(ne={})),function(e){e.create=function(e,n,t){var r={title:e},i=!0;return"string"===typeof n?(i=!1,r.kind=n):w.is(n)?r.command=n:r.edit=n,i&&void 0!==t&&(r.kind=t),r},e.is=function(e){var n=e;return n&&de.string(n.title)&&(void 0===n.diagnostics||de.typedArray(n.diagnostics,_.is))&&(void 0===n.kind||de.string(n.kind))&&(void 0!==n.edit||void 0!==n.command)&&(void 0===n.command||w.is(n.command))&&(void 0===n.isPreferred||de.boolean(n.isPreferred))&&(void 0===n.edit||S.is(n.edit))}}(te||(te={})),function(e){e.create=function(e,n){var t={range:e};return de.defined(n)&&(t.data=n),t},e.is=function(e){var n=e;return de.defined(n)&&a.is(n.range)&&(de.undefined(n.command)||w.is(n.command))}}(re||(re={})),function(e){e.create=function(e,n){return{tabSize:e,insertSpaces:n}},e.is=function(e){var n=e;return de.defined(n)&&de.uinteger(n.tabSize)&&de.boolean(n.insertSpaces)}}(ie||(ie={})),function(e){e.create=function(e,n,t){return{range:e,target:n,data:t}},e.is=function(e){var n=e;return de.defined(n)&&a.is(n.range)&&(de.undefined(n.target)||de.string(n.target))}}(oe||(oe={})),function(e){e.create=function(e,n){return{range:e,parent:n}},e.is=function(n){var t=n;return void 0!==t&&a.is(t.range)&&(void 0===t.parent||e.is(t.parent))}}(ae||(ae={}));var ce;!function(e){function n(e,t){if(e.length<=1)return e;var r=e.length/2|0,i=e.slice(0,r),o=e.slice(r);n(i,t),n(o,t);for(var a=0,s=0,u=0;a<i.length&&s<o.length;){var c=t(i[a],o[s]);e[u++]=c<=0?i[a++]:o[s++]}for(;a<i.length;)e[u++]=i[a++];for(;s<o.length;)e[u++]=o[s++];return e}e.create=function(e,n,t,r){return new fe(e,n,t,r)},e.is=function(e){var n=e;return!!(de.defined(n)&&de.string(n.uri)&&(de.undefined(n.languageId)||de.string(n.languageId))&&de.uinteger(n.lineCount)&&de.func(n.getText)&&de.func(n.positionAt)&&de.func(n.offsetAt))},e.applyEdits=function(e,t){for(var r=e.getText(),i=n(t,(function(e,n){var t=e.range.start.line-n.range.start.line;return 0===t?e.range.start.character-n.range.start.character:t})),o=r.length,a=i.length-1;a>=0;a--){var s=i[a],u=e.offsetAt(s.range.start),c=e.offsetAt(s.range.end);if(!(c<=o))throw new Error("Overlapping edit");r=r.substring(0,u)+s.newText+r.substring(c,r.length),o=u}return r}}(ce||(ce={}));var de,fe=function(){function e(e,n,t,r){this._uri=e,this._languageId=n,this._version=t,this._content=r,this._lineOffsets=void 0}return Object.defineProperty(e.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),e.prototype.getText=function(e){if(e){var n=this.offsetAt(e.start),t=this.offsetAt(e.end);return this._content.substring(n,t)}return this._content},e.prototype.update=function(e,n){this._content=e.text,this._version=n,this._lineOffsets=void 0},e.prototype.getLineOffsets=function(){if(void 0===this._lineOffsets){for(var e=[],n=this._content,t=!0,r=0;r<n.length;r++){t&&(e.push(r),t=!1);var i=n.charAt(r);t="\r"===i||"\n"===i,"\r"===i&&r+1<n.length&&"\n"===n.charAt(r+1)&&r++}t&&n.length>0&&e.push(n.length),this._lineOffsets=e}return this._lineOffsets},e.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var n=this.getLineOffsets(),t=0,r=n.length;if(0===r)return o.create(0,e);for(;t<r;){var i=Math.floor((t+r)/2);n[i]>e?r=i:t=i+1}var a=t-1;return o.create(a,e-n[a])},e.prototype.offsetAt=function(e){var n=this.getLineOffsets();if(e.line>=n.length)return this._content.length;if(e.line<0)return 0;var t=n[e.line],r=e.line+1<n.length?n[e.line+1]:this._content.length;return Math.max(Math.min(t+e.character,r),t)},Object.defineProperty(e.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),e}();!function(e){var n=Object.prototype.toString;e.defined=function(e){return"undefined"!==typeof e},e.undefined=function(e){return"undefined"===typeof e},e.boolean=function(e){return!0===e||!1===e},e.string=function(e){return"[object String]"===n.call(e)},e.number=function(e){return"[object Number]"===n.call(e)},e.numberRange=function(e,t,r){return"[object Number]"===n.call(e)&&t<=e&&e<=r},e.integer=function(e){return"[object Number]"===n.call(e)&&-2147483648<=e&&e<=2147483647},e.uinteger=function(e){return"[object Number]"===n.call(e)&&0<=e&&e<=2147483647},e.func=function(e){return"[object Function]"===n.call(e)},e.objectLiteral=function(e){return null!==e&&"object"===typeof e},e.typedArray=function(e,n){return Array.isArray(e)&&e.every(n)}}(de||(de={}));var ge=function(){function e(e,n,t){var r=this;this._languageId=e,this._worker=n,this._disposables=[],this._listener=Object.create(null);var i=function(e){var n,t=e.getLanguageId();t===r._languageId&&(r._listener[e.uri.toString()]=e.onDidChangeContent((function(){window.clearTimeout(n),n=window.setTimeout((function(){return r._doValidate(e.uri,t)}),500)})),r._doValidate(e.uri,t))},o=function(e){T.editor.setModelMarkers(e,r._languageId,[]);var n=e.uri.toString(),t=r._listener[n];t&&(t.dispose(),delete r._listener[n])};this._disposables.push(T.editor.onDidCreateModel(i)),this._disposables.push(T.editor.onWillDisposeModel(o)),this._disposables.push(T.editor.onDidChangeModelLanguage((function(e){o(e.model),i(e.model)}))),t.onDidChange((function(e){T.editor.getModels().forEach((function(e){e.getLanguageId()===r._languageId&&(o(e),i(e))}))})),this._disposables.push({dispose:function(){for(var e in r._listener)r._listener[e].dispose()}}),T.editor.getModels().forEach(i)}return e.prototype.dispose=function(){this._disposables.forEach((function(e){return e&&e.dispose()})),this._disposables=[]},e.prototype._doValidate=function(e,n){this._worker(e).then((function(n){return n.doValidation(e.toString())})).then((function(t){var r=t.map((function(e){return function(e,n){var t="number"===typeof n.code?String(n.code):n.code;return{severity:le(n.severity),startLineNumber:n.range.start.line+1,startColumn:n.range.start.character+1,endLineNumber:n.range.end.line+1,endColumn:n.range.end.character+1,message:n.message,code:t,source:n.source}}(0,e)})),i=T.editor.getModel(e);i&&i.getLanguageId()===n&&T.editor.setModelMarkers(i,n,r)})).then(void 0,(function(e){console.error(e)}))},e}();function le(e){switch(e){case p.Error:return T.MarkerSeverity.Error;case p.Warning:return T.MarkerSeverity.Warning;case p.Information:return T.MarkerSeverity.Info;case p.Hint:return T.MarkerSeverity.Hint;default:return T.MarkerSeverity.Info}}function he(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function pe(e){if(e)return new T.Range(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function ve(e){var n=T.languages.CompletionItemKind;switch(e){case N.Text:return n.Text;case N.Method:return n.Method;case N.Function:return n.Function;case N.Constructor:return n.Constructor;case N.Field:return n.Field;case N.Variable:return n.Variable;case N.Class:return n.Class;case N.Interface:return n.Interface;case N.Module:return n.Module;case N.Property:return n.Property;case N.Unit:return n.Unit;case N.Value:return n.Value;case N.Enum:return n.Enum;case N.Keyword:return n.Keyword;case N.Snippet:return n.Snippet;case N.Color:return n.Color;case N.File:return n.File;case N.Reference:return n.Reference}return n.Property}function me(e){if(e)return{range:pe(e.range),text:e.newText}}var _e=function(){function e(e){this._worker=e}return Object.defineProperty(e.prototype,"triggerCharacters",{get:function(){return["/","-",":"]},enumerable:!1,configurable:!0}),e.prototype.provideCompletionItems=function(e,n,t,r){var i=e.uri;return this._worker(i).then((function(e){return e.doComplete(i.toString(),he(n))})).then((function(t){if(t){var r=e.getWordUntilPosition(n),i=new T.Range(n.lineNumber,r.startColumn,n.lineNumber,r.endColumn),o=t.items.map((function(e){var n,t,r={label:e.label,insertText:e.insertText||e.label,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,command:(n=e.command,n&&"editor.action.triggerSuggest"===n.command?{id:n.command,title:n.title,arguments:n.arguments}:void 0),range:i,kind:ve(e.kind)};return e.textEdit&&("undefined"!==typeof(t=e.textEdit).insert&&"undefined"!==typeof t.replace?r.range={insert:pe(e.textEdit.insert),replace:pe(e.textEdit.replace)}:r.range=pe(e.textEdit.range),r.insertText=e.textEdit.newText),e.additionalTextEdits&&(r.additionalTextEdits=e.additionalTextEdits.map(me)),e.insertTextFormat===O.Snippet&&(r.insertTextRules=T.languages.CompletionItemInsertTextRule.InsertAsSnippet),r}));return{isIncomplete:t.isIncomplete,suggestions:o}}}))},e}();function we(e){return"string"===typeof e?{value:e}:(n=e)&&"object"===typeof n&&"string"===typeof n.kind?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"};var n}function ye(e){if(e)return Array.isArray(e)?e.map(we):[we(e)]}var be=function(){function e(e){this._worker=e}return e.prototype.provideHover=function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.doHover(r.toString(),he(n))})).then((function(e){if(e)return{range:pe(e.range),contents:ye(e.contents)}}))},e}();function ke(e){switch(e){case $.Read:return T.languages.DocumentHighlightKind.Read;case $.Write:return T.languages.DocumentHighlightKind.Write;case $.Text:return T.languages.DocumentHighlightKind.Text}return T.languages.DocumentHighlightKind.Text}var Ce=function(){function e(e){this._worker=e}return e.prototype.provideDocumentHighlights=function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.findDocumentHighlights(r.toString(),he(n))})).then((function(e){if(e)return e.map((function(e){return{range:pe(e.range),kind:ke(e.kind)}}))}))},e}();function Ee(e){return{uri:T.Uri.parse(e.uri),range:pe(e.range)}}var xe=function(){function e(e){this._worker=e}return e.prototype.provideDefinition=function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.findDefinition(r.toString(),he(n))})).then((function(e){if(e)return[Ee(e)]}))},e}(),Ie=function(){function e(e){this._worker=e}return e.prototype.provideReferences=function(e,n,t,r){var i=e.uri;return this._worker(i).then((function(e){return e.findReferences(i.toString(),he(n))})).then((function(e){if(e)return e.map(Ee)}))},e}();var Ae=function(){function e(e){this._worker=e}return e.prototype.provideRenameEdits=function(e,n,t,r){var i=e.uri;return this._worker(i).then((function(e){return e.doRename(i.toString(),he(n),t)})).then((function(e){return function(e){if(e&&e.changes){var n=[];for(var t in e.changes)for(var r=T.Uri.parse(t),i=0,o=e.changes[t];i<o.length;i++){var a=o[i];n.push({resource:r,edit:{range:pe(a.range),text:a.newText}})}return{edits:n}}}(e)}))},e}();function Se(e){var n=T.languages.SymbolKind;switch(e){case Q.File:return n.Array;case Q.Module:return n.Module;case Q.Namespace:return n.Namespace;case Q.Package:return n.Package;case Q.Class:return n.Class;case Q.Method:return n.Method;case Q.Property:return n.Property;case Q.Field:return n.Field;case Q.Constructor:return n.Constructor;case Q.Enum:return n.Enum;case Q.Interface:return n.Interface;case Q.Function:return n.Function;case Q.Variable:return n.Variable;case Q.Constant:return n.Constant;case Q.String:return n.String;case Q.Number:return n.Number;case Q.Boolean:return n.Boolean;case Q.Array:return n.Array}return n.Function}var Te=function(){function e(e){this._worker=e}return e.prototype.provideDocumentSymbols=function(e,n){var t=e.uri;return this._worker(t).then((function(e){return e.findDocumentSymbols(t.toString())})).then((function(e){if(e)return e.map((function(e){return{name:e.name,detail:"",containerName:e.containerName,kind:Se(e.kind),tags:[],range:pe(e.location.range),selectionRange:pe(e.location.range)}}))}))},e}(),Re=function(){function e(e){this._worker=e}return e.prototype.provideDocumentColors=function(e,n){var t=e.uri;return this._worker(t).then((function(e){return e.findDocumentColors(t.toString())})).then((function(e){if(e)return e.map((function(e){return{color:e.color,range:pe(e.range)}}))}))},e.prototype.provideColorPresentations=function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.getColorPresentations(r.toString(),n.color,function(e){if(e)return{start:{line:e.startLineNumber-1,character:e.startColumn-1},end:{line:e.endLineNumber-1,character:e.endColumn-1}}}(n.range))})).then((function(e){if(e)return e.map((function(e){var n={label:e.label};return e.textEdit&&(n.textEdit=me(e.textEdit)),e.additionalTextEdits&&(n.additionalTextEdits=e.additionalTextEdits.map(me)),n}))}))},e}(),Me=function(){function e(e){this._worker=e}return e.prototype.provideFoldingRanges=function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.getFoldingRanges(r.toString(),n)})).then((function(e){if(e)return e.map((function(e){var n={start:e.startLine+1,end:e.endLine+1};return"undefined"!==typeof e.kind&&(n.kind=function(e){switch(e){case g.Comment:return T.languages.FoldingRangeKind.Comment;case g.Imports:return T.languages.FoldingRangeKind.Imports;case g.Region:return T.languages.FoldingRangeKind.Region}}(e.kind)),n}))}))},e}();var De=function(){function e(e){this._worker=e}return e.prototype.provideSelectionRanges=function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.getSelectionRanges(r.toString(),n.map(he))})).then((function(e){if(e)return e.map((function(e){for(var n=[];e;)n.push({range:pe(e.range)}),e=e.parent;return n}))}))},e}();function Pe(e){var n=[],t=[],r=new R(e);n.push(r);var i=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return r.getLanguageServiceWorker.apply(r,e)};return function(){var n=e.languageId,r=e.modeConfiguration;Fe(t),r.completionItems&&t.push(T.languages.registerCompletionItemProvider(n,new _e(i))),r.hovers&&t.push(T.languages.registerHoverProvider(n,new be(i))),r.documentHighlights&&t.push(T.languages.registerDocumentHighlightProvider(n,new Ce(i))),r.definitions&&t.push(T.languages.registerDefinitionProvider(n,new xe(i))),r.references&&t.push(T.languages.registerReferenceProvider(n,new Ie(i))),r.documentSymbols&&t.push(T.languages.registerDocumentSymbolProvider(n,new Te(i))),r.rename&&t.push(T.languages.registerRenameProvider(n,new Ae(i))),r.colors&&t.push(T.languages.registerColorProvider(n,new Re(i))),r.foldingRanges&&t.push(T.languages.registerFoldingRangeProvider(n,new Me(i))),r.diagnostics&&t.push(new ge(n,i,e)),r.selectionRanges&&t.push(T.languages.registerSelectionRangeProvider(n,new De(i)))}(),n.push(Le(t)),Le(n)}function Le(e){return{dispose:function(){return Fe(e)}}}function Fe(e){for(;e.length;)e.pop().dispose()}}}]);
//# sourceMappingURL=76.5b262192.chunk.js.map