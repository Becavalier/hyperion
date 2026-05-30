UPDATE questions
SET content =
    regexp_replace(content, '\n---\n\n### 完整实现代码.*', '', 's')
    || $append$

---

### 完整实现代码

```js
// 1. JSX ->
// 2. createElement(type, props, ...children) 结构 ->
// 3. 构建 { type, props: { ..., children: ... } }，children 整合进 props ->
// 4. 构建 fiber，初始化 wipRoot；
// 5. workLoop：
//   - render -> performUnitOfWork -> reconcileChildren
//   - commit -> commitRoot


// Step 1 - JSX 转换
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === 'object' ? child : createTextElement(child))
        }
    }
}

function createTextElement(text) {
    return { type: 'TEXT_ELEMENT', props: { nodeValue: text, children: [] } }
}

// Step 2 - Fiber 结构（双缓存核心）
//
// fiber = {
//     type,       组件类型
//     props,      属性
//     dom,        真实 DOM 节点
//     parent,     父 fiber
//     child,      子 fiber
//     sibling,    兄弟 fiber
//     alternate,  对应另一棵树的 fiber
//     effectTag,  'PLACEMENT' | 'UPDATE' | 'DELETION'
//     hooks,      hooks 状态数组
// }

let currentRoot = null      // 当前屏幕显示的 fiber 树；
let wipRoot = null          // 正在构建的 wip 树；
let nextUnitOfWork = null   // 指向下一个要处理的 fiber 节点；
let deletions = []          // 收集要删除的旧 fiber；

// Step 3 - render 入口
function render(element, container) {
    wipRoot = {
        dom: container,
        props: { children: [element] },
        alternate: currentRoot,   // 指向旧树，供 diff 使用；
    }
    deletions = []
    nextUnitOfWork = wipRoot
}

// Step 4 - Work Loop（利用浏览器空闲时间，可中断）
function workLoop(deadline) {
    let shouldYield = false

    // render 阶段（内存中操作）；
    // - 遍历 fiber 树，做 diff 对比；
    // - 计算哪些节点需要增删改；
    // - 在内存中标记变更（effectTag），不碰真实 DOM；
    // - 没有副作用，可中断。
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }

    // commit 阶段（操作真实 DOM）；
    // - 根据上一阶段标记的 effectTag 一次性操作真实 DOM；
    // - 执行副作用（useEffect、useLayoutEffect、ref 赋值等）；
    // - 必须同步完成，否则用户会看到 DOM 更新到一半的中间状态。
    if (!nextUnitOfWork && wipRoot) {  // 等所有 fiber 节点处理完；
        commitRoot()
    }
    requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)


/**
<div>
    <A />
        <D />
        <E />
    <B />
    <C />
</div>

1. performUnitOfWork(div)
        -> reconcileChildren 横向遍历 [A, B, C]，建好链表
        -> 返回 div.child = A
2. performUnitOfWork(A)
        -> reconcileChildren 横向遍历 [D, E]，建好链表
        -> 返回 A.child = D
3. performUnitOfWork(D)
        -> reconcileChildren 横向遍历 D 的子节点（无）
        -> D 没 child，返回 D.sibling = E
4. performUnitOfWork(E)
        -> ... 返回 B
5. performUnitOfWork(B)
        -> ...
*/


// Step 5 - 深度优先遍历 fiber 节点；
function performUnitOfWork(fiber) {
    if (fiber.type instanceof Function) {
        updateFunctionComponent(fiber)   // 执行函数组件，收集 hooks；
    } else {
        updateHostComponent(fiber)    // 创建真实 DOM，对于字符串比如 'div'、'p'；
    }
    if (fiber.child) return fiber.child
    let next = fiber
    while (next) {
        if (next.sibling) return next.sibling
        next = next.parent
    }
    return null
}

function updateHostComponent(fiber) {
    if (!fiber.dom) fiber.dom = createDom(fiber)  // 创建真实 DOM 节点；
    reconcileChildren(fiber, fiber.props.children)  // diff 子节点；
}

// Step 6 - Hooks
let wipFiber = null
let hookIndex = null

function updateFunctionComponent(fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]  // 执行函数式组件；
    reconcileChildren(fiber, children)
}

function useState(initial) {
    const oldHook = wipFiber.alternate?.hooks?.[hookIndex]
    const hook = { state: oldHook ? oldHook.state : initial, queue: [] }

    // 执行上次积累的 actions；
    ;(oldHook ? oldHook.queue : []).forEach(action => {
        hook.state = typeof action === 'function' ? action(hook.state) : action
    })

    const setState = action => {
        hook.queue.push(action)
        wipRoot = { dom: currentRoot.dom, props: currentRoot.props, alternate: currentRoot }  // 触发重渲染；
        nextUnitOfWork = wipRoot
        deletions = []
    }
    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state, setState]
}

function useEffect(effect, deps) {
    const oldHook = wipFiber.alternate?.hooks?.[hookIndex]
    // 第一次渲染？没有传依赖？依赖发生变化？
    const hasChanged = !oldHook || !deps || deps.some((dep, i) => !Object.is(dep, oldHook.deps?.[i]))
    const hook = { deps, cleanup: oldHook?.cleanup }
    if (hasChanged) hook.effect = effect  // commit 阶段需要执行的 effect；
    wipFiber.hooks.push(hook)
    hookIndex++
}

// Step 7 - Reconciliation (diff)
function reconcileChildren(wipFiber, elements) {  // 处理当前节点的直接子节点；
    let index = 0
    let oldFiber = wipFiber.alternate?.child
    let prevSibling = null

    while (index < elements.length || oldFiber != null) {
        const element = elements[index]
        let newFiber = null
        const sameType = oldFiber && element && element.type === oldFiber.type
        if (sameType) {
            newFiber = {
                type: oldFiber.type, props: element.props,
                dom: oldFiber.dom, parent: wipFiber,
                alternate: oldFiber, effectTag: 'UPDATE',
            }
        }
        if (element && !sameType) {
            newFiber = {
                type: element.type, props: element.props,
                dom: null, parent: wipFiber,
                alternate: null, effectTag: 'PLACEMENT',
            }
        }
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION'
            deletions.push(oldFiber)
        }
        if (oldFiber) oldFiber = oldFiber.sibling
        if (index === 0) wipFiber.child = newFiber
        else if (element) prevSibling.sibling = newFiber
        prevSibling = newFiber
        index++
    }
}

// Step 8 - Commit（一次性、不可中断提交到 DOM）
function commitRoot() {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    commitEffects(wipRoot.child)  // 遍历 fiber 树找有 .effect 标记的 hook，先调用旧 cleanup，再执行新 effect；
    currentRoot = wipRoot  // 双缓存切换，新树变当前树；
    wipRoot = null
}

function commitWork(fiber) {
    if (!fiber) return
    let domParentFiber = fiber.parent
    while (!domParentFiber.dom) domParentFiber = domParentFiber.parent  // 函数组件一直往上找真实 DOM 父节点；
    const domParent = domParentFiber.dom

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)   // 更新属性；
    } else if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent)
    }
    commitWork(fiber.child)      // 先子节点，再兄弟节点（DFS）；
    commitWork(fiber.sibling)
}

function commitDeletion(fiber, domParent) {
    if (fiber.dom) domParent.removeChild(fiber.dom)
    else commitDeletion(fiber.child, domParent)  // 往下找到真实 DOM 节点再删除；
}

function commitEffects(fiber) {
    if (!fiber) return
    fiber.hooks?.forEach(hook => {
        if (hook.effect) {
            if (hook.cleanup) hook.cleanup()
            hook.cleanup = hook.effect()
        }
    })
    commitEffects(fiber.child)
    commitEffects(fiber.sibling)
}

// ─── createDom / updateDom ────────────────────────────────────────────────────
const isEvent = k => k.startsWith('on')
const isProp  = k => k !== 'children' && !isEvent(k)
const isNew   = (p, n) => k => p[k] !== n[k]
const isGone  = (p, n) => k => !(k in n)

function createDom(fiber) {
    const dom = fiber.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(fiber.type)
    updateDom(dom, {}, fiber.props)
    return dom
}

function updateDom(dom, prev, next) {
    Object.keys(prev).filter(isEvent)
        .filter(k => !(k in next) || isNew(prev, next)(k))
        .forEach(k => dom.removeEventListener(k.slice(2).toLowerCase(), prev[k]))
    Object.keys(prev).filter(isProp).filter(isGone(prev, next))
        .forEach(k => (dom[k] = ''))
    Object.keys(next).filter(isProp).filter(isNew(prev, next))
        .forEach(k => (dom[k] = next[k]))
    Object.keys(next).filter(isEvent).filter(isNew(prev, next))
        .forEach(k => dom.addEventListener(k.slice(2).toLowerCase(), next[k]))
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log(count)
        return () => console.log('cleanup')
    }, [count])

    // Babel transpile JSX into below.
    // return (
    //   <div>
    //      <p>count: {count}</p>
    //      <button onClick={() => setCount(c => c + 1)}>+1</button>
    //   </div>
    // )
    return createElement('div', null,
        createElement('p', null, `count: ${count}`),
        createElement('button', { onClick: () => setCount(c => c + 1) }, '+1')
    )
}

/**
    createElement(App, null)  ->  { type: App, props: { children: [] } }
                                               ↓ fiber 调度
    App(props)                ->  执行函数，内部 createElement 运行
                                                               ↓
  { type: 'div', props: { children: [...] } }     ->  继续 reconcile
*/
render(createElement(App, null), document.getElementById('root'))
```
$append$
WHERE title = 'Mini React — Fiber / 调度 / Diff 深度 Quiz';
