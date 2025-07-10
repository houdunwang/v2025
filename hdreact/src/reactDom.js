import React from './react'
export const createRoot = container => {
    return {
        render(element) {
            React.render(element, container)
        }
    }
}