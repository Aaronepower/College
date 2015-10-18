!function(t,e,i){"use strict";function a(){var e=t("#image-canvas")[0],i=t("canvas"),a=i.width(),c=i.height();o=new r,o.image=this,o.canvas=e,o.changeSize(this.width,this.height,a,c),o.y=Math.floor(c/2-o.height/2),o.x=Math.floor(a/2-o.width/2),o.draw(),t("#opacity-label").text("Opacity: 100%"),t(".setting").each(function(t,e){e.disabled=!1}).filter("#size").each(function(t,e){var i=this.width,a=o.width;e.min=.1*i,e.max=i,e.value=a,h(i,a)}.bind(this)).on("input",function(t){var e=t.target.value,i=o.width,a=o.height;o.changeSize(this.width,this.height,e),o.x-=n(o.width,i)/2,o.y-=n(o.height,a)/2,o.draw(),h(this.width,e)}.bind(this)).end().filter("#opacity").each(function(){}).on("input",function(e){var i=e.target.value;t("#opacity-label").text("Opacity: "+Math.floor(100*i)+"%"),o.canvas.getContext("2d").globalAlpha=i,o.draw()}).end().filter("#filter").change(function(e){var i=t("#filter-canvas"),n=i[0].getContext("2d");n.fillStyle=e.target.value,n.fillRect(0,0,a,c)}).end().filter("#clear").click(function(){var e=t("#filter-canvas")[0].getContext("2d");e.clearRect(0,0,a,c),t("")}).end().filter("#filter-opacity").each(function(e,i){t("#filter-canvas")[0].getContext("2d").globalAlpha=i.value,console.log(i.value),t("#filter-opacity-label").append(" "+Math.floor(100*i.value)+"%")}).change(function(e){var i=t("#filter-canvas"),n=i[0].getContext("2d");n.globalAlpha=e.target.value,n.clearRect(0,0,a,c),n.fillRect(0,0,a,c),t("#filter-opacity-label").text("Filter Opacity: "+Math.floor(100*e.target.value)+"%")})}function n(t,e){return t>e?Math.floor(t-e):Math.floor(-(e-t))}function h(e,i){var a=Math.floor(i/e*100);t("#size-label").text("size: "+a+"%")}function r(t){this.image=t,this.canvas=null,this.x=0,this.y=0,this.prevX=0,this.prevY=0,this.width=0,this.height=0}var o=new r,c=!1;t("canvas").each(function(e,i){var a=t(i);t(".canvas-container").height(a.parent().width()),i.width=a.parent().width(),i.height=a.parent().width()}).filter("#image-canvas").mousedown(function(){c=!0}).mouseup(function(){c=!1}).mousemove(function(t){o.image&&c&&(o.x+=n(t.clientX,o.prevX),o.y+=n(t.clientY,o.prevY),o.draw()),o.prevX=t.clientX,o.prevY=t.clientY}),t("#file").change(function(t){var e=t.target.files[0],i=new Image;i.onload=a,i.src=URL.createObjectURL(e)}),r.prototype.changeSize=function(t,e,i){var a=e/t,n=Math.ceil(a*i);if(n>i){var h=t/e,r=Math.ceil(h*i);this.width=r,this.height=i}else this.width=i,this.height=n},r.prototype.setPos=function(t,e){this.x=t,this.y=e},r.prototype.draw=function(e,i,a,n){e=e||this.x,i=i||this.y,a=a||this.width,n=n||this.height;var h=t(this.canvas),r=this.canvas.getContext("2d");r.clearRect(0,0,h.width(),h.height()),r.drawImage(this.image,e,i,a,n)};var l=function(e){return function(i){var a,n=t(".username").val(),h=t(".password").val();if("login"==e)a={username:n,password:h};else if("register"==e){var r=t(".confirm").val();if(confim!=h)return t("#error").val("passwords don't match."),!1;a={username:n,password:h,confirm:r}}return t.ajax({url:"/users/"+e,method:"POST",data:a,success:function(t){}}),!1}};t("#login").submit(l("login")),t("#register").submit(l("register"))}($,window,document);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbnZhcy5qcyIsImR5bmFtaWNJbWFnZS5qcyIsImZvcm1zLmpzIiwic2NyaXB0LmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJkb2N1bWVudCIsIm9uSW1hZ2VMb2FkIiwiY2FudmFzIiwiJGNhbnZhcyIsImNhbnZhc1dpZHRoIiwid2lkdGgiLCJjYW52YXNIZWlnaHQiLCJoZWlnaHQiLCJkeUltYWdlIiwiRHlJbWFnZSIsImltYWdlIiwidGhpcyIsImNoYW5nZVNpemUiLCJ5IiwiTWF0aCIsImZsb29yIiwieCIsImRyYXciLCJ0ZXh0IiwiZWFjaCIsIl8iLCJlbGVtZW50IiwiZGlzYWJsZWQiLCJmaWx0ZXIiLCJzaXplIiwiZFdpZHRoIiwibWluIiwibWF4IiwidmFsdWUiLCJjaGFuZ2VTaXplUGVyY2VudGFnZSIsImJpbmQiLCJvbiIsImV2ZW50IiwibmV3V2lkdGgiLCJ0YXJnZXQiLCJvbGRXaWR0aCIsIm9sZEhlaWdodCIsImRpZmYiLCJlbmQiLCJuZXdPcGFjaXR5IiwiZ2V0Q29udGV4dCIsImdsb2JhbEFscGhhIiwiY2hhbmdlIiwiY29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiY2xpY2siLCJjbGVhclJlY3QiLCJjb25zb2xlIiwibG9nIiwiYXBwZW5kIiwiYSIsImIiLCJpbWFnZVdpZHRoIiwiZHlJbWFnZVdpZHRoIiwicGVyY2VudGFnZSIsInByZXZYIiwicHJldlkiLCJpc01vdXNlZG93biIsImkiLCJwYXJlbnQiLCJtb3VzZWRvd24iLCJtb3VzZXVwIiwibW91c2Vtb3ZlIiwiY2xpZW50WCIsImNsaWVudFkiLCJmaWxlIiwiZmlsZXMiLCJJbWFnZSIsIm9ubG9hZCIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInByb3RvdHlwZSIsImFzcGVjdFJhdGlvIiwibmV3SGVpZ2h0IiwiY2VpbCIsIm5ld0FzcGVjdFJhdGlvIiwic2V0UG9zIiwiZHJhd0ltYWdlIiwic3VibWl0IiwiZm9ybVR5cGUiLCJkYXRhIiwidXNlcm5hbWUiLCJ2YWwiLCJwYXNzd29yZCIsImNvbmZpcm0iLCJjb25maW0iLCJhamF4IiwidXJsIiwibWV0aG9kIiwic3VjY2VzcyIsImFyZ3VtZW50Il0sIm1hcHBpbmdzIjoiQ0FBQSxTQUFBQSxFQUFBQyxFQUFBQyxHQUNBLFlBa0NBLFNBQUFDLEtBQ0EsR0FBQUMsR0FBQUosRUFBQSxpQkFBQSxHQUNBSyxFQUFBTCxFQUFBLFVBQ0FNLEVBQUFELEVBQUFFLFFBQ0FDLEVBQUFILEVBQUFJLFFBRUFDLEdBQUEsR0FBQUMsR0FDQUQsRUFBQUUsTUFBQUMsS0FDQUgsRUFBQU4sT0FBQUEsRUFDQU0sRUFBQUksV0FBQUQsS0FBQU4sTUFBQU0sS0FBQUosT0FBQUgsRUFBQUUsR0FDQUUsRUFBQUssRUFBQUMsS0FBQUMsTUFBQVQsRUFBQSxFQUFBRSxFQUFBRCxPQUFBLEdBQ0FDLEVBQUFRLEVBQUFGLEtBQUFDLE1BQUFYLEVBQUEsRUFBQUksRUFBQUgsTUFBQSxHQUNBRyxFQUFBUyxPQUdBbkIsRUFBQSxrQkFBQW9CLEtBQUEsaUJBQ0FwQixFQUFBLFlBQ0FxQixLQUFBLFNBQUFDLEVBQUFDLEdBQ0FBLEVBQUFDLFVBQUEsSUFHQUMsT0FBQSxTQUNBSixLQUFBLFNBQUFDLEVBQUFJLEdBQ0EsR0FBQW5CLEdBQUFNLEtBQUFOLE1BQ0FvQixFQUFBakIsRUFBQUgsS0FDQW1CLEdBQUFFLElBQUEsR0FBQXJCLEVBQ0FtQixFQUFBRyxJQUFBdEIsRUFDQW1CLEVBQUFJLE1BQUFILEVBQ0FJLEVBQUF4QixFQUFBb0IsSUFDQUssS0FBQW5CLE9BQ0FvQixHQUFBLFFBQUEsU0FBQUMsR0FDQSxHQUFBQyxHQUFBRCxFQUFBRSxPQUFBTixNQUNBTyxFQUFBM0IsRUFBQUgsTUFDQStCLEVBQUE1QixFQUFBRCxNQUVBQyxHQUFBSSxXQUFBRCxLQUFBTixNQUFBTSxLQUFBSixPQUFBMEIsR0FDQXpCLEVBQUFRLEdBQUFxQixFQUFBN0IsRUFBQUgsTUFBQThCLEdBQUEsRUFDQTNCLEVBQUFLLEdBQUF3QixFQUFBN0IsRUFB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RUFBQSxDQUVBLEdBQUFLLEdBQUF4RixFQUFBLFlBQUFzRixLQUVBLElBQUFHLFFBQUFGLEVBRUEsTUFEQXZGLEdBQUEsVUFBQXNGLElBQUEsMkJBQ0EsQ0FHQUYsSUFBQUMsU0FBQUEsRUFDQUUsU0FBQUEsRUFDQUMsUUFBQUEsR0FjQSxNQVRBeEYsR0FBQTBGLE1BQ0FDLElBQUEsVUFBQVIsRUFDQVMsT0FBQSxPQUNBUixLQUFBQSxFQUNBUyxRQUFBLFNBQUFDLFFBS0EsR0FJQTlGLEdBQUEsVUFBQWtGLE9BQUFBLEVBQUEsVUNvTEFsRixFQUFFLGFBQWFrRixPQUFPQSxFQUFPLGNBQzFCbEYsRUFBR0MsT0FBUUMiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGR5SW1hZ2UgPSBuZXcgRHlJbWFnZSgpXHJcbiAgLCBpc01vdXNlZG93biA9IGZhbHNlXHJcblxyXG4kKCdjYW52YXMnKVxyXG4uZWFjaChmdW5jdGlvbiAoaSwgY2FudmFzKSB7XHJcbiAgICB2YXIgJGNhbnZhcyA9ICQoY2FudmFzKVxyXG4gICAgJCgnLmNhbnZhcy1jb250YWluZXInKS5oZWlnaHQoJGNhbnZhcy5wYXJlbnQoKS53aWR0aCgpKVxyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9ICRjYW52YXMucGFyZW50KCkud2lkdGgoKVxyXG4gICAgY2FudmFzLmhlaWdodCA9ICRjYW52YXMucGFyZW50KCkud2lkdGgoKVxyXG59KVxyXG4uZmlsdGVyKCcjaW1hZ2UtY2FudmFzJylcclxuLm1vdXNlZG93bihmdW5jdGlvbigpIHtpc01vdXNlZG93biA9IHRydWV9KVxyXG4ubW91c2V1cChmdW5jdGlvbigpIHtpc01vdXNlZG93biA9IGZhbHNlfSlcclxuLm1vdXNlbW92ZShmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChkeUltYWdlLmltYWdlICYmIGlzTW91c2Vkb3duKSB7XHJcblxyXG4gICAgICAgIGR5SW1hZ2UueCArPSBkaWZmKGV2ZW50LmNsaWVudFgsIGR5SW1hZ2UucHJldlgpXHJcbiAgICAgICAgZHlJbWFnZS55ICs9IGRpZmYoZXZlbnQuY2xpZW50WSwgZHlJbWFnZS5wcmV2WSlcclxuICAgICAgICBkeUltYWdlLmRyYXcoKVxyXG4gICAgfVxyXG5cclxuICAgIGR5SW1hZ2UucHJldlggPSBldmVudC5jbGllbnRYXHJcbiAgICBkeUltYWdlLnByZXZZID0gZXZlbnQuY2xpZW50WVxyXG59KVxyXG5cclxuJCgnI2ZpbGUnKS5jaGFuZ2UoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB2YXIgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXVxyXG4gICAgdmFyIGltYWdlID0gbmV3IEltYWdlKClcclxuICAgIGltYWdlLm9ubG9hZCA9IG9uSW1hZ2VMb2FkXHJcbiAgICBpbWFnZS5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBvbkltYWdlTG9hZCAoKSB7XHJcbiAgICB2YXIgY2FudmFzID0gJCgnI2ltYWdlLWNhbnZhcycpWzBdXHJcbiAgICAgICwgJGNhbnZhcyA9ICQoJ2NhbnZhcycpXHJcbiAgICAgICwgY2FudmFzV2lkdGggPSAkY2FudmFzLndpZHRoKClcclxuICAgICAgLCBjYW52YXNIZWlnaHQgPSAkY2FudmFzLmhlaWdodCgpXHJcblxyXG4gICAgZHlJbWFnZSA9IG5ldyBEeUltYWdlKClcclxuICAgIGR5SW1hZ2UuaW1hZ2UgPSB0aGlzXHJcbiAgICBkeUltYWdlLmNhbnZhcyA9IGNhbnZhc1xyXG4gICAgZHlJbWFnZS5jaGFuZ2VTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KVxyXG4gICAgZHlJbWFnZS55ID0gTWF0aC5mbG9vcigoY2FudmFzSGVpZ2h0IC8gMikgLSAoZHlJbWFnZS5oZWlnaHQgLyAyKSlcclxuICAgIGR5SW1hZ2UueCA9IE1hdGguZmxvb3IoKGNhbnZhc1dpZHRoIC8yICkgLSAoZHlJbWFnZS53aWR0aCAvIDIpKVxyXG4gICAgZHlJbWFnZS5kcmF3KClcclxuXHJcbiAgICAvLyBhbGwgaW1hZ2Ugc2V0dGluZ3MgaW5pdGlhbGlzYXRpb24gXHJcbiAgICAkKCcjb3BhY2l0eS1sYWJlbCcpLnRleHQoJ09wYWNpdHk6IDEwMCUnKVxyXG4gICAgJCgnLnNldHRpbmcnKVxyXG4gICAgLmVhY2goZnVuY3Rpb24gKF8sIGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50LmRpc2FibGVkID0gZmFsc2VcclxuICAgIH0pXHJcbiAgICAvLyBNYW5pcHVsYXRpbmcgdGhlIGltYWdlJ3Mgc2l6ZVxyXG4gICAgLmZpbHRlcignI3NpemUnKVxyXG4gICAgLmVhY2goZnVuY3Rpb24gKF8sIHNpemUpIHtcclxuICAgICAgICB2YXIgd2lkdGggID0gdGhpcy53aWR0aFxyXG4gICAgICAgICAgLCBkV2lkdGggPSBkeUltYWdlLndpZHRoXHJcbiAgICAgICAgc2l6ZS5taW4gPSB3aWR0aCAqIDAuMVxyXG4gICAgICAgIHNpemUubWF4ID0gd2lkdGhcclxuICAgICAgICBzaXplLnZhbHVlID0gZFdpZHRoXHJcbiAgICAgICAgY2hhbmdlU2l6ZVBlcmNlbnRhZ2Uod2lkdGgsIGRXaWR0aClcclxuICAgIH0uYmluZCh0aGlzKSlcclxuICAgIC5vbignaW5wdXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgbmV3V2lkdGggPSBldmVudC50YXJnZXQudmFsdWVcclxuICAgICAgICAgICwgb2xkV2lkdGggPSBkeUltYWdlLndpZHRoXHJcbiAgICAgICAgICAsIG9sZEhlaWdodCA9IGR5SW1hZ2UuaGVpZ2h0XHJcblxyXG4gICAgICAgIGR5SW1hZ2UuY2hhbmdlU2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgbmV3V2lkdGgpXHJcbiAgICAgICAgZHlJbWFnZS54IC09IGRpZmYoZHlJbWFnZS53aWR0aCwgb2xkV2lkdGgpICAgLyAyXHJcbiAgICAgICAgZHlJbWFnZS55IC09IGRpZmYoZHlJbWFnZS5oZWlnaHQsIG9sZEhlaWdodCkgLyAyXHJcbiAgICAgICAgZHlJbWFnZS5kcmF3KClcclxuXHJcbiAgICAgICAgY2hhbmdlU2l6ZVBlcmNlbnRhZ2UodGhpcy53aWR0aCwgbmV3V2lkdGgpXHJcbiAgICB9LmJpbmQodGhpcykpXHJcbiAgICAuZW5kKClcclxuICAgIC8vIE1hbmlwdWxhdGluZyB0aGUgaW1hZ2UncyBvcGFjaXR5XHJcbiAgICAuZmlsdGVyKCcjb3BhY2l0eScpXHJcbiAgICAuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICB9KVxyXG4gICAgLm9uKCdpbnB1dCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciBuZXdPcGFjaXR5ID0gZXZlbnQudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgJCgnI29wYWNpdHktbGFiZWwnKS50ZXh0KCdPcGFjaXR5OiAnICsgTWF0aC5mbG9vcihuZXdPcGFjaXR5ICogMTAwKSArICclJylcclxuICAgICAgICBkeUltYWdlLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmdsb2JhbEFscGhhID0gbmV3T3BhY2l0eVxyXG4gICAgICAgIGR5SW1hZ2UuZHJhdygpXHJcbiAgICB9KVxyXG4gICAgLmVuZCgpXHJcbiAgICAvLyBNYW5pcHVsYXRpbmcgdGhlIGltYWdlJ3MgZmlsdGVyXHJcbiAgICAuZmlsdGVyKCcjZmlsdGVyJylcclxuICAgIC5jaGFuZ2UoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyICRjYW52YXMgPSAkKCcjZmlsdGVyLWNhbnZhcycpXHJcbiAgICAgICAgICAsIGNvbnRleHQgPSAkY2FudmFzWzBdLmdldENvbnRleHQoJzJkJylcclxuXHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBldmVudC50YXJnZXQudmFsdWVcclxuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpXHJcbiAgICB9KVxyXG4gICAgLmVuZCgpXHJcbiAgICAvLyBNYW5pcHVsYXRpbmcgdGhlIGZpbHRlciBjbGVhciBidXR0b25cclxuICAgIC5maWx0ZXIoJyNjbGVhcicpXHJcbiAgICAuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSAkKCcjZmlsdGVyLWNhbnZhcycpWzBdLmdldENvbnRleHQoJzJkJylcclxuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KVxyXG4gICAgICAgICQoJycpXHJcbiAgICB9KVxyXG4gICAgLmVuZCgpXHJcbiAgICAvLyBNYW5pcHVsYXRpbmcgdGhlIGltYWdlJ3MgZmlsdGVyJ3Mgb3BhY2l0eVxyXG4gICAgLmZpbHRlcignI2ZpbHRlci1vcGFjaXR5JylcclxuICAgIC5lYWNoKGZ1bmN0aW9uIChfLCBmaWx0ZXIpIHsgXHJcbiAgICAgICAgJCgnI2ZpbHRlci1jYW52YXMnKVswXS5nZXRDb250ZXh0KCcyZCcpLmdsb2JhbEFscGhhID0gZmlsdGVyLnZhbHVlXHJcbiAgICAgICAgY29uc29sZS5sb2coZmlsdGVyLnZhbHVlKTtcclxuICAgICAgICAkKCcjZmlsdGVyLW9wYWNpdHktbGFiZWwnKS5hcHBlbmQoJyAnICsgTWF0aC5mbG9vcihmaWx0ZXIudmFsdWUgKiAxMDApKyclJylcclxuICAgIH0pXHJcbiAgICAuY2hhbmdlKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciAkY2FudmFzID0gJCgnI2ZpbHRlci1jYW52YXMnKVxyXG4gICAgICAgICAgLCBjb250ZXh0ID0gJGNhbnZhc1swXS5nZXRDb250ZXh0KCcyZCcpXHJcbiAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGV2ZW50LnRhcmdldC52YWx1ZVxyXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpXHJcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KVxyXG4gICAgICAgICQoJyNmaWx0ZXItb3BhY2l0eS1sYWJlbCcpLnRleHQoJ0ZpbHRlciBPcGFjaXR5OiAnKyBNYXRoLmZsb29yKGV2ZW50LnRhcmdldC52YWx1ZSAqIDEwMCkrJyUnKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZiAoYSwgYikge1xyXG4gICAgaWYgKGEgPiBiKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYSAtIGIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKC0oYiAtIGEpKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VTaXplUGVyY2VudGFnZSAoaW1hZ2VXaWR0aCwgZHlJbWFnZVdpZHRoKSB7XHJcbiAgICB2YXIgcGVyY2VudGFnZSA9IE1hdGguZmxvb3IoKGR5SW1hZ2VXaWR0aCAvIGltYWdlV2lkdGgpICogMTAwKVxyXG4gICAgJCgnI3NpemUtbGFiZWwnKS50ZXh0KCdzaXplOiAnICsgcGVyY2VudGFnZSArICclJylcclxufSIsImZ1bmN0aW9uIER5SW1hZ2UgKGltYWdlKSB7XHJcblx0dGhpcy5pbWFnZSA9IGltYWdlXHJcblx0dGhpcy5jYW52YXMgPSBudWxsXHJcblx0dGhpcy54ID0gMFxyXG5cdHRoaXMueSA9IDBcclxuXHR0aGlzLnByZXZYID0gMFxyXG5cdHRoaXMucHJldlkgPSAwXHJcblx0dGhpcy53aWR0aCA9IDBcclxuXHR0aGlzLmhlaWdodCA9IDBcclxufVxyXG5cclxuRHlJbWFnZS5wcm90b3R5cGUuY2hhbmdlU2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCB0YXJnZXQpIHtcclxuXHR2YXIgYXNwZWN0UmF0aW8gPSBoZWlnaHQgLyB3aWR0aFxyXG5cdCAgLCBuZXdIZWlnaHQgICA9IE1hdGguY2VpbChhc3BlY3RSYXRpbyAqIHRhcmdldClcclxuXHJcblx0aWYgKG5ld0hlaWdodCA+IHRhcmdldCkge1xyXG5cdFx0dmFyIG5ld0FzcGVjdFJhdGlvID0gd2lkdGggLyBoZWlnaHRcclxuXHRcdCAgLCBuZXdXaWR0aCA9IE1hdGguY2VpbChuZXdBc3BlY3RSYXRpbyAqIHRhcmdldClcclxuXHJcblx0XHR0aGlzLndpZHRoID0gbmV3V2lkdGhcclxuXHRcdHRoaXMuaGVpZ2h0ID0gdGFyZ2V0XHJcblx0XHJcblx0fSBlbHNlIHtcclxuXHRcdHRoaXMud2lkdGggPSB0YXJnZXRcclxuXHRcdHRoaXMuaGVpZ2h0ID0gbmV3SGVpZ2h0XHJcblx0fVxyXG59XHJcblxyXG5EeUltYWdlLnByb3RvdHlwZS5zZXRQb3MgPSBmdW5jdGlvbih4LCB5KSB7XHJcblx0dGhpcy54ID0geFxyXG5cdHRoaXMueSA9IHlcclxufVxyXG5cclxuRHlJbWFnZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuXHR4ID0geCB8fCB0aGlzLnhcclxuXHR5ID0geSB8fCB0aGlzLnlcclxuXHR3aWR0aCA9IHdpZHRoIHx8IHRoaXMud2lkdGhcclxuXHRoZWlnaHQgPSBoZWlnaHQgfHwgdGhpcy5oZWlnaHRcclxuXHJcblx0dmFyICRjYW52YXMgPSAkKHRoaXMuY2FudmFzKVxyXG5cdCAgLCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgJGNhbnZhcy53aWR0aCgpLCAkY2FudmFzLmhlaWdodCgpKVxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgeCwgeSwgd2lkdGgsIGhlaWdodClcclxufTsiLCJcclxuLy8gQFRPRE8gZG9jdW1lbnRhdGlvblxyXG52YXIgc3VibWl0ID0gZnVuY3Rpb24oZm9ybVR5cGUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgZGF0YVxyXG4gICAgICAgICAgLCB1c2VybmFtZSA9ICQoJy51c2VybmFtZScpLnZhbCgpXHJcbiAgICAgICAgICAsIHBhc3N3b3JkID0gJCgnLnBhc3N3b3JkJykudmFsKClcclxuXHJcbiAgICAgICAgaWYgKGZvcm1UeXBlID09ICdsb2dpbicpIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSB7IHVzZXJuYW1lOiB1c2VybmFtZVxyXG4gICAgICAgICAgICAgICAgICAgLCBwYXNzd29yZDogcGFzc3dvcmRcclxuICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmKGZvcm1UeXBlID09ICdyZWdpc3RlcicpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb25maXJtID0gJCgnLmNvbmZpcm0nKS52YWwoKVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpbSAhPSBwYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2Vycm9yJykudmFsKCdwYXNzd29yZHMgZG9uXFwndCBtYXRjaC4nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSB7IHVzZXJuYW1lIDogdXNlcm5hbWVcclxuICAgICAgICAgICAgICAgICAgICwgcGFzc3dvcmQgOiBwYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgICAgLCBjb25maXJtIDogY29uZmlybVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy91c2Vycy8nK2Zvcm1UeXBlLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBib2R5Li4uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIElzIHRoZSBzYW1lIGluIGpRdWVyeSBhcyBoYXZpbmcgYm90aCBldmVudC5wcmV2ZW50RGVmYXVsdCgpIGFuZCBldmVudC5zdG9wUHJvcGdhdGlvbigpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn1cclxuXHJcbiQoJyNsb2dpbicpLnN1Ym1pdChzdWJtaXQoJ2xvZ2luJykpXHJcblxyXG4kKCcjcmVnaXN0ZXInKS5zdWJtaXQoc3VibWl0KCdyZWdpc3RlcicpKSIsbnVsbF0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
