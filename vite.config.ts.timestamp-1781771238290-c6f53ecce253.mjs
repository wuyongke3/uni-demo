// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import Uni from "file:///C:/code/uni-demo/node_modules/@uni-helper/plugin-uni/src/index.js";
import Components from "file:///C:/code/uni-demo/node_modules/@uni-helper/vite-plugin-uni-components/dist/index.mjs";
import { ZPagingResolver } from "file:///C:/code/uni-demo/node_modules/@uni-helper/vite-plugin-uni-components/dist/resolvers.mjs";
import UniLayouts from "file:///C:/code/uni-demo/node_modules/@uni-helper/vite-plugin-uni-layouts/dist/index.mjs";
import UniManifest from "file:///C:/code/uni-demo/node_modules/@uni-helper/vite-plugin-uni-manifest/dist/index.mjs";
import UniPages from "file:///C:/code/uni-demo/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import UniPlatform from "file:///C:/code/uni-demo/node_modules/@uni-helper/vite-plugin-uni-platform/dist/index.mjs";
import { UniEchartsResolver } from "file:///C:/code/uni-demo/node_modules/uni-echarts/dist-resolver/index.mjs";
import { UniEcharts } from "file:///C:/code/uni-demo/node_modules/uni-echarts/dist-vite/index.mjs";
import UnoCSS from "file:///C:/code/uni-demo/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///C:/code/uni-demo/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/code/uni-demo/vite.config.ts";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  plugins: [
    // https://uni-helper.js.org/vite-plugin-uni-components
    Components({
      dts: true,
      resolvers: [UniEchartsResolver(), ZPagingResolver()]
    }),
    // https://uni-helper.js.org/vite-plugin-uni-pages
    UniPages(),
    // https://uni-helper.js.org/vite-plugin-uni-layouts
    UniLayouts(),
    // https://uni-helper.js.org/vite-plugin-uni-manifest
    UniManifest(),
    // https://uni-helper.js.org/vite-plugin-uni-platform
    UniPlatform(),
    // https://uni-echarts.xiaohe.ink
    UniEcharts(),
    // https://uni-helper.js.org/plugin-uni
    Uni(),
    UnoCSS()
  ],
  build: {
    target: "es6",
    cssTarget: "chrome61"
  },
  optimizeDeps: {
    exclude: [
      "vue-demi",
      "uni-echarts"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxjb2RlXFxcXHVuaS1kZW1vXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxjb2RlXFxcXHVuaS1kZW1vXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9jb2RlL3VuaS1kZW1vL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgVW5pIGZyb20gJ0B1bmktaGVscGVyL3BsdWdpbi11bmknXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1jb21wb25lbnRzJ1xyXG5pbXBvcnQgeyBaUGFnaW5nUmVzb2x2ZXIgfSBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCBVbmlMYXlvdXRzIGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1sYXlvdXRzJ1xyXG5pbXBvcnQgVW5pTWFuaWZlc3QgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLW1hbmlmZXN0J1xyXG5pbXBvcnQgVW5pUGFnZXMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBhZ2VzJ1xyXG5pbXBvcnQgVW5pUGxhdGZvcm0gZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBsYXRmb3JtJ1xyXG5pbXBvcnQgeyBVbmlFY2hhcnRzUmVzb2x2ZXIgfSBmcm9tICd1bmktZWNoYXJ0cy9yZXNvbHZlcidcclxuaW1wb3J0IHsgVW5pRWNoYXJ0cyB9IGZyb20gJ3VuaS1lY2hhcnRzL3ZpdGUnXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIC8vIGh0dHBzOi8vdW5pLWhlbHBlci5qcy5vcmcvdml0ZS1wbHVnaW4tdW5pLWNvbXBvbmVudHNcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICBkdHM6IHRydWUsXHJcbiAgICAgIHJlc29sdmVyczogW1VuaUVjaGFydHNSZXNvbHZlcigpLCBaUGFnaW5nUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICAgIC8vIGh0dHBzOi8vdW5pLWhlbHBlci5qcy5vcmcvdml0ZS1wbHVnaW4tdW5pLXBhZ2VzXHJcbiAgICBVbmlQYWdlcygpLFxyXG4gICAgLy8gaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktbGF5b3V0c1xyXG4gICAgVW5pTGF5b3V0cygpLFxyXG4gICAgLy8gaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktbWFuaWZlc3RcclxuICAgIFVuaU1hbmlmZXN0KCksXHJcbiAgICAvLyBodHRwczovL3VuaS1oZWxwZXIuanMub3JnL3ZpdGUtcGx1Z2luLXVuaS1wbGF0Zm9ybVxyXG4gICAgVW5pUGxhdGZvcm0oKSxcclxuICAgIC8vIGh0dHBzOi8vdW5pLWVjaGFydHMueGlhb2hlLmlua1xyXG4gICAgVW5pRWNoYXJ0cygpLFxyXG4gICAgLy8gaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy9wbHVnaW4tdW5pXHJcbiAgICBVbmkoKSxcclxuICAgIFVub0NTUygpLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHRhcmdldDogJ2VzNicsXHJcbiAgICBjc3NUYXJnZXQ6ICdjaHJvbWU2MScsXHJcbiAgfSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgJ3Z1ZS1kZW1pJyxcclxuICAgICAgJ3VuaS1lY2hhcnRzJyxcclxuICAgIF0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3TyxTQUFTLGVBQWUsV0FBVztBQUUzUSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsMEJBQTBCO0FBQ25DLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sWUFBWTtBQUNuQixTQUFTLG9CQUFvQjtBQVpnSCxJQUFNLDJDQUEyQztBQWM5TCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFUCxXQUFXO0FBQUEsTUFDVCxLQUFLO0FBQUEsTUFDTCxXQUFXLENBQUMsbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUM7QUFBQSxJQUNyRCxDQUFDO0FBQUE7QUFBQSxJQUVELFNBQVM7QUFBQTtBQUFBLElBRVQsV0FBVztBQUFBO0FBQUEsSUFFWCxZQUFZO0FBQUE7QUFBQSxJQUVaLFlBQVk7QUFBQTtBQUFBLElBRVosV0FBVztBQUFBO0FBQUEsSUFFWCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
