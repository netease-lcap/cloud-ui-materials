import { build } from 'vite';
import { loadConfigFromFile } from 'vite';
import path from 'node:path';
import fs from 'fs-extra';
import http from 'node:http';
import url from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createGenScopedName, lcapPlugin } from '@lcap/builder';

const rootPath = process.cwd();
let httpServer = null;

// 工具函数
const camelCase = (str) => str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '').replace(/^[A-Z]/, c => c.toLowerCase());
const upperFirst = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

// 获取端口号
function getPort() {
  if (process.env.PORT) return process.env.PORT;
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('-p=') || arg.startsWith('--port=')) return arg.split('=')[1];
    if ((arg === '-p' || arg === '--port') && i + 1 < args.length) return args[i + 1];
  }
  return '5501';
}

// 启动静态文件服务器
function startStaticServer(port) {
  if (httpServer) {
    console.log('🔄 Server already running on port', port);
    return;
  }

  const mimeTypes = {
    '.js': 'application/javascript',
    '.map': 'application/json',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json',
  };

  httpServer = http.createServer(async (req, res) => {
    try {
      const parsedUrl = url.parse(req.url || '/', true);
      let filePath = parsedUrl.pathname || '/';
      
      // 移除开头的斜杠
      if (filePath.startsWith('/')) {
        filePath = filePath.slice(1);
      }
      
      const fullPath = path.join(rootPath, filePath);
      
      // 安全检查
      if (!fullPath.startsWith(rootPath)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
      }

      if (await fs.pathExists(fullPath)) {
        const stat = await fs.stat(fullPath);
        if (stat.isFile()) {
          const content = await fs.readFile(fullPath);
          const ext = path.extname(fullPath).toLowerCase();
          
          res.writeHead(200, {
            'Content-Type': mimeTypes[ext] || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*',
          });
          res.end(content);
          return;
        }
      }
      
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error: ' + error.message);
    }
  });

  httpServer.listen(port, '127.0.0.1', () => {
    console.log(`✅ Dev server running at http://127.0.0.1:${port}`);
    console.log(`📂 Serving files from: ${rootPath}`);
  });

  httpServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${port} is already in use. Please use a different port.`);
    } else {
      console.error('❌ Server error:', error.message);
    }
  });
}

// 更新 sourcemap URL
async function updateSourceMapUrl(port) {
  const jsFile = path.join(rootPath, 'dist-theme/ide/index.js');
  if (!(await fs.pathExists(jsFile))) return;
  
  const sourceMapUrl = `//# sourceMappingURL=http://127.0.0.1:${port}/lcap_process_components_vue3_h5/dist-theme/ide/index.js.map`;
  let content = await fs.readFile(jsFile, 'utf-8');
  content = content.replace(/\/\/# sourceMappingURL=.*$/gm, sourceMapUrl);
  if (!content.includes('sourceMappingURL')) content += '\n' + sourceMapUrl;
  await fs.writeFile(jsFile, content, 'utf-8');
  console.log('✅ Sourcemap URL updated:', sourceMapUrl);
}

async function watchIde() {
  const pkg = await fs.readJSON(path.join(rootPath, 'package.json'));
  const port = parseInt(getPort(), 10);
  let isFirstBuild = true;

  // 基础构建配置
  let buildConfig = {
    define: { 'process.env': { NODE_ENV: 'production' } },
    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome56', 'safari14'],
      sourcemap: true,
      lib: {
        entry: 'ide/index',
        formats: ['umd'],
        name: `$ideMaterial${upperFirst(camelCase(pkg.name))}`,
        fileName: (format, entryName) => 
          format === 'es' ? `${entryName}.mjs` : format === 'cjs' ? `${entryName}.cjs` : `${entryName}.js`,
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => assetInfo.name === 'style.css' ? 'index.css' : '[name][extname]',
          interop: 'compat',
        },
      },
      outDir: 'dist-theme/ide',
      watch: {},
    },
    plugins: [
      vue(),
      vueJsx(),
      lcapPlugin({ type: 'extension', framework: 'vue3' }),
      {
        name: 'update-sourcemap',
        async closeBundle() {
          await updateSourceMapUrl(port);
          // 第一次构建完成后启动静态文件服务器
          if (isFirstBuild) {
            isFirstBuild = false;
            startStaticServer(port);
          }
        },
      },
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue', '.mjs', '.cjs', '.json'],
      alias: {
        '@': path.resolve(rootPath, './src'),
        '@lcap-ui': path.resolve(rootPath, './.lcap/lcap-ui/package'),
      },
    },
    css: {
      modules: { generateScopedName: createGenScopedName(pkg.name, './src') },
    },
  };

  // 尝试加载并合并 vite.config.mjs
  try {
    const loadResult = await loadConfigFromFile({ command: 'build', mode: 'staging' }, 'vite.config.mjs', rootPath);
    if (loadResult?.config) {
      buildConfig = {
        ...loadResult.config,
        ...buildConfig,
        build: {
          ...loadResult.config.build,
          ...buildConfig.build,
          sourcemap: true,
          lib: { ...loadResult.config.build?.lib, ...buildConfig.build.lib, entry: 'ide/index' },
          outDir: 'dist-theme/ide',
          watch: {},
        },
      };
    }
  } catch (error) {
    console.warn('⚠️  Failed to load vite.config.mjs:', error.message);
  }

  // 移除 external 配置（IDE 构建需要打包所有依赖）
  if (buildConfig.build?.rollupOptions?.external) {
    delete buildConfig.build.rollupOptions.external;
  }

  console.log('🚀 Starting IDE watch mode...');
  console.log(`📁 Watching: ide/`);
  console.log(`📦 Output: dist-theme/ide/`);
  console.log(`🌐 Dev server will start on port ${port} after first build`);

  // 启动构建（watch 模式）
  await build({
    configFile: false,
    envFile: false,
    ...buildConfig,
    mode: 'staging',
  });
  
  // 优雅关闭
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    if (httpServer) {
      httpServer.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
}

watchIde().catch((error) => {
  console.error('❌ Failed:', error);
  process.exit(1);
});

