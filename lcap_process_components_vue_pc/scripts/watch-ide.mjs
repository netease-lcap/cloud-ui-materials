import { build } from 'vite';
import { loadConfigFromFile } from 'vite';
import path from 'node:path';
import fs from 'fs-extra';
import { createVuePlugin as vue2 } from '@lcap/vite-plugin-vue2';
import { createGenScopedName, lcapPlugin } from '@lcap/builder';

const rootPath = process.cwd();

// 简单的工具函数，替代 lodash
function camelCase(str) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}

function upperFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 替换 sourcemap URL
async function replaceSourceMapUrl(outputDir) {
  const jsFile = path.join(rootPath, outputDir, 'index.js');
  const sourceMapUrl = '//# sourceMappingURL=http://127.0.0.1:5501/lcap_process_components_vue_pc/dist-theme/ide/index.js.map';

  try {
    if (await fs.pathExists(jsFile)) {
      let content = await fs.readFile(jsFile, 'utf-8');
      // 替换所有可能的 sourcemap URL 格式
      content = content.replace(
        /\/\/# sourceMappingURL=.*$/gm,
        sourceMapUrl
      );
      // 如果没有找到 sourcemap URL，在文件末尾添加
      if (!content.includes('sourceMappingURL')) {
        content += '\n' + sourceMapUrl;
      }
      await fs.writeFile(jsFile, content, 'utf-8');
      console.log('✅ Sourcemap URL replaced:', sourceMapUrl);
    }
  } catch (error) {
    console.warn('⚠️  Failed to replace sourcemap URL:', error.message);
  }
}

async function watchIde() {
  const pkg = await fs.readJSON(path.join(rootPath, 'package.json'));

  let buildConfig = {
    define: {
      'process.env': {
        NODE_ENV: 'production',
      },
    },
    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome56', 'safari14'],
      sourcemap: true, // 启用 sourcemap
      lib: {
        entry: 'ide/index',
        formats: ['umd'],
        name: `$ideMaterial${upperFirst(camelCase(pkg.name))}`,
        fileName: (format, entryName) => {
          switch (format) {
            case 'es':
              return `${entryName}.mjs`;
            case 'cjs':
              return `${entryName}.cjs`;
            default:
              return `${entryName}.js`;
          }
        },
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return 'index.css';
            }
            return '[name][extname]';
          },
          interop: 'compat',
        },
      },
      outDir: 'dist-theme/ide',
      watch: {}, // 启用 watch 模式
    },
    plugins: [
      vue2({
        jsx: true,
        jsxInclude: [
          /.(jsx|tsx)$/,
          /\.lcap\/.*(js|ts)$/,
        ],
        jsxOptions: {
          vModel: true,
          functional: false,
          injectH: true,
          vOn: true,
          compositionAPI: false,
        },
      }),
      lcapPlugin({
        type: 'extension',
        framework: 'vue2',
      }),
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue', '.mjs', '.cjs', '.json'],
      alias: {
        '@': path.resolve(rootPath, './src'),
        '@lcap-ui': path.resolve(rootPath, './.lcap/lcap-ui/package'),
      },
    },
    css: {
      modules: {
        generateScopedName: createGenScopedName(pkg.name, './src'),
      },
    },
  };

  // 尝试加载 vite.config.mjs 并合并配置（但不会覆盖 sourcemap 设置）
  try {
    const loadResult = await loadConfigFromFile(
      { command: 'build', mode: 'staging' },
      'vite.config.mjs',
      rootPath
    );
    if (loadResult && loadResult.config) {
      // 合并配置，但确保 sourcemap 保持为 true
      buildConfig = {
        ...loadResult.config,
        ...buildConfig,
        build: {
          ...loadResult.config.build,
          ...buildConfig.build,
          sourcemap: true, // 强制启用 sourcemap
          lib: {
            ...loadResult.config.build?.lib,
            ...buildConfig.build.lib,
            entry: 'ide/index', // 确保 entry 指向 ide 文件夹
          },
          outDir: 'dist-theme/ide', // 确保输出目录正确
          watch: {}, // 确保 watch 模式启用
        },
      };
    }
  } catch (error) {
    // 如果加载配置文件失败，使用默认配置
    console.warn('Failed to load vite.config.mjs, using default config:', error.message);
  }

  // 确保不排除依赖（IDE 构建需要打包所有依赖）
  if (buildConfig.build?.rollupOptions?.external) {
    delete buildConfig.build.rollupOptions.external;
  }

  // 添加自定义插件，在构建完成后替换 sourcemap URL
  const replaceSourceMapPlugin = {
    name: 'replace-sourcemap-url',
    async closeBundle() {
      await replaceSourceMapUrl('dist-theme/ide');
    },
  };

  // 确保插件数组存在并添加我们的插件
  if (!buildConfig.plugins) {
    buildConfig.plugins = [];
  }
  // 检查是否已经添加过，避免重复添加
  if (!buildConfig.plugins.find(p => p.name === 'replace-sourcemap-url')) {
    buildConfig.plugins.push(replaceSourceMapPlugin);
  }

  console.log('🚀 Starting IDE watch mode with sourcemap enabled...');
  console.log('📁 Watching: ide/');
  console.log('📦 Output: dist-theme/ide/');

  await build({
    configFile: false,
    envFile: false,
    ...buildConfig,
    mode: 'staging',
  });
}

watchIde().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
