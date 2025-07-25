function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
        }
    }
}

let nextUnitOfWork, wipRoot, currentRoot
function render(element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element]
        }
    }
    wipRoot = nextUnitOfWork
}



function workLoop(deadling) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadling.timeRemaining() < 1
    }
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

export function useEffect(callback, deps) {
    const effect = {
        callback, deps
    }

    wipFiber.effects.push(effect)
}

function commitEffect(fiber) {
    if (!fiber) return
    fiber.effects?.forEach((effect, index) => {
        if (!fiber.alternate) {
            effect.callback()
        } else {
            const deps = effect.deps
            const oldDeps = fiber.alternate.effects[index].deps
            if (!deps || deps.some((dep, index) => dep != oldDeps[index])) {
                effect?.callback()
            }
        }
    })
    commitEffect(fiber.child)
    commitEffect(fiber.sibling)

}
function commitRoot() {
    deletions.forEach(commitWork)
    deletions = []
    commitWork(wipRoot.child)
    commitEffect(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
}

function commitWork(fiber) {
    if (!fiber) return
    let parentFibler = fiber.parent
    while (!parentFibler.dom) {
        parentFibler = parentFibler.parent
    }
    const parentDom = parentFibler.dom
    if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, parentDom)
        return
    }
    if (fiber.effectTag === 'UPDATE' && fiber.dom) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    }
    if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
        parentDom.append(fiber.dom)
    }

    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function commitDeletion(fiber, parentDom) {
    if (fiber.dom) {
        parentDom.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, parentDom)
    }
}
function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function
    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }
    if (fiber.child) return fiber.child
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}



function update() {
    nextUnitOfWork = {
        ...currentRoot,
        alternate: currentRoot
    }
    wipRoot = nextUnitOfWork
}

export function useState(initValue) {
    const oldHook = wipFiber.alternate && wipFiber.alternate.hooks[wipFiber.hookIndex]
    const hook = {
        state: oldHook ? oldHook.state : initValue,
        queue: []
    }
    const actions = oldHook ? oldHook.queue : hook.queue
    actions.forEach(action => hook.state = action instanceof Function ? action(hook.state) : action)
    const setState = action => {
        hook.queue.push(action)
        update()
    }
    wipFiber.hooks.push(hook)
    wipFiber.hookIndex++
    return [hook.state, setState]
}

let wipFiber
function updateFunctionComponent(fiber) {
    wipFiber = fiber
    wipFiber.hooks = []
    wipFiber.hookIndex = 0
    wipFiber.effects = []
    fiber.props.children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, fiber.props.children)
}

function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children)
}

let deletions = []
function reconcileChildren(fiber, elements) {
    let oldFiber = fiber.alternate && fiber.alternate.child
    let index = 0
    let prevSibling = null
    while (index < elements.length || oldFiber) {
        const element = elements[index]
        const sameType = oldFiber && oldFiber.type === element.type
        let newFiber
        if (sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: fiber,
                alternate: oldFiber,
                child: null,
                sibling: null,
                effectTag: 'UPDATE'
            }
        }
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: fiber,
                alternate: null,
                child: null,
                sibling: null,
                effectTag: 'PLACEMENT'
            }
        }

        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION'
            deletions.push(oldFiber)
        }
        if (oldFiber) oldFiber = oldFiber.sibling
        if (index == 0) {
            fiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        index++
    }
}

function createDom(fiber) {
    const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') :
        document.createElement(fiber.type)
    updateDom(dom, {}, fiber.props)
    return dom
}

const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const eventType = key => key.substring(2).toLowerCase()
const isGone = (prev, next) => key => !(key in next)
const isNew = (prev, next) => key => prev[key] !== next[key]
function updateDom(dom, prev, next) {
    //属性
    Object.keys(prev)
        .filter(isProperty)
        .filter(isGone(prev, next))
        .forEach(name => dom[name] = '')
    Object.keys(next)
        .filter(isProperty)
        .filter(isNew(prev, next))
        .forEach(name => dom[name] = next[name])
    Object.keys(prev)
        .filter(isEvent)
        .filter(key => !(key in next) || isNew(prev, next)(key))
        .forEach(name => {
            dom.removeEventListener(eventType(name), prev[name])
        })
    Object.keys(next)
        .filter(isEvent)
        .forEach(name => {
            dom.addEventListener(eventType(name), next[name])
        })
}

export default {
    render,
    createElement
}