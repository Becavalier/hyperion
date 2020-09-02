---
title: WebAssembly Weekly 集合整理（2020 / 08）
intro: 整理一下 WebAssembly Weekly 上从 2017 年至 2020 年 8 月这段期间出现的，关于 Wasm 的一些技术实践或者技术产品。
comments: true
date: 2020-08-25 10:21:49
tags:
- WebAssembly
---

整理一下 WebAssembly Weekly 上从 2017 年至 2020 年 8 月这段期间出现的，关于 Wasm 的一些技术实践或者技术产品。

#### 新兴语言（Emerging Language）

* **[Walt](https://github.com/ballercat/walt)** - 用于 WAT 的类 JavaScript 语法（比 WAT 再抽象一层）；

```text
let counter: i32 = 0;

export function decrement(): i32 {
  counter -= 1;
  return counter;
}

export function increment(): i32 {
  counter += 1;
  return counter;
}
```

* **[Astro](https://github.com/astrolang/astro)** - 一个用于 Wasm 的多范式语言；
* **[Grain](https://github.com/grain-lang/grain)** - 一个可以被编译到 Wasm 的语言，内部借助了 Binaryen；
* **[Lys](https://github.com/lys-lang/lys)** - 一个可以被编译到 Wasm 的语言；

#### 多媒体处理（Multimedia Processing）

* **[GlitchBitch](https://github.com/msafronov/glitchbitch)** - 用于在图片上制作“毛刺”效果的 JavaScript 插件；
* **[Color Palette](https://github.com/novoselrok/color-palette-wasm)** - 基于 K-Means 实现的图像调色板（从图像上选取主题色）应用；
* **[WebAssembly ZXing](https://github.com/yushulx/zxing-cpp-emscripten)** - 基于 Wasm 的 Zxing Web 实现（用于二维码扫描和识别）；
* **[WASM Fractal Generator](https://github.com/jsdw/wasm-fractal)** - 基于 Wasm 的分形发生器；
* **[Squoosh](https://squoosh.app/)** - 在线图片处理工具；
* **[draw-app](https://github.com/lynnagara/draw-app)** - 简易的在线画图应用；
* **[Photon](https://github.com/silvia-odwyer/photon)** - 可用于 Web 应用的在线图像处理库；
* **[ogv.js](https://github.com/brion/ogv.js)** - JavaScript 媒体播放器（Ogg / Vorbis / Theora / Opus / WebM）；
* **[WXInlinePlayer](https://github.com/qiaozi-tech/WXInlinePlayer)** - 高效的 FLV 流媒体解码器（H.264/H.265）；


#### 仿真器（Emulator）

* **[SaltyNES](https://github.com/workhorsy/SaltyNES)** - 一个 NES 仿真器；
* **[Pinky](https://github.com/koute/pinky/tree/master/pinky-web)** - 基于 Rust 构建的 NES 仿真器；
* **[wasmboy](https://github.com/torch2424/wasmBoy)** - 基于 AssemblyScript 编写的 Game Boy 仿真器；
* **[TweetX86](https://github.com/AntoineViau/tweetx86)** - 基于 Nasm 等构建的 X86 汇编仿真器；
* **[gomeboycolor](https://github.com/djhworld/gomeboycolor-wasm)** - Game Boy Color 仿真器；
* **[chip8-wasm](https://github.com/shlomnissan/chip8-wasm)** - Chip-8 仿真器；
* **[Ruffle](https://github.com/ruffle-rs/ruffle)** - Flash Player 仿真器；
* **[nes-rust](https://github.com/takahirox/nes-rust)** - NES 仿真器；

#### Web 前端框架（Web Frontend）

* **[Yew](https://github.com/yewstack/yew)** - 一个可以使用 Rust 构建 Web 前端应用的框架；
* **[Seed](https://github.com/seed-rs/seed)** - 一个可以使用 Rust 构建 Web 前端应用的框架；
* **[Vugu](https://github.com/vugu/vugu)** - 一个可以使用 Go 构建 Web 应用的 UI 框架；
* **[Vecty](https://github.com/hexops/vecty)** - 一个可以使用 Go 构建响应式、动态的 Web 框架；
* **[Perspective](https://github.com/finos/perspective/)** - 基于 Wasm 的实时数据可视化组件；
* **[QT](https://www.qt.io/blog/2018/05/22/qt-for-webassembly)** - Wasm 版 QT；
* **[Frogui](https://www.lesarde.com/)** - 基于 C# 和 .NET 实现的 UI 框架；
* **[Prism](https://github.com/prism-rb/prism)** - 使用 Ruby 构建 Web 应用的前端框架；
* **[asm-dom](https://github.com/mbasso/asm-dom)** - 基于 C++ 构建的 V-DOM，可用于构建 Web 应用；
* **[go-vdom-wasm](https://github.com/mfrachet/go-vdom-wasm)** - 基于 Go 构建的 V-DOM，可用于构建 Web 应用；


#### 库（Library）

* **[GLMW](https://maierfelix.github.io/glmw/)** - 一个基于 Wasm 的矩阵和向量生成库；
* **[ONNX.js](https://github.com/Microsoft/onnxjs)** - 可以在 JavaScript 中运行 ONNX 模型的库；
* **[WASM-PDF](https://github.com/jussiniinikoski/wasm-pdf)** - 可以使用 Wasm 和 JavaScript 生成 PDF 文件的库；
* **[webm-wasm](https://github.com/GoogleChromeLabs/webm-wasm)** - 可以使用 Wasm 和 JavaScript 生成 webm 视频的库；
* **[argon2-browser](https://github.com/antelle/argon2-browser)** - Wasm 移植版的密码哈希函数库 Argon2；
* **[tensorflow.js](https://blog.tensorflow.org/2020/03/introducing-webassembly-backend-for-tensorflow-js.html)** - Tensorflow H5 版本；


#### 物联网（IOT）

* **[Nebulet](https://github.com/nebulet/nebulet)** - 一个可以在 Ring0 中运行的，基于 Wasm 实现的“用户模式”微内核；
* **[wasmachine](https://github.com/piranna/wasmachine)** - 基于 FPGA 实现的 Wasm 规范；

#### 编译器（Compiler）

* **[WasmFiddle](https://wasdk.github.io/WasmFiddle/)** - 支持 C/C++ 的 Wasm 在线编译器；
* **[WebAssembly Studio](https://webassembly.studio/)** - 功能齐全的 Wasm 在线开发 IDE；
* **[WasmExplorer](https://mbebenita.github.io/WasmExplorer/)** - 支持 C/C++ 的 Wasm 在线编译器，可生成 X86 汇编代码；
* **[wat2wasm](https://cdn.rawgit.com/WebAssembly/wabt/fb986fbd/demo/wat2wasm/)** - 一个 WAT 到 Wasm 在线编译器；
* **[wasm2wat](https://cdn.rawgit.com/WebAssembly/wabt/fb986fbd/demo/wasm2wat/)** - 一个 Wasm 到 WAT 编译器（需从本地上传 Wasm 二进制模块文件）；
* **[Cheerp](https://www.leaningtech.com/pages/cheerp.html)** - Wasm 编译器；
* **[NectarJS](https://github.com/NectarJS/nectarjs)** - JavaScript Native 编译器，可以将 JavaScript 编译为 Native Code；
* **[brainfuck2wasm](https://github.com/verdie-g/brainfuck2wasm)** - 一个 BrainFuck 到 Wasm 的编译器；
* **[JWebAssembly](https://github.com/i-net-software/JWebAssembly)** - 一个 Java 字节码到 Wasm 的编译器；
* **[Bytecoder](https://github.com/mirkosertic/Bytecoder)** - 可于将 Java 字节码解释并转换为如 Wasm 等其他语言的编译器；
* **[WAForth](https://github.com/remko/waforth)** - 用于 Wasm 的 Forth 解释器和编译器；
* **[wasmdec](https://github.com/wwwg/wasmdec)** - 一个 Wasm 到 C 编译器；
* **[TINYGO](https://tinygo.org/)** - 一个 Go 到 Wasm 编译器；
* **[wag](https://github.com/tsavola/wag)** - 一个使用 Go 实现的 Wasm 编译器（字节码 -> 机器码）；
* **[Emscripten](https://emscripten.org/)** - 人尽皆知的强大 Wasm 编译工具链；
* **[ilwasm](https://github.com/kg/ilwasm)** - 一个 CIL 到 Wasm 编译器；
* **[Asterius](https://github.com/tweag/asterius)** - 一个 Haskell 到 Wasm 编译器；
* **[AssemblyScript](https://github.com/AssemblyScript/assemblyscript)** - 一个 TypeScript 到 Wasm 编译器；
* **[Asmble](https://github.com/cretz/asmble)** - 一个 Wasm 到 JVM 字节码编译器；


#### 虚拟机/运行时（Virtual Machine / Runtime）

* **[WAVM](https://github.com/WAVM/WAVM)** - Wasm 虚拟机；
* **[Life](https://github.com/perlin-network/life)** - Go 语言编写的安全、快速的 Wasm 虚拟机。主要用于分布式应用程序；
* **[Wasmjit](https://github.com/kenny-ngo/wasmjit)** - 用于 Linux 的内核模式 Wasm 运行时；
* **[Wasmer](https://wasmer.io/)** - 带有包管理能力的 Wasm 虚拟机；
* **[Lucet](https://github.com/bytecodealliance/lucet)** - 支持 WASI 的 Wasm 编译器/虚拟机；
* **[WAMR](https://github.com/bytecodealliance/wasm-micro-runtime)** - Wasm 轻量级编译器/虚拟机；
* **[Wasm3](https://github.com/wasm3/wasm3)** - 基于 C 编写的高性能 Wasm 解释器；
* **[GraalWasm](https://github.com/oracle/graal/tree/master/wasm)** - GraalVM 系列中用于 Wasm 的引擎；
* **[Faasm](https://github.com/lsds/Faasm)** - 一个无状态的 Serverless Wasm 运行时;
* **[wasmtime](https://github.com/bytecodealliance/wasmtime)** - 使用 Cranelift 构建的独立的 Wasm 运行时引擎;
* **[wac](https://github.com/kanaka/wac)** -  基于 C 编写的高性能 Wasm 解释器；
* **[warpy](https://github.com/kanaka/warpy)** -  基于 Python 编写的 Wasm 解释器；
* **[pywasm](https://github.com/mohanson/pywasm)** -  基于 Python 编写的 Wasm 解释器；
* **[SSVM](https://github.com/second-state/SSVM)** -  专注于 AI、区块链应用的 Wasm 虚拟机；


#### 云（Cloud）

* **[waSCC Host](https://github.com/wascc/wascc-host)** - Wasm 安全能力连接器；
* **[Krustlet](https://github.com/deislabs/krustlet)** - 支持 Wasm 的 Kubernetes Kubelet；
* **[embly](https://github.com/embly/embly)** - 一个基于 Wasm 的 Serverless Web 应用框架；
* **[olin](https://github.com/Xe/olin)** - Wasm 云代码分析工具（跟踪诸如使用了多少指令，进行了多少次系统调用以及使用了多少内存等情况）；


#### 游戏引擎（Game Engine）

* **[Defold](https://forum.defold.com/t/defold-1-2-141-has-been-released/33996)** - 一个用于 Web 和移动端的游戏开发引擎；
* **[d3wasm](https://github.com/gabrielcuvillier/d3wasm)** - Tech4 / Doom3 基于 Wasm 的移植版；
* **[ammo.js](https://github.com/kripken/ammo.js)** - Bullet 物理引擎的 Wasm 移植版；
* **[Oryol](https://github.com/floooh/oryol)** - 一个小型可移植的 C++ 3D 开发框架；
* **[ammo.js](https://github.com/kripken/ammo.js)** - Bullet 物理引擎的 Wasm 移植版；
* **[Unity](https://blogs.unity3d.com/2018/08/15/webassembly-is-here/)** - Unity；
* **[Unreal Engine](https://docs.unrealengine.com/en-US/Platforms/HTML5/GettingStarted/index.html)** - Unreal Engine

#### 工具（Tool）

* **[Wasabi](https://github.com/danleh/wasabi)** - 一个用于 Wasm 的动态分析框架；
* **[inNative](https://github.com/innative-sdk/innative)** - 一个用于 Wasm 的 Native 嵌入层；
* **[Wasienv](https://github.com/wasienv/wasienv)** - 用于 C/C++ 的 WASI 开发工具；
* **[WABT](https://github.com/WebAssembly/wabt)** - Wasm 二进制工具集；
* **[Binaryen](https://github.com/WebAssembly/binaryen)** - Wasm 编译器基础设施和工具链；

#### 教学（Education）

* **[WebAssembly Code Explorer](https://wasdk.github.io/wasmcodeexplorer/)** - 以直观的方式探索 Wasm 二进制模块的字节组成方式；


#### 性能测试（Benchmark）

* **[wasm-raytracer](https://github.com/mtharrison/wasm-raytracer)** - 自定义用于 Wasm 的光线追踪器测试集；
* **[WASM-vs-JS-Pitch-detector](https://github.com/bojan88/WASM-vs-JS-Pitch-detector)** - 基于 McLeod 音高检测算法的测试；
* **[PSPDFKit](https://pspdfkit.com/blog/2018/a-real-world-webassembly-benchmark)** - 基于 PSPDFKit 的 Wasm 性能测试；
* **[WebAssembly-benchmark](https://github.com/takahirox/WebAssembly-benchmark)** - 简单的 JavaScript 与 Wasm 性能对比测试集；


#### 其他（Others）

* **[d3-wasm-force](https://github.com/ColinEberhardt/d3-wasm-force)** - 基于 Wasm 重写的 d3-force；
* **[ewasm](https://github.com/ewasm/design)** - Wasm 版“以太坊”；
* **[vim.wasm](https://github.com/rhysd/vim.wasm)** - Wasm 版 VIM 编辑器；
* **[redshirt](https://github.com/tomaka/redshirt)** - 基于 Wasm 的操作系统；
* **[Stork](https://github.com/jameslittle230/stork)** - 用于静态页面的内容搜索工具；
* **[tinysearch](https://github.com/tinysearch/tinysearch)** - 用于静态页面全文本搜索引擎；
