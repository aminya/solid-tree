import { } from "solid-js/web"
import type { JSX } from "solid-js"

export function Tree(className: string, style: JSX.CSSProperties, ...props: any) {
  console.log("hello")
  return (
    <ol
      class={"list-tree"}
      role="tree"
      style={{
        position: "relative",
        ...style,
      }}
      {...props}
    />
  )
}

// type TreeItemProps = {
//   children?: React.ReactNode
//   className?: string
//   // handled below in `handleClick`
//
//   /* eslint-disable react/no-unused-prop-types */
//   onSelect?: (e: React.MouseEvent) => unknown
//   onConfirm?: (e: React.MouseEvent) => unknown
//   onTripleClick?: (e: React.MouseEvent) => unknown
//
//   /* eslint-enable react/no-unused-prop-types */
//   selected?: boolean
//   onMouseDown?: (e: React.MouseEvent) => unknown
//   onMouseEnter?: (e: React.MouseEvent) => unknown
//   onMouseLeave?: (e: React.MouseEvent) => unknown
//   path?: string
//   name?: string
//   title?: string
// }
//
//
export class TreeItem extends React.Component<TreeItemProps> {
  _liNode: HTMLLIElement | null | undefined
  _handleClick = handleClick.bind(this)

  scrollIntoView() {
    if (this._liNode != null) {
      scrollIntoView(this._liNode)
    }
  }

  render() {
    const { className, selected, children, onMouseDown, onMouseEnter, onMouseLeave, path, name, title } = this.props
    return (
      <div title={title}>
        <li
          aria-selected={selected}
          className={classnames(
            className,
            {
              selected,
            },
            "list-item"
          )}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          data-path={path}
          data-name={name}
          onClick={this._handleClick}
          ref={(liNode) => (this._liNode = liNode)}
          role="treeitem"
          tabIndex={selected ? "0" : "-1"}
        >
          {selected && typeof children === "string" ? ( // String children must be wrapped to receive correct styles when selected.
            <span>{children}</span>
          ) : (
            children
          )}
        </li>
      </div>
    )
  }
}


// type NestedTreeItemProps = {
//   title?: React.ReactNode
//   children?: unknown
//   className?: string
//   hasFlatChildren?: boolean
//   // passthrough to inner TreeList
//   selected?: boolean
//   collapsed?: boolean
//   // handled below in `handleClick`
//
//   /* eslint-disable react/no-unused-prop-types */
//   onSelect?: (e: React.MouseEvent) => unknown
//   onConfirm?: (e: React.MouseEvent) => unknown
//   onTripleClick?: (e: React.MouseEvent) => unknown
//   /* eslint-disable react/no-unused-prop-types */
// }
// export class NestedTreeItem extends React.Component<NestedTreeItemProps> {
//   _itemNode: HTMLDivElement | null | undefined
//   _handleClick = (e: React.MouseEvent) => {
//     const itemNode = this._itemNode
//
//     if (itemNode == null) {
//       return
//     }
//
//     invariant(e.target instanceof Element)
//
//     if (e.target.closest(".list-item") === itemNode) {
//       handleClick.call(this, e)
//     }
//   }
//
//   render() {
//     const { className, hasFlatChildren, selected, collapsed, title, children } = this.props
//     return (
//       <li
//         aria-selected={selected}
//         aria-expanded={!collapsed}
//         className={classnames(
//           className,
//           {
//             selected,
//             collapsed,
//           },
//           "list-nested-item"
//         )}
//         onClick={this._handleClick}
//         role="treeitem"
//         tabIndex={selected ? "0" : "-1"}
//       >
//         {title == null ? null : (
//           <div tabIndex={-1} className="native-key-bindings list-item" ref={(node) => (this._itemNode = node)}>
//             {title}
//           </div>
//         )}
//         <TreeList hasFlatChildren={hasFlatChildren}>{children}</TreeList>
//       </li>
//     )
//   }
// }
// type TreeListProps = {
//   className?: string
//
//   /* typically, instances of TreeItem or NestedTreeItem. */
//   children?: unknown
//   showArrows?: boolean
//   hasFlatChildren?: boolean
// }
// export const TreeList = (
//   props: TreeListProps // $FlowFixMe(>=0.53.0) Flow suppress
// ) => (
//   <ul
//     className={classnames(
//       props.className,
//       {
//         "has-collapsable-children": props.showArrows,
//         "has-flat-children": props.hasFlatChildren,
//       },
//       "list-tree"
//     )}
//     role="group"
//   >
//     {props.children}
//   </ul>
// )
//
// function handleClick(e: React.MouseEvent): void {
//   const { onSelect, onConfirm, onTripleClick } = this.props
//   const numberOfClicks = e.detail
//
//   switch (numberOfClicks) {
//     case 1:
//       onSelect && onSelect(e)
//       break
//
//     case 2:
//       onConfirm && onConfirm(e)
//       break
//
//     case 3:
//       onTripleClick && onTripleClick(e)
//       break
//
//     default:
//       break
//   }
// }
