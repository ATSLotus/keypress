import typescript from "rollup-plugin-typescript2";
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const PROJECT_NAME = "keypress"

const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: `dist/${PROJECT_NAME}.js`, 
                format: 'iife',             // iife 用于网页 script
                name: `${PROJECT_NAME}`
            },
            {
                file: 'dist/index.js',
                format: 'esm',              // es module 形式的包, 用来import 导入, 可以tree shaking
            }, 
            {
                file: 'dist/index.cjs.js',
                format: 'cjs',              // commonjs 形式的包, require 导入 
            }
        ],
        plugins: [
            typescript({
                tsconfig: 'tsconfig.json',
                useTsconfigDeclarationDir: true
            }),
            resolve(),
            commonjs(),
            babel({
                "presets": ['@babel/preset-env'],
                exclude: '**/node_modules/**', // 只编译我们的源代码
            }),
        ]
    }
]
export default config;