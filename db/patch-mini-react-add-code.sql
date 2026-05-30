UPDATE questions
SET content = content || $append$

---

### 完整实现代码

```js
// ─── createElement ────────────────────────────────────────────────────────────
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(c =>
        typeof c === "object" ? c : createTextElement(c)
      ),
    },
  }
}
function createTextElement(text) {
  return { type: "TEXT_ELEMENT", props: { nodeValue: text, children: [] } }
}

// ─── DOM helpers ──────────────────────────────────────────────────────────────
const isEvent    = k => k.startsWith("on")
const isProp     = k => k !== "children" && !isEvent(k)
const isNew      = (p, n) => k => p[k] !== n[k]
const isGone     = (p, n) => k => !(k in n)

function createDom(fiber) {
  const dom = fiber.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type)
  updateDom(dom, {}, fiber.props)
  return dom
}

function updateDom(dom, prev, next) {
  // remove old/changed listeners
  Object.keys(prev).filter(isEvent)
    .filter(k => !(k in next) || isNew(prev, next)(k))
    .forEach(k => dom.removeEventListener(k.slice(2).toLowerCase(), prev[k]))
  // remove gone props
  Object.keys(prev).filter(isProp).filter(isGone(prev, next))
    .forEach(k => (dom[k] = ""))
  // set new/changed props
  Object.keys(next).filter(isProp).filter(isNew(prev, next))
    .forEach(k => (dom[k] = next[k]))
  // add new/changed listeners
  Object.keys(next).filter(isEvent).filter(isNew(prev, next))
    .forEach(k => dom.addEventListener(k.slice(2).toLowerCase(), next[k]))
}

// ─── globals ──────────────────────────────────────────────────────────────────
let nextUnitOfWork = null
let wipRoot        = null
let currentRoot    = null
let deletions      = []
let wipFiber       = null
let hookIndex      = 0

// ─── render / workLoop ────────────────────────────────────────────────────────
function render(element, container) {
  wipRoot = { dom: container, props: { children: [element] }, alternate: currentRoot }
  deletions = []
  nextUnitOfWork = wipRoot
}

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && wipRoot) commitRoot()
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

// ─── render phase ─────────────────────────────────────────────────────────────
function performUnitOfWork(fiber) {
  if (fiber.type instanceof Function) updateFunctionComponent(fiber)
  else                                updateHostComponent(fiber)

  if (fiber.child)   return fiber.child
  let f = fiber
  while (f) {
    if (f.sibling) return f.sibling
    f = f.parent
  }
}

function updateHostComponent(fiber) {
  if (!fiber.dom) fiber.dom = createDom(fiber)
  reconcileChildren(fiber, fiber.props.children)
}

function updateFunctionComponent(fiber) {
  wipFiber  = fiber
  hookIndex = 0
  wipFiber.hooks = []
  reconcileChildren(fiber, [fiber.type(fiber.props)])
}

// ─── reconcile (diff) ─────────────────────────────────────────────────────────
function reconcileChildren(wipFiber, elements) {
  let idx        = 0
  let oldFiber   = wipFiber.alternate?.child
  let prevSib    = null

  while (idx < elements.length || oldFiber) {
    const el       = elements[idx]
    const sameType = oldFiber && el && el.type === oldFiber.type
    let newFiber   = null

    if (sameType) {
      newFiber = { type: oldFiber.type, props: el.props, dom: oldFiber.dom,
                   parent: wipFiber, alternate: oldFiber, effectTag: "UPDATE" }
    }
    if (el && !sameType) {
      newFiber = { type: el.type, props: el.props, dom: null,
                   parent: wipFiber, alternate: null, effectTag: "PLACEMENT" }
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }

    if (oldFiber) oldFiber = oldFiber.sibling
    if (idx === 0)   wipFiber.child    = newFiber
    else if (el)     prevSib.sibling   = newFiber
    prevSib = newFiber
    idx++
  }
}

// ─── commit phase ─────────────────────────────────────────────────────────────
function commitRoot() {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  commitEffects(wipRoot)
  currentRoot = wipRoot
  wipRoot     = null
}

function commitWork(fiber) {
  if (!fiber) return
  let parentFiber = fiber.parent
  while (!parentFiber.dom) parentFiber = parentFiber.parent
  const domParent = parentFiber.dom

  if      (fiber.effectTag === "PLACEMENT" && fiber.dom) domParent.appendChild(fiber.dom)
  else if (fiber.effectTag === "UPDATE"    && fiber.dom) updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  else if (fiber.effectTag === "DELETION")               commitDeletion(fiber, domParent)

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) domParent.removeChild(fiber.dom)
  else           commitDeletion(fiber.child, domParent)
}

function commitEffects(fiber) {
  if (!fiber) return
  fiber.hooks?.forEach(hook => { if (hook.effect) hook.effect() })
  commitEffects(fiber.child)
  commitEffects(fiber.sibling)
}

// ─── hooks ────────────────────────────────────────────────────────────────────
function useState(initial) {
  const oldHook = wipFiber.alternate?.hooks?.[hookIndex]
  const hook    = { state: oldHook ? oldHook.state : initial, queue: [] }

  ;(oldHook?.queue ?? []).forEach(action => {
    hook.state = typeof action === "function" ? action(hook.state) : action
  })

  const setState = action => {
    hook.queue.push(action)
    wipRoot = { dom: currentRoot.dom, props: currentRoot.props, alternate: currentRoot }
    nextUnitOfWork = wipRoot
    deletions = []
  }

  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state, setState]
}

function useEffect(callback, deps) {
  const oldHook   = wipFiber.alternate?.hooks?.[hookIndex]
  const hasChanged = !oldHook || deps.some((d, i) => d !== oldHook.deps[i])
  const hook      = { deps, effect: hasChanged ? callback : null }
  wipFiber.hooks.push(hook)
  hookIndex++
}

// ─── export ───────────────────────────────────────────────────────────────────
const MiniReact = { createElement, render, useState, useEffect }
```
$append$
WHERE title = 'Mini React — Fiber / 调度 / Diff 深度 Quiz';
