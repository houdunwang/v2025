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

let nextUnitOfWork, wipFiber, currentRoot
function render(element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element]
        }
    }
    wipFiber = nextUnitOfWork
}

export function update() {
    nextUnitOfWork = {
        ...currentRoot,
    }
    wipFiber = nextUnitOfWork
}

function workLoop(deadling) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadling.timeRemaining() < 1
    }
    if (!nextUnitOfWork && wipFiber) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function commitRoot() {
    commitWork(wipFiber.child)
    currentRoot = wipFiber
    wipFiber = null
}

function commitWork(fiber) {
    if (!fiber) return
    let parentFibler = fiber.parent
    while (!parentFibler.dom) {
        parentFibler = parentFibler.parent
    }
    const parentDom = parentFibler.dom
    if (fiber.dom) {
        parentDom.append(fiber.dom)
    }

    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function
    if (isFunctionComponent) {
        fiber.props.children = [fiber.type(fiber.props)]
    } else {
        if (!fiber.dom) {
            fiber.dom = createDom(fiber)
        }
    }
    const elements = fiber.props.children
    let index = 0
    let prevSibling = null
    while (index < elements.length) {
        const element = elements[index]
        const newFiber = {
            type: element.type,
            props: element.props,
            dom: null,
            parent: fiber,
            child: null,
            sibling: null,
        }
        if (index == 0) {
            fiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        index++
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

const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const eventType = key => key.substring(2).toLowerCase()
function createDom(fiber) {
    const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') :
        document.createElement(fiber.type)
    Object.keys(fiber.props).
        filter(isProperty).forEach(name => dom[name] = fiber.props[name])
    Object.keys(fiber.props).filter(isEvent).forEach(name => {
        dom.addEventListener(eventType(name), fiber.props[name])
    })
    return dom
}

export default {
    render,
    createElement
}